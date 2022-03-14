import React, { useEffect, useState } from "react";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const CustomerDetail = ({ itemId }) => {
  const { getOneUser } = useDb();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    async function getData(id) {
      let customerDetail = await getOneUser(id);
      setCustomer(customerDetail);
    }
    getData(itemId);
  }, [itemId, getOneUser]);

  return (
    <Box p="2rem 1rem">
      {customer ? (
        <>
          <Heading textAlign="center" paddingBottom="1.5rem" size="lg">
            {customer.name}
          </Heading>

          <Box
            variant="enclosed"
            bg={"#fff"}
            minHeight="400px"
            padding={"1rem"}
            boxShadow="1px 1px 3px 1px #0003"
          >
            <Text>{customer.id}</Text>
            <Text>{customer.email}</Text>
            <Text>{customer.firstName}</Text>
            <Text>{customer.lastName}</Text>
            <Text>{customer.role}</Text>
          </Box>
        </>
      ) : (
        <InLineLoader />
      )}
    </Box>
  );
};
export default CustomerDetail;
