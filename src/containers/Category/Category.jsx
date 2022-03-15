import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { Section } from "../../components/Sections/Section";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { ButtonAdd } from "../../components/Buttons/AddButton";
import { Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { AddCategoryForm } from "../../components/Forms/AddCategoryForm";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { CellImage } from "../../components/Tables/CustomTable/TableCell";
import CategoryDetail from "./CategoryDetail";
import { CustomDrawer } from "../../components/Forms/CustomDrawer/CustomDrawer";

const Category = () => {
  const {
    getAllCategories,
    filteredCategories,
    deleteCategory,
    searchCategories,
  } = useDb();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let categories = filteredCategories;
  let toast = useToast();
  const handleDelete = async (id, onClose) => {
    try {
      await deleteCategory(id);

      toast({
        title: `Eliminado Correctamente`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getAllCategories();
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
      name: "Image",
      property: "image",
      customStyles: { width: "80px" },
      customStylesHeader: { width: "80px" },
      Component: CellImage,
      columnWidth: "80px",
    },
    {
      name: "Name",
      property: "name",
    },
    {
      name: "ID",
      property: "id",
    },
    {
      name: "Actions",
      onClickDelete: handleDelete,
      edit: {
        Component: AddCategoryForm,
        size: "lg",
      },
      view: {
        Component: CategoryDetail,
        size: "2xl",
      },
      columnWidth: "100px",
    },
  ];

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Section>
      <SectionHeader title="Categories">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          <SearchBar
            searchFunction={searchCategories}
            resetFunction={getAllCategories}
          />
          <ButtonAdd onClick={onOpen}>Add New Category</ButtonAdd>
          <CustomDrawer
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
