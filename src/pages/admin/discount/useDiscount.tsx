import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch } from "app/store";
import {
 addDiscountAction,
 applyDiscountAction,
 getDiscountAction,
} from "features/product/product.action";
import { useLoading } from "hook/useLoading";
import _filter from "lodash/filter";
import _reduce from "lodash/reduce";
import { createContext, useContext, useState } from "react";
import { updateDiscount } from "services/discount.service";
interface IDiscountContext {
 getDiscount: any;
 discounts: any;
 addDiscount: any;
 appDiscount: any;
 setDefaultCheckedList: any;
 setCheckedList: any;
 defaultCheckedList: any;
 onChangeCheckList: any;
 updateDiscountFn: any;
}
const DiscountContext = createContext<IDiscountContext | any>(
 {} as IDiscountContext
);
export const useDiscount = () => useContext(DiscountContext);

export default function DiscountProvider({ children }: any) {
 const dispatch = useAppDispatch();
 const [discounts, setDiscounts] = useState([]);
 const [defaultCheckedList, setDefaultCheckedList] = useState<
  string[]
 >([]);
 const loading = useLoading();

 const getDiscount = () => {
  loading?.show();
  dispatch(getDiscountAction({}))
   .then(unwrapResult)
   .then((res: any) => {
    setDiscounts(res?.data);
   })
   .finally(() => loading?.hide());
 };

 const addDiscount = (data: any) => {
  dispatch(addDiscountAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    getDiscount();
   });
 };

 const updateDiscountFn = async (id: string, data: any) => {
  try {
   await updateDiscount(id, data);
   message.success("update thành công");
  } catch (error) {
   message.error("update k thành công");
  }
 };

 const appDiscount = (data: any) => {
  loading?.show();
  dispatch(applyDiscountAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    getDiscount();
    message.success(res.message);
   })
   .catch((err: any) => {
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };

 const setCheckedList = (list: any) => {
  const defaultList = _reduce(
   list,
   (result: string[], item) => {
    result.push(item._id);
    return result;
   },
   []
  );
  setDefaultCheckedList(defaultList);
 };

 const onChangeCheckList = (id: string, checked: any) => {
  if (!checked) {
   setDefaultCheckedList(
    _filter(defaultCheckedList, (n: string) => n !== id)
   );
  } else {
   setDefaultCheckedList([...defaultCheckedList, id]);
  }
 };

 return (
  <DiscountContext.Provider
   value={{
    getDiscount,
    discounts,
    addDiscount,
    appDiscount,
    setDefaultCheckedList,
    setCheckedList,
    defaultCheckedList,
    onChangeCheckList,
    updateDiscountFn,
   }}>
   {children}
  </DiscountContext.Provider>
 );
}
