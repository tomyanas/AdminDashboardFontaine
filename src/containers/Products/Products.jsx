import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import {
  Box
} from "@chakra-ui/react";
import { SearchBar } from "../../components/SearchBar/SearchBar";

const Products = () => {
  const db = useDb();
  let products = db.filteredProducts;
  const headers = [
    {
      name: "Name",
      property: "name",
    },
    {
      name: "Brand",
      property: "brand",
    },
    {
      name: "Category",
      property: "category",
    },
    {
      name: "Price",
      property: "price",
    },
    {
      name: "Discount",
      property: "discountInPercent",
    },
    {
      name: "Sale Price",
      property: "salePrice",
    },
    {
      name: "Stock",
      property: "stock",
    },
    {
      name: "Min Stock",
      property: "minStock",
    },
  ];

  useEffect(() => {
    db.getAllProducts();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      bg={"#d0d000"}
      gap={"1rem"}
      w={"100%"}
      height={"fit-content"}
    >
      <Box bg={"#fff"} minHeight="200px" padding={"10px"}>
        <SearchBar
          searchFunction={db.searchProducs}
          resetFunction={db.getAllProducts}
        />
        {/* {found ? <p>Resultados para la busqueda: {search} </p> : ""} */}
      </Box>

      {products.length ? (
        <CustomTable headers={headers} items={products} />
      ) : (
        <InLineLoader />
      )}
    </Box>
  );
};

export default Products;

