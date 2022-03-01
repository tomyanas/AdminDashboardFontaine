import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { Section } from "../../components/Sections/Section";
import { Stack } from "@chakra-ui/react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const db = useDb();
  let staff = db.filteredStaff;
  let navigate = useNavigate();

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
    {
      name: "Actions",
      onClickView: (id) => {
        navigate(`/customers/${id}`);
      },
    },
  ];

  useEffect(() => {
    db.getAllStaffMembers();
  }, []);
  return (
    <Section>
      <SectionHeader title="Staff Members">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          <SearchBar
            searchFunction={db.searchStaffMembers}
            resetFunction={db.getAllStaffMembers}
          />
        </Stack>
      </SectionHeader>
      {staff.length ? (
        <CustomTable headers={headers} items={staff} />
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};
export default Customers;
