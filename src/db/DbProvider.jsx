import { createContext, useContext, useState } from "react";
import {
  query,
  doc,
  deleteDoc,
  setDoc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
  where,
  addDoc,
} from "firebase/firestore";
import { searchByName } from "./filters";
import { db, storage } from "../firebase";
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
  let [filteredProducts, setFilteredProducts] = useState(products);
  let [filteredCustomers, setFilteredCustomers] = useState(customers);
  let [filteredCategories, setFilteredCategories] = useState(categories);
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
      setFilteredProducts(allProducts);
      return allProducts;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const searchProducs = (search) => {
    let searchFound = searchByName(products, search);
    setFilteredProducts(searchFound);
  };
  const filterProductBy = (prop, value) => {
    let filtered = filteredProducts?.filter(item=>item[prop] === value);
    setFilteredProducts(filtered);
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
  const getOneProduct = async (id) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }; //x id todos
  const deleteProduct = async (id) => {
    try {
      let deletedProduct = await deleteDoc(doc(db, "products", id));
      return deletedProduct;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const updateProductByField = async (id, field, value) => {
    try {
      const prodRef = doc(db, "products", id);
      let updatedProduct = await updateDoc(prodRef, {
        [field]: value,
      });
      return updatedProduct;
    } catch (error) {
      console.error(error);
      return null;
    }
  }; // ver hace update completo
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
      setFilteredCategories(allCategories);
      return allCategories;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const searchCategories = (search) => {
    let searchFound = searchByName(categories, search);
    setFilteredCategories(searchFound);
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
      setFilteredCustomers(allCustomers);
      return allCustomers;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const searchCustomers = (search) => {
    let searchFound = searchByName(customers, search);
    setFilteredCustomers(searchFound);
  };

  //addStaff put a users from customer to admin
  let value = {
    onUpload,
    customers,
    categories,
    products,
    filteredProducts,
    filterProductBy,
    filteredCategories,
    filteredCustomers,
    addProduct,
    searchProducs,
    getAllCategories,
    getAllProducts,
    getOneCategory,
    getOneProduct,
    searchCategories,
    addCategory,
    deleteCategory,
    deleteProduct,
    categoryCategory,
    updateProductByField,
    getAllCustomers,
    searchCustomers,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
