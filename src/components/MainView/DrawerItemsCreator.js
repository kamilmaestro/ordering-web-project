import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { HOME_PAGE_URL, MY_ORDERS_VIEW_URL, SUPPLIERS_VIEW_URL, TABLES_VIEW_URL, WALLET_VIEW_URL } from '../../utils/urlProvider';

  const createItem = (uuid, name, icon, url) => {
    return {
      'uuid': uuid,
      'name': name,
      'icon': icon,
      'url': url
    };
  };

  export const MY_ORDERS_VIEW_UUID = 'orders';
  export const SUPPLIERS_VIEW_UUID = 'suppliers';
  export const WALLET_VIEW_UUID = 'wallet';
  export const TABLES_VIEW_UUID = 'tables';
  
  export const ITEMS = [
    createItem(MY_ORDERS_VIEW_UUID, 'Moje zamówienia', <LocalMallIcon />, MY_ORDERS_VIEW_URL),
    createItem(SUPPLIERS_VIEW_UUID, 'Dostawcy', <RestaurantIcon />, SUPPLIERS_VIEW_URL),
    createItem(WALLET_VIEW_UUID, 'Portfel', <AccountBalanceWalletIcon />, WALLET_VIEW_URL),
    createItem(TABLES_VIEW_UUID, 'Stoliki', <BookmarksIcon />, TABLES_VIEW_URL),
    createItem('', 'Wyloguj', <ExitToAppIcon />, HOME_PAGE_URL),
  ];
