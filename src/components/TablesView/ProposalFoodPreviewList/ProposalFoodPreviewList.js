import React from 'react';
import { FoodPreview } from './FoodPreview';
import List from '@material-ui/core/List';

export const ProposalFoodPreviewList = ({ food, onFoodClick }) => {
  return (
    <div>
      {
        food.length > 0 &&
          <div>
            <List component="nav">
              {
                food.map((food, index) => (
                  <FoodPreview 
                    food={food}
                    onClick={onFoodClick}   
                    key={index} 
                  />
                ))
              }
            </List>
          </div>
      }
    </div>
  );
};
