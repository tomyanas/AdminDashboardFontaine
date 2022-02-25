import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Box } from "@chakra-ui/react";

const Products = () => {
  const db = useDb();
  let products = db.products;
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
      bg={"#d0d0d0"}
      gap={"1rem"}
      overflow={"auto"}
      w={"100%"}
      h={"100%"}
      // className="section-container"
    >
      <Box bg={"#fff"} height="400px">
        Probando
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
