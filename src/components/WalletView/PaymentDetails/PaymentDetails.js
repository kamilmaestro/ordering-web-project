import * as React from 'react';
import {FoodPreview} from "../../TablesView/ProposalFoodPreviewList/FoodPreview";

export const PaymentDetails = ({ details, onClick }) => {

  const foodValue = {
    amount: details.amountOfFood,
    name: details.foodName,
    price: details.foodPrice
  }

  return (
    <FoodPreview food={foodValue} onClick={onClick} />
  );
};