import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "app/store";
import {
 CartStatus,
 ICart,
 ICartItem,
} from "constants/models/cart.model";
import {
 ChangeStatusRequest,
 CreateCartRequest,
} from "constants/payload/cart.payload";
import {
 changeStatusAction,
 createCartAction,
 getAllCartAction,
 getCartUserAction,
 getPreviewAction,
} from "features/cart/cartAction";
import {
 setCart,
 setPreview,
 setSuccessPayment,
} from "features/cart/cartSlice";
import { useLoading } from "hook/useLoading";
import _cloneDeep from "lodash/cloneDeep";
import _filter from "lodash/filter";
import _findIndex from "lodash/findIndex";
import _isEmpty from "lodash/isEmpty";
import {
 createContext,
 useCallback,
 useContext,
 useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import useState from "react-usestateref"; // see this line

export enum TypeCreateCart {
 PayPal = 1,
 BeforeRecieved = 2,
}
interface ICartContext {
 myCart: ICartItem[];
 getMycart: any;
 addCart: any;
 getPreviewCart: any;
 updateQuantity: any;
 removeCart: any;
 paidWithPaypal: any;
 paidWithoutPaypal: any;
 changeStatus: (data: ChangeStatusRequest) => void;
 getAllCart: any;
 data: ICart[];
}
const CartContext = createContext<ICartContext>({} as ICartContext);
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: any) {
 const { voucher, preview, carts } = useAppSelector().cart;
 const [myCart, setMyCart] = useState<ICartItem[] | []>([]);
 const [test, setTest, testRef] = useState<any>();
 const { user } = useAppSelector().auth;
 const dispatch = useAppDispatch();
 const loading = useLoading();
 const [data, setData] = useState<ICart[] | []>([]);

 const navigate = useNavigate();

 useEffect(() => {
  setTest(preview);
 }, [preview]);

 useEffect(() => {
  getPreviewCart();
 }, [carts, voucher]);

 const addCart = (cart: ICartItem) => {
  let copy = !_isEmpty(carts) ? _cloneDeep(carts) : [];
  const idx = _findIndex(
   carts,
   (n: ICartItem) =>
    n.idProduct === cart.idProduct && n.size === cart.size
  );
  if (idx !== -1) {
   copy[idx].quantity += cart.quantity;
   dispatch(setCart(copy));
  } else {
   copy.push({ ...cart, size: cart.size });
   dispatch(setCart(copy));
  }
 };
 const getPreviewCart = () => {
  dispatch(getPreviewAction({ carts, voucher: voucher || null }))
   .then(unwrapResult)
   .then((res: any) => {
    dispatch(setPreview(res?.data));
   });
 };

 const updateQuantity = (
  idProduct: string,
  size: any,
  quantity: number
 ) => {
  if (!quantity) {
   const copy = _filter(
    _cloneDeep(carts),
    (n: ICartItem) => n.idProduct !== idProduct
   );
   dispatch(setCart(copy));
   return;
  }

  const idx = _findIndex(
   carts,
   (n: ICartItem) => n.idProduct === idProduct && n.size === size
  );
  if (carts[idx].quantity) {
   const copy = _cloneDeep(carts);
   copy[idx].quantity = quantity as any;
   dispatch(setCart(copy));
  } else {
   const copy = _filter(
    carts,
    (n: ICartItem) => n.idProduct === idProduct
   );
   dispatch(setCart(copy));
  }
 };
 const removeCart = (idProduct: string, size: any) => {
  let copy = _cloneDeep(carts);
  const idx = _findIndex(copy, (n: ICartItem) => {
   return n.size === size && n.idProduct === idProduct;
  });
  let remove: any = [];
  copy.forEach((it: any, index: number) => {
   if (index !== idx) remove.push(it);
  });
  dispatch(setCart(remove));
 };

 const getMycart = () => {
  loading?.show();
  dispatch(getCartUserAction({ id: user?._id }))
   .then(unwrapResult)
   .then((res: any) => {
    setMyCart(res.data);
   })
   .finally(() => loading?.hide());
 };

 const paidWithPaypal = (data: any, id: string) => {
  const create: CreateCartRequest = {
   user: user?._id || "",
   list: testRef.current.list,
   fullName: data?.name?.surname + data?.name?.given_name,
   isPaided: true,
   address: `${data?.address?.address_line_1 || "B???ng s??n"}, ${
    data?.address.address_line_2 || "Ho??i nh??n, B??nh ?????nh"
   }`,
   discount: testRef.current.discount,
   totalCost: testRef.current.totalCost,
   totalQuantity: testRef.current.totalQuantity,
   finalCost: testRef.current.finalCost,
   phoneNumber: data?.phoneNumber || "0344184570",
   status: CartStatus.CREATING,
   payment: id,
  };
  loading?.show();
  dispatch(createCartAction(create))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    navigate("/payment-success");
    dispatch(setSuccessPayment());
   })
   .catch((err: any) => {
    loading?.hide();
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };

 const paidWithoutPaypal = (data: any) => {
  const create: CreateCartRequest = {
   user: user?._id || "",
   list: testRef.current.list,
   fullName: data?.fullName,
   phoneNumber: data?.phoneNumber,
   address: data.address,
   isPaided: false,
   discount: testRef.current.discount,
   totalCost: testRef.current.totalCost,
   totalQuantity: testRef.current.totalQuantity,
   finalCost: testRef.current.finalCost,
   status: CartStatus.CREATING,
  };

  loading?.show();
  dispatch(createCartAction(create))
   .then(unwrapResult)
   .then((res: any) => {
    message.success(res.message);
    navigate("/payment-success");
    dispatch(setSuccessPayment());
   })
   .catch((err: any) => {
    loading?.hide();
    message.error(err.message);
   })
   .finally(() => loading?.hide());
 };

 const getAllCart = () => {
  loading?.show();
  dispatch(getAllCartAction({}))
   .then(unwrapResult)
   .then((res: any) => {
    setData(res.data);
   })
   .finally(() => loading?.hide());
 };
 const changeStatus = (data: ChangeStatusRequest) => {
  loading?.show();
  dispatch(changeStatusAction(data))
   .then(unwrapResult)
   .then((res: any) => {
    getAllCart();
    message.success(res.message);
   })
   .finally(() => loading?.hide());
 };
 return (
  <CartContext.Provider
   value={{
    myCart,
    getMycart,
    addCart,
    getPreviewCart,
    updateQuantity,
    removeCart,
    paidWithPaypal,
    paidWithoutPaypal,
    changeStatus,
    getAllCart,
    data,
   }}>
   {children}
  </CartContext.Provider>
 );
}
