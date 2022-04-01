import React, { useState, useEffect } from 'react'
import { useDb } from '../../db/DbProvider';

export const EditCategoryForm = ({itemId}) => {
    const { 
        getOneCategory,
        updateCategory,
        GenericToastSuccess,
        GenericToastError } = useDb();
    const [category, setCategory] = useState()

    console.log(category, 'soy category');    

    useEffect(() => {
        async function getData(itemId) {
            let categoryDetail = await getOneCategory(itemId);
            setCategory(categoryDetail);
        }
        getData(itemId);
    }, [itemId]);


    return (
        <div>
            EditCategoryForm
        </div>
    )
}
