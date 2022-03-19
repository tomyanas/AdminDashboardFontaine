import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { Section } from "../../components/Sections/Section";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import CustomerDetail from "../Customers/CustomerDetail";
import { ButtonAdd } from "../../components/Buttons/AddButton";
import { CustomDrawer } from "../../components/Forms/CustomDrawer/CustomDrawer";
import StaffMemberForm from "../../components/Forms/StaffMemberForm";

const Customers = () => {
  const { filteredStaff, getAllStaffMembers, searchStaffMembers } = useDb();
  let staff = filteredStaff;
  
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      view: {
        Component: CustomerDetail,
        size: "2xl",
      },
      columnWidth: "100px",
    },
  ];

  useEffect(() => {
    getAllStaffMembers();
  }, []);
  return (
    <Section>
      <SectionHeader title="Staff Members">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          <SearchBar
            searchFunction={searchStaffMembers}
            resetFunction={getAllStaffMembers}
          />
          <ButtonAdd onClick={onOpen} >Add Staff Member</ButtonAdd>
          <CustomDrawer
            Component={StaffMemberForm}
            onClose={onClose}
            isOpen={isOpen}
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
