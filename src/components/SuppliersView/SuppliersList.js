import React, { useState, useEffect } from 'react';
import { getSuppliersPage, searchSuppliersPage } from '../../apiServices/supplierApi';
import { AddSupplierModal } from '../../components/SuppliersView/AddSupplierModal';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { SupplierPreview } from '../../components/SuppliersView/SupplierPreview';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { supplierUrl } from '../../utils/urlProvider';

export const SuppliersList = ({ isAddModalOpen, handleAddModalClose, search }) => {

  const history = useHistory();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (search) {
      searchSuppliers(search);
    } else {
      getSuppliers();
    }
  }, [isAddModalOpen, search])

  const searchSuppliers = (search) => {
    searchSuppliersPage(search)
      .then((response) => {
        setSuppliers(response.data.content);
      }).catch(error => {
        console.log(error)
      })
  }

  const getSuppliers = () => {
    getSuppliersPage()
      .then((response) => {
        setSuppliers(response.data.content);
      }).catch(error => {
        console.log(error)
      })
  }

  const onPreviewClick = (supplierId, supplierName) => {
    history.push(supplierUrl(supplierId, supplierName));
  }

  return (
    <div >
      <AddSupplierModal isOpen = {isAddModalOpen} handleClose={handleAddModalClose} />
      <div>
        <List component="nav">
          {
            suppliers.map((supplier, index) => 
              <SupplierPreview supplier={supplier} onClick={onPreviewClick} key={index} />
            )
          }
        </List>
      </div>
    </div>
  );
};

const mapStateToProps = ({contextReducer: {token}}) => {
  return {token};
};

export default connect(mapStateToProps)(SuppliersList);

const useStyles = makeStyles((theme) => ({
}));
