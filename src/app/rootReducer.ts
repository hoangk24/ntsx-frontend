import authSlice from "features/auth/auth.slice";
import cartSlice from "features/cart/cartSlice";
import categorySlice from "features/category/categorySlice";
import appSlice from "features/common/appSlice";
import productSlice from "features/product/productSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
 app: appSlice,
 auth: authSlice,
 product: productSlice,
 category: categorySlice,
 cart: cartSlice,
});
