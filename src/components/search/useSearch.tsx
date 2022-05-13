import React, {
 useCallback,
 useEffect,
 useMemo,
 useState,
} from "react";
import _debounce from "lodash/debounce";
import { useAppDispatch } from "app/store";
import { searchProductDetailAction } from "features/product/product.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { Avatar, List, message, Result, Typography } from "antd";
import useEffectSkipFisrtRender from "hook/useEffectSkipFisrtRender";
import { IProduct } from "constants/models/product.model";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
export default function useSearch(onHide: () => void) {
 const [product, setProduct] = useState<IProduct[] | []>([]);
 const dispatch = useAppDispatch();
 const [text, setText] = useState("");
 const navigate = useNavigate();
 const onSearch = useCallback(
  _debounce(() => search(), 300),
  [text]
 );
 const mapProduct = useMemo(() => {
  if (product.length)
   return (
    <List
     dataSource={product}
     renderItem={(item) => (
      <List.Item
       onClick={() => {
        navigate(`product/detail/${item._id}`);
        onHide();
        setProduct([]);
       }}>
       <List.Item.Meta
        title={
         <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[text]}
          autoEscapes
          textToHighlight={item.name}
         />
        }
        description={
         <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[text]}
          autoEscapes
          textToHighlight={item.note.substring(0, 100) + "..."}
         />
        }
        avatar={
         <Avatar src={item.posters[0].url} />
        }></List.Item.Meta>
      </List.Item>
     )}
    />
   );
 }, [product]);
 const search = () => {
  dispatch(searchProductDetailAction({ search: text }))
   .then(unwrapResult)
   .then((res: any) => {
    setProduct(res.data);
   });
 };
 useEffectSkipFisrtRender(() => {
  onSearch();
  return onSearch.cancel;
 }, [text, onSearch]);

 return { onSearch, setText, setProduct, text, mapProduct };
}
