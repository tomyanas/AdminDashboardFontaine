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

const CustomerDetail = () => {
  const db = useDb();
  let { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(async () => {
    let customerDetail = await db.getOneUser(customerId);
    setCustomer(customerDetail);
  }, []);

  return (
    <>
      <SectionHeader
        title={customer ?  customer.name : "Perfil"}
        paddingBottom={"10px"}
        size="lg"
      />
      {customer ? (
        <Tabs
          variant="enclosed"
          bg={"#fff"}
          minHeight="400px"
          padding={"1rem"}
          boxShadow="1px 1px 3px 1px #0003"
        >
          <TabList>
            <Tab>Detalle</Tab>
            <Tab>Mas detalles...</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
              <h1>{customer.name}</h1>
              <p>{customer.id}</p>
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
export default CustomerDetail;