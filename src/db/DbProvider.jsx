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
} from "firebase/firestore";
import { auth, db } from "../firebase";

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
    // const addedProduct = await axios.post(`${URL_BASE}/products`, newProduct);
    try{
      console.log(newProduct)
      let productRef = db.collection("products");
      let addedProduct = await productRef.add(newProduct)
      // setCustomers(addedProduct.data);
      console.log("addedProduct", addedProduct);
      // return addedProduct;
    }catch(error){
      console.error(error);
      return null;
    }
  };
  const getOneProduct = async () => {};
  const createProduct = async () => {};
  const deleteProduct = async () => {};
  const updateProduct = async () => {};
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
  const createCategory = async () => {};
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

  let value = {
    customers,
    categories,
    products,
    addProduct,
    searchProducs,
    getAllCategories,
    getAllProducts,
    getOneCategory,
    getOneProduct,
    createCategory,
    createProduct,
    deleteCategory,
    deleteProduct,
    categoryCategory,
    updateProduct,
    getAllCustomers,
  };
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
