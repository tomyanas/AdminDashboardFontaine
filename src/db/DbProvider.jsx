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
import { useToast } from "@chakra-ui/react";
export let DbContext = createContext(null);

export const useDb = () => {
  const context = useContext(DbContext);
  if (!context) throw new Error("There is no db provider");
  return context;
};

export const DbProvider = ({ children }) => {
  const toast = useToast();
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [customers, setCustomers] = useState([]);
  let [roles, setRoles] = useState([]);
  let [staff, setStaff] = useState([]);
  let [filteredProducts, setFilteredProducts] = useState(products);
  let [filteredCustomers, setFilteredCustomers] = useState(customers);
  let [filteredCategories, setFilteredCategories] = useState(categories);
  let [filteredStaff, setFilteredStaff] = useState(staff);
  //=======================Toast============================
  const GenericToastError = (message, description) => {
    toast({
      title: message ? message : "Ops... Ocurrio un error, Intenta Luego",
      description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  const GenericToastSuccess = (message, description) => {
    toast({
      title: message ? message : "Salio Todo Bien =D",
      description,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //=======================UPLOAD============================
  // TODO: No borrar lo comentado, lo necesito para hacer un
  //  modal de carga con barrita de progreso
  const onUpload = async (path, file) => {
      try {
      const productsRef = ref(storage, path + file.name);
      const uploadTask = await uploadBytesResumable(productsRef, file);
      console.log(uploadTask)
      /*/ uploadTask.on(
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
      // // Handle unsuccessful uploads
      //     console.log("Se rompio todo", error.code);
      //   },
      //   () => {// Handle successful uploads on complete
      //     // Upload completed successfully, now we can get the download URL
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       console.log("File available at", downloadURL);
      //     });
      //   }
      /*/// );
      return getDownloadURL(uploadTask.ref);
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
      throw new Error(error);
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
      return updatedProduct
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
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
      throw new Error(error);
    }
  };
  const addCategory = async (newCategory) => {
    console.log(newCategory)
    try {
      await addDoc(collection(db, "categories"), newCategory);
      return "Categoria Añadida Correctamente";
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
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
      throw new Error(error);
    }
  };
  const getAllStaffMembers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "!=", "customer"));
      const querySnapshot = await getDocs(q);
      let allStaff = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStaff(allStaff);
      setFilteredStaff(allStaff);
      return allStaff;
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
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
      throw new Error(error);
    }
  };
  const updateUserByField = async (id, field, value) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        [field]: value,
      });
      GenericToastSuccess("Actualizado Correctamente");
      return true;
    } catch (error) {
      GenericToastError();
      throw new Error(error);
    }
  };
  const searchCustomers = (search) => {
    let searchFound = searchByName(customers, search);
    setFilteredCustomers(searchFound);
  };
  const searchStaff = (search) => {
    let searchFound = searchByName(staff, search);
    setFilteredStaff(searchFound);
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
      throw new Error(error);
    }
  };

  let value = {
    onUpload,
    staff,
    roles,
    customers,
    categories,
    products,
    filteredStaff,
    filteredProducts,
    filterProductBy,
    filteredCategories,
    filteredCustomers,
    addProduct,
    addCategory,
    getOneUserByEmail,
    getOneUser,
    getAllRoles,
    getOneCategory,
    getOneProduct,
    getAllStaffMembers,
    getAllCategories,
    getAllCustomers,
    getAllProducts,
    searchCustomers,
    searchCategories,
    searchProducs,
    searchStaff,
    updateCategoryBySub,
    updateUserByField,
    updateProduct,
    updateProductByField,
    deleteCategory,
    deleteProduct,
    GenericToastSuccess,
    GenericToastError,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
