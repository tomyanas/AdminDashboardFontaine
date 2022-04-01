import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable";
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
import { CellActions, CellAvatar } from "../../components/Tables/CustomTable/TableCell";

const Customers = () => {
  const { filteredStaff, getAllStaffMembers, searchStaffMembers } = useDb();
  let staff = filteredStaff;
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = [
    {
      Header: 'Avatar',
      Cell: ({row}) => <CellAvatar data={row.original.email} />,
      minWidth: 80,
      maxWidth: 100,
    },
    {
      Header: 'Nombre',
      accessor: 'name',
      sort: true,
      minWidth: 200,
    },
    {
      Header: 'Email',
      accessor: 'email',
      sort: true,
      minWidth: 250,
    },
    {
      Header: 'Rol',
      accessor: 'role',
      minWidth: 100,
      maxWidth: 150,
    },
    {
      Header: 'Acciones',
      accessor: 'id',
      Cell: ({ value }) => (
        <CellActions
          view={{
            Component: CustomerDetail,
            size: '2xl',
          }}
          data={value}
        />
      ),
      minWidth: 80,
      maxWidth: 120,
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
        <CustomTable data={staff} columnsConfig={columns} />
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};
export default Customers;
