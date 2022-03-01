import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Section } from "../../components/Sections/Section";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { ButtonAdd } from "../../components/Buttons/AddButton";
import { Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { CustomModal } from "../../components/Forms/CustomModal/CustomModal";
import { AddCategoryForm } from "../../components/Forms/AddCategoryForm";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const db = useDb();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let categories = db.filteredCategories;
  let navigate = useNavigate();
  let toast = useToast();
  const handleDelete = async (id, onClose) => {
    try {
      let res = await db.deleteCategory(id);

      toast({
        title: `Eliminado Correctamente`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      db.getAllCategories();
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Ocurrio un error, intenta Luego",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
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
    {
      name: "Actions",
      onClickEdit: (id) => {
        navigate(`/category/${id}`);
      },
      onClickDelete: handleDelete,
      customStyles: {width: "100px"}
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
