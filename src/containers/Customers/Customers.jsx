import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import "./Customers.scss";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { Section } from "../../components/Sections/Section";
import { Stack } from "@chakra-ui/react";
import { SearchBar } from "../../components/SearchBar/SearchBar";

const Customers = () => {
  const db = useDb();
  let customers = db.filteredCustomers;

  const headers = [
    {
      name: "Full Name",
      property: "name",
    },
    {
      name: "Email",
      property: "email",
    },
    {
      name: "Role",
      property: "role",
    },
  ];

  useEffect(() => {
    db.getAllCustomers();
  }, []);
  return (
    <Section>
      <SectionHeader title="Customers">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          <SearchBar
            searchFunction={db.searchCustomers}
            resetFunction={db.getAllCustomers}
          />
        </Stack>
      </SectionHeader>
      {customers.length ? (
        <CustomTable headers={headers} items={customers} />
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};
export default Customers;
