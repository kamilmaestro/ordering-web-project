import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getImageUrl } from '../../../utils/imagesGetter';
import Button from '@material-ui/core/Button';
import { ProposalHeader } from '../ProposalHeader';
import { ProposalFoodPreviewList } from '../ProposalFoodPreviewList/ProposalFoodPreviewList';
import { connect } from 'react-redux';

const OrderPreview = ({ order, supplier, buyerName, food, onClickFood, contextReducer }) => {

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToSupplier = () => {
    onClickFood(supplier.id, supplier.name);
  }

  const getImageHeight = () => {
    if (supplier && supplier.imageId) {
      return 250;
    } else {
      return 0;
    }
  }

  const canEdit = () => {
    const userIds = order.userOrders.map(userOrder => userOrder.orderedFor);
    return contextReducer.user.username === buyerName || userIds.includes(contextReducer.user.id);
  }

  return (
    <div className={classes.root}>
      <Card>
      <CardHeader title={ <ProposalHeader supplierName={supplier ? supplier.name : null} /> } />
      <CardMedia
        style={{height: getImageHeight()}}
        image={supplier ? getImageUrl(supplier.imageId) : null}
      />
      <CardActions disableSpacing>
        <Button color="primary" variant="contained" style={{marginRight: 15}} onClick={() => console.log('domow')} >
          Domawiam
        </Button>
        {
          canEdit() &&
            <Button color="primary" variant="contained" onClick={() => console.log('edit')} >
              Edytuj
            </Button> 
        }
        <IconButton
          className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon className={classes.mainColor}/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout={500} unmountOnExit>
        <CardContent>
          <div className={classes.content}>
            <Typography variant="h6" className={classes.text}>
              { `Kupujący: ${buyerName}` }
            </Typography>
          </div>
          <ProposalFoodPreviewList food={food} onFoodClick={goToSupplier} />
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
};

const mapStateToProps = ({ contextReducer }) => {
  return { contextReducer };
};

export default connect(mapStateToProps)(OrderPreview);

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    marginBottom: 12
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500]
  },
  mainColor: {
    color: theme.palette.primary.main
  },
  text: {
    color: theme.palette.text.primary,
    fontWeight: 100
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));
