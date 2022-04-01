import React, { useEffect } from 'react';
import { CustomTable } from '../../components/Tables/CustomTable';
import { InLineLoader } from '../../components/InlineLoader/InlineLoader';
import { useDb } from '../../db/DbProvider';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { ButtonAdd } from '../../components/Buttons/AddButton';
import { SectionHeader } from '../../components/Sections/SectionHeader';
import { CustomDrawer } from '../../components/Forms/CustomDrawer/CustomDrawer';
import AddProductForm from '../../components/Forms/ProductForm';
import EditProductForm from '../../components/Forms/EditProductForm';
import {
  CellActions,
  CellImage,
} from '../../components/Tables/CustomTable/TableCell';
import ProductDetail from './ProductDetail';

const Products = () => {
  const {
    filteredProducts,
    getAllProducts,
    deleteProduct,
    getAllCategories,
    searchProducs,
  } = useDb();
  let products = filteredProducts;
  const { isOpen, onOpen, onClose } = useDisclosure();
  let toast = useToast();
  const handleDelete = async (id, onClose) => {
    try {
      let res = await deleteProduct(id);
      console.log(res);
      toast({
        title: `Eliminado Correctamente`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      getAllProducts();
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Ocurrio un error, intenta Luego',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const columns = [
    {
      Header: 'Imagen',
      accessor: 'image',
      Cell: ({ value }) => <CellImage data={value} />,
      minWidth: 80,
      maxWidth: 100,
    },
    {
      Header: 'Nombre',
      accessor: 'name',
      minWidth: 200,
      sort: true
    },
    {
      Header: 'Marca',
      accessor: 'brand',
      minWidth: 100,
      maxWidth: 250,
      sort: true
    },
    {
      Header: 'Categoria',
      accessor: 'category',
      minWidth: 100,
      maxWidth: 250,
      sort: true
    },
    {
      Header: 'Precio',
      accessor: 'salePrice',
      Cell: ({ value }) => (
        <Text
          as="span"
          fontWeight={600}
          fontSize="1rem"
          w="100%"
          textAlign="center"
        >
          $ {value}
        </Text>
      ),
      minWidth: 80,
      maxWidth: 120,
      sort: true
    },
    {
      Header: 'Stock',
      accessor: 'stock',
      Cell: ({ value }) => (
        <Text
          as="span"
          fontWeight={600}
          fontSize="1rem"
          w="100%"
          textAlign="center"
        >
          {value}.u
        </Text>
      ),
      minWidth: 80,
      maxWidth: 120,
      sort: true
    },
    {
      Header: 'Acciones',
      accessor: 'id',
      Cell: ({ value }) => (
        <CellActions
          edit={{
            Component: EditProductForm,
            size: 'lg',
          }}
          onClickDelete={handleDelete}
          view={{
            Component: ProductDetail,
            size: '6xl',
          }}
          data={value}
        />
      ),
      minWidth: 100,
      maxWidth: 150,
    },
  ];

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <>
      <SectionHeader title="Productos">
        <Stack direction={['column', 'row']} spacing="24px" p={'.5rem'}>
          <SearchBar
            searchFunction={searchProducs}
            resetFunction={getAllProducts}
          />

          <ButtonAdd onClick={onOpen}>Añadir Producto</ButtonAdd>
          <CustomDrawer
            Component={AddProductForm}
            onClose={onClose}
            isOpen={isOpen}
          />
        </Stack>
      </SectionHeader>

      {products.length ? (
        <CustomTable data={products} columnsConfig={columns}></CustomTable>
      ) : (
        <InLineLoader />
      )}
    </>
  );
};

export default Products;
