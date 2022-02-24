import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import "./Products.scss"

const Products = () => {
  const db = useDb();
  let products = db.products;
  const headers = [
    {
      name: "Name",
      property: "name",
    },
    {
      name: "Category",
      property: "category",
    },
    {
      name: "Price",
      property: "price",
    },
  ];

  useEffect(() => {
    db.getAllProducts();
  }, []);

  return (
    <div className="products">
      {products.length ? (
        <CustomTable headers={headers} items={products} />
      ) : (
        <InLineLoader />
      )}
    </div>
  );
};

export default Products;
