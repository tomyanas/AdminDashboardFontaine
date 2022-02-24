import axios from "axios";
import { createContext, useContext, useState } from "react";
import { URL_BASE } from "../settings/constants";

export let DbContext = createContext(null);

export const useDb = () => {
  const context = useContext(DbContext);
  if (!context) throw new Error("There is no db provider");
  return context;
};

export const DbProvider = ({ children }) => {
  let [categories, setCategories] = useState([
    {
      id: 1,
      name: "Tinturas"
    },
    {
      id: 2,
      name: "Decolorantes"
    },
    {
      id: 3,
      name: "Mascaras"
    },
    {
      id: 4,
      name: "Shampoos"
    },
    {
      id: 5,
      name: "Tratamientos"
    },
  ]);
  let [products, setProducts] = useState([]);
  let [customers, setCustomers] = useState([]);

  const getAllCategories = async () => {
    return products;
  };
  const getAllProducts = async () => {
    try {
      const allProducts = await axios.get(`${URL_BASE}/products`);
      setProducts(allProducts.data);
      console.log("allProducts", allProducts.data);
      return allProducts.data;
    } catch (error) {
      console.log("allProducts Se ROMPIO!", error);
    }
  };
  const searchProducs = (search) => {
    return products;
  };
  const getOneCategory = async () => {};
  const getOneProduct = async () => {};
  const createCategory = async () => {};
  const createProduct = async () => {};
  const deleteCategory = async () => {};
  const deleteProduct = async () => {};
  const categoryCategory = async () => {};
  const updateProduct = async () => {};
  const addProduct = async (values) => {
    const addedProduct = await axios.post(`${URL_BASE}/products`, values);
    setCustomers(addedProduct.data);
    console.log("addedProduct", addedProduct.data);
    return addedProduct.data;
  };

  const getAllCustomers = async () => {
    const allCustomers = await axios.get(`${URL_BASE}/customers`);
    setCustomers(allCustomers.data);
    console.log("allCustomers", customers.data);
    return customers.data;
  };

  let value = {
    addProduct,
    searchProducs,
    categories,
    products,
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
