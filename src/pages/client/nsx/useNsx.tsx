import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch} from "app/store";
import {getProductNsxAction} from "features/product/product.action";
import {unwrapResult} from "@reduxjs/toolkit";
import {IProduct} from "constants/models/product.model";
import {useLoading} from "hook/useLoading";

function useCategory() {
    const [product, setProduct] = useState<IProduct[] | []>([]);
    const {path} = useParams()
    const dispatch = useAppDispatch()
    const loading = useLoading()
    const getProduct = () => {
        loading?.show()
        dispatch(getProductNsxAction(path as string)).then(unwrapResult).then((res: any) => {
            setProduct(res?.data)
            console.log(res)
        }).finally(() => loading?.hide())

    }
    return {getProduct, product, path}
}

export default useCategory;