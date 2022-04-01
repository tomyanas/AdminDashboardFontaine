import React, { useEffect } from 'react';
import { CustomTable } from '../../components/Tables/CustomTable';
import { InLineLoader } from '../../components/InlineLoader/InlineLoader';
import { useDb } from '../../db/DbProvider';
import { Section } from '../../components/Sections/Section';
import { SectionHeader } from '../../components/Sections/SectionHeader';
import { ButtonAdd } from '../../components/Buttons/AddButton';
import { Stack, useDisclosure, useToast } from '@chakra-ui/react';
import { AddCategoryForm } from '../../components/Forms/AddCategoryForm';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import {
  CellActions,
  CellImage,
} from '../../components/Tables/CustomTable/TableCell';
import CategoryDetail from './CategoryDetail';
import { CustomDrawer } from '../../components/Forms/CustomDrawer/CustomDrawer';

const Category = () => {
  const {
    getAllCategories,
    filteredCategories,
    deleteCategory,
    searchCategories,
  } = useDb();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let categories = filteredCategories;
  let toast = useToast();
  const handleDelete = async (id, onClose) => {
    try {
      await deleteCategory(id);

      toast({
        title: `Eliminado Correctamente`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      getAllCategories();
      onClose();
    } catch (error) {
      // console.error(error);
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
    // {
    //   Header: 'Slug',
    //   accessor: 'slug',
    //   minWidth: 100,
    //   maxWidth: 250,
    // },
    {
      Header: 'Acciones',
      accessor: 'id',
      Cell: ({ value }) => (
        <CellActions
          edit={{
            Component: AddCategoryForm,
            size: 'lg',
          }}
          onClickDelete={handleDelete}
          view={{
            Component: CategoryDetail,
            size: '2xl',
          }}
          data={value}
        />
      ),
      minWidth: 100,
      maxWidth: 150,
    },
  ];

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Section>
      <SectionHeader title="Categorias">
        <Stack direction={['column', 'row']} spacing="24px" p={'.5rem'}>
          <SearchBar
            searchFunction={searchCategories}
            resetFunction={getAllCategories}
          />
          <ButtonAdd onClick={onOpen}>Añadir Categoria</ButtonAdd>
          <CustomDrawer
            Component={AddCategoryForm}
            onClose={onClose}
            isOpen={isOpen}
          />
        </Stack>
      </SectionHeader>
      {categories.length ? (
        <CustomTable data={categories} columnsConfig={columns} />
      ) : (
        <InLineLoader />
      )}
    </Section>
  );
};
export default Category;
