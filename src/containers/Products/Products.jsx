import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";

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
      name: "Stock",
      property: "stock",
    },
    {
      name: "Min Stock",
      property: "minstock",
    },
  ];

  useEffect(() => {
    db.getAllProducts();
  }, []);

  return (
    <div className="section-container">
      {products.length ? (
        <CustomTable headers={headers} items={products} />
      ) : (
        <InLineLoader />
      )}
    </div>
  );
};

export default Products;
