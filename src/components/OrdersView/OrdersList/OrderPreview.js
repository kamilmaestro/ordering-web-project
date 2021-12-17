import ListItem from "@material-ui/core/ListItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {getDate} from "../../../utils/dateFormatter";

export const OrderPreview = ({ order, onClick, selected, tableName, supplierName }) => {

  const createPreviewName = () => {
    return `${supplierName} z: ${tableName}`;
  }

  return (
    <ListItem button onClick={() => onClick(order)} selected={selected}>
      {
        selected && <ChevronRightIcon color="primary" style={{marginRight: 4}}/>
      }
      <ListItemText primary={createPreviewName()} secondary={getDate(order.createdAt)}/>
    </ListItem>
  );
}
