import * as React from 'react';
import { Avatar, Button, Grid, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export const SignIn = ({ onClickButton, onChangeUsername, onChangePassword, onSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Zaloguj
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Nazwa użytkownika"
          autoFocus
          onChange={onChangeUsername}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Hasło"
          type="password"
          id="password"
          onChange={onChangePassword}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={(e) => onSubmit(e)} >
          Zatwierdź
        </Button>
        <Grid item>
          <Link href="#" variant="body2" onClick={onClickButton} >
            Stwórz nowe konto
          </Link>
        </Grid>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
