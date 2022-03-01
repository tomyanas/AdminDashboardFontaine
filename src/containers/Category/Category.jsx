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
import { CellImage } from "../../components/Tables/TableCell/TableCell";

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
      name: "Image",
      property: "image",
      customStyles: {width: "80px"},
      customStylesHeader: {width: "80px"},
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
      onClickEdit: (id) => {
        navigate(`/category/${id}`);
      },
      onClickDelete: handleDelete,
      columnWidth: "100px",
      customStyles: {width: "100px"},
      customStylesHeader: {width: "100px"}
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
