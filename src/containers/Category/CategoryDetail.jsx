import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const db = useDb();
  let { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(async () => {
    let categoryDetail = await db.getOneCategory(categoryId);
    setCategory(categoryDetail);
  }, []);

  return (
    <>
      <SectionHeader
        title={category ? "Edit: " + category.name : "Edit Category"}
        paddingBottom={"10px"}
        size="lg"
      />
      {category ? (
        <Tabs
          variant="enclosed"
          bg={"#fff"}
          minHeight="400px"
          padding={"1rem"}
          boxShadow="1px 1px 3px 1px #0003"
        >
          <TabList>
            <Tab>Detalle</Tab>
            <Tab>Subcategorias</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
              <h1>{category.name}</h1>
              <p>{category.id}</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          
          </TabPanels>
        </Tabs>
      ) : (
        <InLineLoader />
      )}
    </>
  );
};
export default CategoryDetail;
