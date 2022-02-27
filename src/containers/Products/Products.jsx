import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Stack } from "@chakra-ui/react";
import { ButtonAdd } from "../../components/Buttons/AddButton";
import { CustomSelect } from "../../components/Forms/CustomInputs/CustomInputs";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { Section } from "../../components/Sections/Section";
const Products = () => {
  const db = useDb();
  let products = db.filteredProducts;
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
    db.getAllProducts();
  }, []);

  return (
    <Section>
      <SectionHeader title="Products">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          <CustomSelect minW="150px" w="200px" placeholder="Category">
            <option value="v1">Valor 1</option>
            <option value="v2">Valor 2</option>
            <option value="v3">Valor 3</option>
            <option value="v4">Valor 4</option>
            <option value="v5">Valor 5</option>
            <option value="v6">Valor 6</option>
          </CustomSelect>

          <SearchBar
            searchFunction={db.searchProducs}
            resetFunction={db.getAllProducts}
          />

          <ButtonAdd>Add Products</ButtonAdd>
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
