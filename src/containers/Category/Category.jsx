import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";


const Category = () => {
  const db = useDb();
  let categories = db.categories;
  const headers = [
    {
      name: "ID",
      property: "id",
    },
    {
      name: "Name",
      property: "name",
    },
    {
      name: "Thumb",
      property: "thumb",
    },
  ];

  useEffect(() => {
    db.getAllCategories();
  }, []);
  return (
    <div className="section-container">
      {categories.length ? (
        <CustomTable headers={headers} items={categories} />
      ) : (
        <InLineLoader />
      )}
    </div>
  );
};
export default Category;
