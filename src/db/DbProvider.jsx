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
  let [roles, setRoles] = useState([]);
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
    let filtered = filteredProducts?.filter((item) => item[prop] === value);
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
  };
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      return "Eliminado";
    } catch (error) {
      throw new Error(error);
    }
  };
  const updateProductByField = async (id, field, value) => {
    try {
      const prodRef = doc(db, "products", id);
      let updatedProduct = await updateDoc(prodRef, {
        [field]: value,
      });
      console.log(updatedProduct.data());
      return updatedProduct.data();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const updateProduct = async (id, newProduct) => {
    try {
      const prodRef = doc(db, "products", id);
      let updatedProduct = await updateDoc(
        prodRef,
        {
          ...newProduct,
        },
        { merge: true }
      );
      return updatedProduct.data();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
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
  const getOneCategory = async (id) => {
    try {
      const docRef = doc(db, "categories", id);
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
  };
  const addCategory = async (newCategory) => {
    try {
      await addDoc(collection(db, "categories"), newCategory);
      return "Categoria Añadida Correctamente";
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const updateCategoryBySub = async (idCat, subcategory, newSubcategory) => {
    try {
      const subcatRef = await addDoc(
        collection(db, "categories"),
        newSubcategory
      );
      const catRef = doc(db, "categories", idCat);
      let updatedCategory = await updateDoc(catRef, {
        [subcategory]: subcatRef,
      });
      return updatedCategory.data();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const deleteCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      return "Eliminado";
    } catch (error) {
      throw new Error(error);
    }
  };
  const searchCategories = (search) => {
    let searchFound = searchByName(categories, search);
    setFilteredCategories(searchFound);
  };

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
  const getOneUser = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getOneUserByEmail = async (email) => {
    try {
      const docRef = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(docRef);
      let user = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      return user[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const updateUserByField = async (id, field, value) => {
    try {
      const userRef = doc(db, "users", id);
      let updatedUser = await updateDoc(userRef, {
        [field]: value,
      });
      console.log(updatedUser.data());
      return updatedUser.data();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const searchCustomers = (search) => {
    let searchFound = searchByName(customers, search);
    setFilteredCustomers(searchFound);
  };

  //=======================Role============================
  const getAllRoles = async () => {
    try {
      const q = query(collection(db, "roles"));
      const querySnapshot = await getDocs(q);
      let allRoles = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRoles(allRoles);
      return allRoles;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  let value = {
    onUpload,
    roles,
    customers,
    categories,
    products,
    filteredProducts,
    filterProductBy,
    filteredCategories,
    filteredCustomers,
    addProduct,
    searchProducs,
    getOneUserByEmail,
    getOneUser,
    getAllRoles,
    getAllCategories,
    getAllProducts,
    getOneCategory,
    getOneProduct,
    searchCategories,
    addCategory,
    updateCategoryBySub,
    updateUserByField,
    deleteCategory,
    deleteProduct,
    updateProduct,
    updateProductByField,
    getAllCustomers,
    searchCustomers,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
