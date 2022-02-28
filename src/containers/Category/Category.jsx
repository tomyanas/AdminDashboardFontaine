import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Section } from "../../components/Sections/Section";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { ButtonAdd } from "../../components/Buttons/AddButton";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { CustomModal } from "../../components/Forms/CustomModal/CustomModal";
import { AddCategoryForm } from "../../components/Forms/AddCategoryForm";
import { SearchBar } from "../../components/SearchBar/SearchBar";


const Category = () => {
  const db = useDb();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let categories = db.filteredCategories;
  console.log(categories)
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
        <SearchBar
          searchFunction={db.searchCategories}
          resetFunction={db.getAllCategories}
        />
          <ButtonAdd onClick={onOpen}>Add New Category</ButtonAdd>
          <CustomModal
            Component={AddCategoryForm}
            onClose={onClose}
            isOpen={isOpen}
          />
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
