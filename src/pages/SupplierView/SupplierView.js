import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from "react-router-dom";
import { SUPPLIER_VIEW_URL, SUPPLIERS_VIEW_URL } from '../../utils/urlProvider';
import { SuppliersList } from '../../components/SuppliersView/SuppliersList';
import {MainViewDrawer} from '../../components/MainView/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header } from '../../components/MainView/Header';
import { Supplier } from '../../components/SuppliersView/Supplier';
import { connect } from 'react-redux';

export const SupplierView = ({ contextReducer }) => {

  const classes = useStyles();
  const match = useRouteMatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState(null);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const getHeaderTitle = () => {
    return match.params.name ? 
      decodeURI(match.params.name) 
      : 'Dostawcy';
  }

  const renderCurrentView = () => {
    switch (match.path) {
      case SUPPLIERS_VIEW_URL:
        return <SuppliersList isAddModalOpen={isAddModalOpen} handleAddModalClose={handleAddModalClose} search={search} />;
      case SUPPLIER_VIEW_URL:
        return <Supplier match={match} isAddModalOpen={isAddModalOpen} handleAddModalClose={handleAddModalClose} />;
      default:
        return <SuppliersList isAddModalOpen={isAddModalOpen} handleAddModalClose={handleAddModalClose} search={search} />;
    }
  }

  return (
    <div style={{display: "flex"}} >
      <CssBaseline />
      <Header 
        title={getHeaderTitle()}
        search={search}
        searchPlaceholder={match.path === SUPPLIERS_VIEW_URL ? 'Szukaj dostawców' : undefined}
        handleSearch={updateSearch} 
        handleDrawerOpen={handleDrawerOpen} 
        isDrawerOpen={isDrawerOpen} 
        handleAdd={handleAddModalOpen} 
      />
      <MainViewDrawer handleDrawerClose={handleDrawerClose} open={isDrawerOpen}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { 
          renderCurrentView()
        }
      </main>
    </div>
  );
};

const mapStateToProps = ({ contextReducer }) => {
  return { contextReducer };
};

export default connect(mapStateToProps)(SupplierView);

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));
