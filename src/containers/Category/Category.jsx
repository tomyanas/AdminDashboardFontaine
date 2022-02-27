import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Section } from "../../components/Sections/Section";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { ButtonAdd } from "../../components/Buttons/AddButton";
import { Stack } from "@chakra-ui/react";

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
    <Section>
      <SectionHeader title="Categories">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          <ButtonAdd>Add New Category</ButtonAdd>
        </Stack>
      </SectionHeader>
      {categories.length ? (
        <CustomTable headers={headers} items={categories} />
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};
export default Category;
