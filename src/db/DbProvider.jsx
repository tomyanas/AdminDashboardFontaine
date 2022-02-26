import axios from "axios";
import { createContext, useContext, useState } from "react";
import { URL_BASE } from "../settings/constants";
import {
  query,
  doc,
  setDoc,
  collection,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export let DbContext = createContext(null);

export const useDb = () => {
  const context = useContext(DbContext);
  if (!context) throw new Error("There is no db provider");
  return context;
};

export const DbProvider = ({ children }) => {
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [customers, setCustomers] = useState([]);
  //=======================UPLOAD============================
  // const onUpload = async () => {
  //   const storageRef = storage.ref();
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);
  //   db.collection("products")
  //     .doc(currentProduct)
  //     .update({
  //       images: firebase.firestore.FieldValue.arrayUnion({
  //         name: file.name,
  //         url: await fileRef.getDownloadURL(),
  //       }),
  //     });
  // };

  const onUpload = async (file) => {
    const metadata = {
      contentType: "image/jpeg",
    };

    try {
      const productsRef = ref(storage, "products/" + file.name);
      const uploadTask = uploadBytesResumable(productsRef, file, metadata);

      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log("Upload is " + progress + "% done");
      //     switch (snapshot.state) {
      //       case "paused":
      //         console.log("Upload is paused");
      //         break;
      //       case "running":
      //         console.log("Upload is running");
      //         break;
      //     }
      //   },
      //   (error) => {
      //     console.log("Se rompio todo", error.code);
      //   },
      //   () => {
      //     // Upload completed successfully, now we can get the download URL
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       console.log("File available at", downloadURL);
      //     });
      //   }
      // );
      return uploadTask;
    } catch (e) {
      console.log("error", e);
    }
  };
  //=======================PRODUCTS============================
  const getAllProducts = async () => {
    try {
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      let allProducts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(allProducts);
      return allProducts;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const searchProducs = (search) => {
    return products;
  };
  const addProduct = async (newProduct) => {
    try {
      await addDoc(collection(db, "products"), newProduct);
      return "Producto Añadido Correctamente";
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getOneProduct = async () => {}; //x id todos
  const deleteProduct = async () => {};
  const updateProduct = async () => {}; // ver tema del merge true
  //=======================CATEGORY============================

  const getAllCategories = async () => {
    try {
      const q = query(collection(db, "categories"));
      const querySnapshot = await getDocs(q);
      let allCategories = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategories(allCategories);
      return allCategories;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getOneCategory = async () => {};
  const addCategory = async () => {};
  const deleteCategory = async () => {};
  const categoryCategory = async () => {};

  //=======================CUSTOMERS============================
  const getAllCustomers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "customer"));
      const querySnapshot = await getDocs(q);
      let allCustomers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCustomers(allCustomers);
      return allCustomers;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  //addStaff put a users from customer to admin
  let value = {
    onUpload,
    customers,
    categories,
    products,
    addProduct,
    searchProducs,
    getAllCategories,
    getAllProducts,
    getOneCategory,
    getOneProduct,
    addCategory,
    deleteCategory,
    deleteProduct,
    categoryCategory,
    updateProduct,
    getAllCustomers,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
