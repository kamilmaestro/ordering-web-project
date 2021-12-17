import * as React from 'react';
import {Button, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from '@material-ui/icons/Schedule';
import {getDateTime} from "../../../../utils/dateFormatter";
import CardHeader from "@material-ui/core/CardHeader";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from '@material-ui/icons/Delete';
import {useState} from "react";
import EditIcon from '@material-ui/icons/Edit';

export const Header = ({ userName, createdAt, expanded, handleExpandClick, withDelete, withEdit, onClickEdit, onClickRemove }) => {

  const classes = useStyles();
  const [hovered, setHovered] = useState(false);

  const hasDelete = () => {
    return hovered && withDelete;
  }

  const hasEdit = () => {
    return hovered && withEdit;
  }

  return (
    <CardHeader
      title={
        <IconButton disabled >
          <PersonIcon className={classes.icon} />
          <div style ={{color: '#37474f'}}>
            { userName }
          </div>
        </IconButton>
      }
      subheader={
        <IconButton disabled size={"small"} style={{paddingLeft: 12}}>
          <ScheduleIcon className={classes.icon} />
          <div style ={{color: '#6b777d'}}>
            { getDateTime(createdAt) }
          </div>
        </IconButton>
      }
      action={
        <div className={classes.actions}>
          {
            hasDelete() &&
              <IconButton
                onClick={onClickRemove}
                style={{marginRight: 12}}
              >
                <DeleteIcon className={classes.mainColor}/>
              </IconButton>
          }
          {
            hasEdit() &&
              <IconButton
                onClick={onClickEdit}
                style={{marginRight: 12}}
              >
                <EditIcon className={classes.mainColor}/>
              </IconButton>
          }
          <IconButton
            className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon className={classes.mainColor}/>
          </IconButton>
        </div>
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  },
  icon: {
    marginRight: 5
  },
  mainColor: {
    color: theme.palette.primary.main
  },
  actions: {
    marginTop: 12,
    marginRight: 12
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
  }
}));
