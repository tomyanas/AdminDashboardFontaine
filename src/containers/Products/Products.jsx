import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { ButtonAdd } from "../../components/Buttons/AddButton";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { Section } from "../../components/Sections/Section";
import { CustomDrawer } from "../../components/Forms/CustomDrawer/CustomDrawer";
import AddProductForm from "../../components/Forms/ProductForm";
import { CellImage, CellPrice } from "../../components/Tables/CustomTable/TableCell";
import ProductDetail from "./ProductDetail";

const Products = () => {
  const {
    filteredProducts,
    getAllProducts,
    deleteProduct,
    getAllCategories,
    searchProducs,
  } = useDb();
  let products = filteredProducts;
  const { isOpen, onOpen, onClose } = useDisclosure();
  let toast = useToast();
  const handleDelete = async (id, onClose) => {
    try {
      let res = await deleteProduct(id);
      console.log(res);
      toast({
        title: `Eliminado Correctamente`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getAllProducts();
      onClose();
    } catch (error) {
      console.log(error);
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
      Component: CellImage,
      columnWidth: "80px",
    },
    {
      name: "Name",
      property: "name",
      order: "string",
      // filter: true,
      customStyles: {minWidth: "250px"},
      customStylesHeader: {minWidth: "250px"},
    },
    {
      name: "Brand",
      property: "brand",
      order: "string",
      // filter: true,
    },
    {
      name: "Category",
      property: "category",
      order: "string",
      filter: false,
    },
    // {
    //   name: "Price",
    //   property: "price",
    //   order: "number",
    //   filter: false,
    //   Component: CellPrice,
    // },
    // {
    //   name: "Discount",
    //   property: "discountInPercent",
    //   order: "number",
    //   filter: false,
    //   Component: CellPercent,
    // },
    {
      name: "Sale Price",
      property: "salePrice",
      order: "number",
      filter: false,
      Component: CellPrice,
    },
    {
      name: "Stock",
      property: "stock",
      order: "number",
      filter: false,
    },
    // {
    //   name: "Min Stock",
    //   property: "minStock",
    //   order: "number",
    //   filter: false,
    // },
    {
      name: "Actions",
      onClickDelete: handleDelete,
      edit:{
        Component: AddProductForm
      },
      view:{
        Component: ProductDetail,
        size: "6xl"
      },
      columnWidth: "100px",
      // customStyles: {width: "100px"},
    },
  ];

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Section>
      <SectionHeader title="Products" >
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
        
          <SearchBar
            searchFunction={searchProducs}
            resetFunction={getAllProducts}
          />

          <ButtonAdd onClick={onOpen}>Add Products</ButtonAdd>
          <CustomDrawer
            Component={AddProductForm}
            onClose={onClose}
            isOpen={isOpen}
          />
        </Stack>
      </SectionHeader>

      {products.length ? (
        <CustomTable headers={headers} items={products} />
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};

export default Products;
