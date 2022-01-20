import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const DrawerItems = ({ items }) => {

  return (
    <div>
      <List>
        {
          items.map((item, index) => (
            <ListItem button key={index} onClick={item.onClick} >
              <ListItemIcon> { item.icon } </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
};