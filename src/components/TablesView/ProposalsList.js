import React, { useState, useEffect } from 'react';
import { getFoodByIds, getSupplierByIds, getSuppliersPage } from '../../apiServices/supplierApi';
import { AddSupplierModal } from '../../components/SuppliersView/AddSupplierModal';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { SupplierPreview } from '../../components/SuppliersView/SupplierPreview';
import { supplierUrl } from '../../utils/urlProvider';
import { getProposalsPage } from '../../apiServices/orderApi';
import { ProposalPreview } from './ProposalPreview';

export const ProposalsList = ({ proposals, members, onClick, history }) => {

  const [suppliers, setSuppliers] = useState([]);
  const [food, setFood] = useState([]);

  useEffect(() => {
    if (proposals) {
      getSuppliers(proposals);
      getFood(proposals);
    }
  }, [proposals])

  const getSuppliers = (proposals) => {
    const supplierIds = proposals.map(proposal => proposal.supplierId)
    getSupplierByIds(supplierIds)
      .then((response) => {
        setSuppliers(response.data);
      }).catch(error => {
        console.log(error)
      })
  }

  const getFood = (proposals) => {
    const proposalFood = proposals.map(proposal => proposal.food).flat();
    const foodIds = proposalFood.map(food => food.foodId);
    getFoodByIds(foodIds)
      .then((response) => {
        setFood(response.data);
      }).catch(error => {
        console.log(error)
      })
  }

  const goToSupplier = (supplierId, supplierName) => {
    history.push(supplierUrl(supplierId, supplierName));
  }

  const getMemberName = (proposal) => {
    const member = members.find(member => member.memberId === proposal.createdBy)
    return member ?
      member.memberName
      : null;
  }

  const getProposalFood = (proposal) => {
    const foodIds = proposal.food.map(food => food.foodId)
    return food.filter(food => foodIds.includes(food.id));
  }

  return (
    <div >
      <List component="nav">
        {
          proposals.map((proposal, index) => (
            <ProposalPreview 
              proposal={proposal}
              supplier={suppliers.find(supplier => supplier.id === proposal.supplierId)}
              food={getProposalFood(proposal)}
              memberName={getMemberName(proposal)}
              onClickButton={onClick}
              onClickFood={goToSupplier} 
              key={index} 
            />
          ))
        }
      </List>
    </div>
  );
};
