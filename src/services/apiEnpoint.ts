const BASE_URL = `${import.meta.env.VITE_API_ENDPOINT}/api`;

const API_ENDPOINT = {
 AUTH: {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  ACCESS_TOKEN: "/auth/get-accessToken",
 },
 USER: {
  GET: "/users/get-users",
  GET_BY_ID: "/users/get-users-by-id",
  CREATE: "/users/create-users",
  UPDATE: "/users/update-users",
  DELETE: "/users/delete-users",
  CHANGE_ROLE: "/users/change-role",
  CHANGE_PASSWORD: "/users/change-password",
  UPDATE_INFORMATION: "/users/update-information",
  UPDATE_PASSWORD: "/users/update-password",
  DELETE_ACCOUNT: "/users/delete-account",
 },
 PRODUCT: {
  GET_ALL: "/product/get-all-product",
  GET_TOP10: "/product/get-top10-product",
  GET_DETAIL: "/product/get-detail-product",
  GET_SUGGEST: "/product/get-suggest-product",
  CREATE: "/product/create-product",
  UPDATE: "/product/update-product",
  DELETE: "/product/delete-product",
  SEARCH: "/product/search-product",
 },
 DISCOUNT: {
  GET: "/discount/get-discount",
  CREATE: "/discount/add-discount",
  APPLY: "/discount/apply-discount",
  UPDATE: "/discount/update-discount",
 },
 VOUCHER: {
  GET: "/voucher/get-voucher",
  CREATE: "/voucher/add-voucher",
  UPDATE: "/voucher/update-voucher",
  DELETE: "/voucher/delete-voucher",
 },
 COMMENT: {
  GET: "/comments/get-comments",
  CREATE: "/cart/create-comment",
 },
 CATEGORY: {
  GET: "/category/get-category",
  CREATE: "/category/create-category",
  GET_PRODUCT: "/product/get-product-by-category",
  UPDATE: "/category/update-category",
 },
 SUB_CATEGORY: {
  CREATE: "/category/create-nsx",
  GET_PRODUCT: "/product/get-product-by-nsx",
 },
 MAIl: {
  CREATE: "/email/create-mail",
  VERIFIED: "/email/verified-mail",
  RE_VERIFIED: "/email/re-verified-mail",
  FORGOT_PASSWORD: "/email/forgot-password",
  ACTIVE: "/users/active-mail",
 },
 CART: {
  CHECK_VOUCHER: "/cart/check-voucher",
  GET_CART_PREVIEW: "/cart/get-cart-preview",
  CREATE: "/cart/create-cart",
  CHANGE_STATUS: "/cart/change-status",
  GET_CART: "/cart/get-cart-user",
  GET_ALL_CART: "/cart/get-all-cart",
 },
 SEARCH: {
  GET: "/search",
 },
 SOCKET: {
  COMMENT: "/socket/comments",
 },
 PROVINCE: {
  CITY: "/province/city",
  DISTRICT: "/province/district",
  WARD: "/province/ward",
 },
 DASHBOARD: {
  HOME: "/dashboard",
 },
};
export { BASE_URL, API_ENDPOINT };
