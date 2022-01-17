import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { SignIn } from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignIn/SignUp';
import pizza from '../../images/pizza.jpg';
import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { useHistory } from "react-router-dom";
import { MAIN_VIEW_URL } from '../../utils/urlProvider';
import { connect } from 'react-redux';
import { authSuccess } from '../../actions/contextActions';
import { signIn } from '../../apiServices/authenticationApi';
import { AUTH_HEADER } from '../../utils/constants';
import { setToken } from '../../utils/tokenGetter';

const SignInPage = ({ setLoggedInUser }) => {

  const classes = useStyles();
  const history = useHistory();
  const [hasAccount, setHasAccount] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onClickButton = () => {
    setHasAccount(!hasAccount);
  }

  const onSignInSubmit = (event) => {
    event.preventDefault();
    signIn(username, password)
      .then((response) => {
        if (response.status === 200) {
          setLoggedInUser(response.data);
          setToken(Object.values(response.headers)[0]);
          history.push(MAIN_VIEW_URL);
          resetData();
        } else {
          console.log(response);
        }
      }).catch(error => {
        console.log(error);
      })
  }

  const resetData = () => {
    setUsername('');
    setPassword('');
    setEmail('');
  }

  const onSignUpSubmit = () => {
    onClickButton();
  }

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  return (
    <Grid container component="main" style={{height: '100vh'}} >
      <CssBaseline />
      <HomeHeader color='white' />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {
          hasAccount ?
            <SignIn 
              onClickButton={onClickButton} 
              onChangeUsername={onChangeUsername} 
              onChangePassword={onChangePassword} 
              onSubmit={onSignInSubmit} 
            />
          : <SignUp onClickButton={onClickButton} onSubmit={onSignUpSubmit} />
        }
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      setLoggedInUser: (data) => {
        dispatch(authSuccess(data))
      }
  }
}

export default connect(null, mapDispatchToProps)(SignInPage);

const useStyles = makeStyles(() => ({
  image: {
    backgroundImage: `url(${pizza})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}));
