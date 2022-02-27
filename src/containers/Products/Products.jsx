import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { ButtonAdd } from "../../components/Buttons/AddButton";
// import { CustomSelect } from "../../components/Forms/CustomInputs/CustomInputs";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { Section } from "../../components/Sections/Section";
import { CustomModal } from "../../components/Forms/CustomModal/CustomModal";
import AddProductForm from "../../components/Forms/ProductForm";
const Products = () => {
  const {
    filteredProducts,
    getAllProducts,
    // categories,
    getAllCategories,
    searchProducs,
    // filterProductBy,
  } = useDb();
  // const [filter, setFilter] = useState("");
  let products = filteredProducts;

  const { isOpen, onOpen, onClose } = useDisclosure();
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
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Section>
      <SectionHeader title="Products">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          {/* <CustomSelect
            minW="150px"
            w="200px"
            placeholder="Category"
            onChange={(e) => {
              console.log(e.target.value);
              setFilter(e.target.value);
              filterProductBy("category", e.target.value)
            }}
          >
            {categories?.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </CustomSelect> */}

          <SearchBar
            searchFunction={searchProducs}
            resetFunction={getAllProducts}
          />

          <ButtonAdd onClick={onOpen}>Add Products</ButtonAdd>
          <CustomModal
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
