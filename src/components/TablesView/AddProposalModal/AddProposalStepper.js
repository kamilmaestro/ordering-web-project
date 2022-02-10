import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import { SearchBar } from '../../MainView/SearchBar';
import { getSupplierFoodPage, getSuppliersPage, searchSuppliersPage } from '../../../apiServices/supplierApi';
import { ItemsList } from './ItemsList';
import { SuppliersBasicList } from './SuppliersBasicList';

export const AddProposalStepper = ({ onFinish }) => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [search, setSearch] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [food, setFood] = useState([]);
  const steps = [ 
    'Wybierz dostawcę', 
    `Wybierz pozycję z menu: ${selectedSupplier ? selectedSupplier.name : ''}` 
  ];

  useEffect(() => {
    if (search) {
      searchSuppliers(search);
    } else {
      getSuppliers();
    }
  }, [search]);

  useEffect(() => {
    if (selectedSupplier) {
      getFood(selectedSupplier.id);
    }
  }, [selectedSupplier]);

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

  const getFood = (supplierId) => {
    getSupplierFoodPage(supplierId)
      .then((response) => {
        const food = response.data.content.map(item => { 
          return {
            id: item.id,
            name: item.name,
            amount: 1,
            isSelected: false
          }
        });
        setFood(food);
      }).catch(error => {
        console.log(error)
      })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      const proposalFood = food
        .filter(f => f.isSelected)
        .map(f => {
          return {
            foodId: f.id,
            amountOfFood: f.amount
          }
        });
      onFinish(selectedSupplier.id, proposalFood);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleFoodClick = (id) => {
    const updatedFood = food.map(f => f.id === id ? { ...f, isSelected: !f.isSelected } : f );
    setFood(updatedFood);
  };

  const handleAmountChanged = (id, amount) => {
    const updatedFood = food.map(f => 
      f.id === id ? 
        { ...f, amount: amount, isSelected: true } 
        : f 
    );
    setFood(updatedFood);
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <SearchBar text={search} placeholder={'Szukaj dostawcy'} onChange={updateSearch} />
            <SuppliersBasicList items={suppliers} selectedId={selectedSupplier ? selectedSupplier.id : null} onClick={handleSupplierClick} />
          </div>
        );
      case 1:
        return (
          <div >
            <ItemsList items={food} onClick={handleFoodClick} handleAmountChanged={handleAmountChanged} />
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  const isNextStepEnabled = (step) => {
    switch (step) {
      case 0:
        return !!selectedSupplier;
      case 1:
        return food.filter(f => f.isSelected).length > 0;
      default:
        return true;
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {
          steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
              <StepContent>
                {
                  getStepContent(index)
                }
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Cofnij
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      disabled={!isNextStepEnabled(index)}
                    >
                      { activeStep === steps.length - 1 ? 'Potwierdź' : 'Dalej' }
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))
        }
      </Stepper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  list: {
    maxHeight: 150
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
