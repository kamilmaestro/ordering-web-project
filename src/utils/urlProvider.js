export const SERVER_URL = 'http://localhost:8080';
export const HOME_PAGE_URL = '/';
export const SIGN_IN_PAGE_URL = '/signin';
export const MY_ORDERS_VIEW_URL = '/app/orders';
export const MAIN_VIEW_URL = MY_ORDERS_VIEW_URL;
export const SUPPLIERS_VIEW_URL = '/app/suppliers';
export const SUPPLIER_VIEW_URL = '/app/supplier/:id/:name';
export const WALLET_VIEW_URL = '/app/wallet';
export const TABLES_VIEW_URL = '/app/tables';
export const SIGN_OUT_URL = HOME_PAGE_URL;

export const supplierUrl = (id, name) => {
  return `/app/supplier/${id}/${encodeURI(name)}`;
}
