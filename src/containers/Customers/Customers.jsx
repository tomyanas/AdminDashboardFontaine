import React, { useEffect } from "react";
import { CustomTable } from "../../components/Tables/CustomTable";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";
import { useDb } from "../../db/DbProvider";
import { SectionHeader } from "../../components/Sections/SectionHeader";
import { Section } from "../../components/Sections/Section";
import { Stack } from "@chakra-ui/react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import CustomerDetail from "./CustomerDetail";
import { CellActions } from "../../components/Tables/CustomTable/TableCell";
const Customers = () => {
  const {getAllCustomers, filteredCustomers, searchCustomers} = useDb();
  let customers = filteredCustomers;

  const columns = [
    {
      Header: 'Nombre',
      accessor: 'name',
      // Cell: ({ value }) => <CellImage data={value} />,
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Rol',
      accessor: 'role',
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
    },
  ];


  useEffect(() => {
    getAllCustomers();
  }, []);
  return (
    <Section>
      <SectionHeader title="Clientes">
        <Stack direction={["column", "row"]} spacing="24px" p={".5rem"}>
          <SearchBar
            searchFunction={searchCustomers}
            resetFunction={getAllCustomers}
          />
        </Stack>
      </SectionHeader>
      {customers.length ? (
        <CustomTable data={customers} columnsConfig={columns}  />
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};
export default Customers;
