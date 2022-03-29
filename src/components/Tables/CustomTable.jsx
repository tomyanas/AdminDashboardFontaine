import {
  Box,
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { SortAsc } from '../../assets/icons/SortAsc';
import { SortDesc } from '../../assets/icons/SortDesc';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { useMemo } from 'react';
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from 'phosphor-react';

const HeaderIcon = ({ icon }) => {
  return (
    <Text
      as="span"
      _hover={{
        color: useColorModeValue('#333', '#eee'),
      }}
      minW={'fit-content'}
      h={'fit-content'}
      color={useColorModeValue('#666', '#aaa')}
      p={0}
      m={0}
    >
      {icon}
    </Text>
  );
};

const ThCustom = ({ children, ...props }) => {
  return (
    <Th
      minW={'fit-content'}
      h={'fit-content'}
      w={'fit-content'}
      color={useColorModeValue('#343a40', '#f2f2f2')}
      p={0}
      m={0}
      bg="transparent"
      fontSize={'0.875rem'}
      fontWeight={700}
      textTransform="none"
      {...props}
    >
      <Box
        borderTop={useColorModeValue('1px solid #dee2e6', '1px solid #434b5b')}
        borderBottom={useColorModeValue(
          '1px solid #dee2e6',
          '1px solid #434b5b'
        )}
        bg={useColorModeValue('#f8f9fa', 'gray.800')}
        p="0.875rem"
        minW="fit-content"
        display={'flex'}
        flexDirection="row"
        justifyContent="space-between"
        alignItems={'center'}
        gap={'10px'}
        whiteSpace={'nowrap'}
        _hover={{
          bg: useColorModeValue('#e9ecef', 'gray.700'),
        }}
      >
        {children}
      </Box>
    </Th>
  );
};
const TdCustom = ({ children, ...props }) => {
  return (
    <Td
      borderColor={useColorModeValue('#dee2e6')}
      minW="fit-content"
      px={2}
      py={3}
      fontSize={'0.875rem'}
      fontWeight={useColorModeValue(400, 500)}
      color={useColorModeValue('#495057', '#eee')}
      {...props}
    >
      {children}
    </Td>
  );
};
const PaginationButton = ({ children, ...props }) => {
  return (
    <IconButton
      p="0.2rem"
      minW="fit-content"
      h="fit-content"
      bg="transparent"
      _hover={{
        color: '#2495ff',
        transform: 'scale(1.2, 1.2)',
      }}
      _focus={{
        outline: 'none',
      }}
      _active={{
        bg: 'transparent',
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
};

export const CustomTable = ({ data = [], columnsConfig, ...props }) => {
  const columns = useMemo(() => [...columnsConfig], [columnsConfig]);
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  let bgRowHoverColor = useColorModeValue('#e9ecef', 'gray.700');
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // rows,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <Box
      boxShadow={useColorModeValue(
        '1px 1px 3px 2px #0003',
        '1px 1px 3px 1px #fff1'
      )}
      bg={useColorModeValue('#fff', 'gray.900')}
    >
      <Box
        w="100%"
        h="100%"
        // bg={useColorModeValue('#fff', 'gray.900')}
        minH="400px"
        maxH="100vh"
        p="1rem"
        overflow="auto"
        {...props}
      >
        <Table
          variant="simple"
          py="10px"
          overflow="hidden"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <ThCustom
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <HeaderIcon
                      icon={
                        column.isSorted ? (
                          column.isSortedDesc ? (
                            <SortAsc height="1rem" />
                          ) : (
                            <SortDesc height="1rem" />
                          )
                        ) : (
                          ''
                        )
                      }
                    />
                  </ThCustom>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr
                  _hover={{
                    bg: bgRowHoverColor,
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TdCustom {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TdCustom>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Box
        w="100%"
        h={'60px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <PaginationButton
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          display={!canPreviousPage && 'none'}
        >
          <CaretDoubleLeft size={16} weight="bold" />
        </PaginationButton>
        <PaginationButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          display={!canPreviousPage && 'none'}
        >
          <CaretLeft size={16} weight="bold" />
        </PaginationButton>
        <Text as="span" fontWeight={600} px="0.5rem">
          {pageIndex + 1} de {pageOptions.length}
        </Text>
        <PaginationButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
          display={!canNextPage && 'none'}
        >
          <CaretRight size={16} weight="bold" />
        </PaginationButton>
        <PaginationButton
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          display={!canNextPage && 'none'}
        >
          <CaretDoubleRight size={16} weight="bold" />
        </PaginationButton>
      </Box>
    </Box>
  );
};
