import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonAlert } from '@ionic/react';
import '../styles/Login.scss';
import { logUserIn } from '../data/user/user.actions';
import { getUserLoginError } from "../data/user/user.selector";
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { UserLogin } from '../models/User';
import { useNavigate } from "react-router-dom";


interface OwnProps extends RouteComponentProps { }

interface StateProps {
  loginError?: any;
}

interface DispatchProps {
  logUserIn: typeof logUserIn;
}

interface LoginProps extends OwnProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({
  logUserIn, loginError
}) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    const loginUserData:UserLogin  = {
      username: username,
      password: password
    }

    if(username && password) {
      await logUserIn(loginUserData);
      if(loginError !== null) {
         return  (
          <IonAlert data={loginError} />
         );
      }
      navigate('/account');
    }
  };

  const onUsernameChange = (e: React.ChangeEvent<any>) => {
    setUsername(e.detail.value!);
  };

  const onPasswordChange = (e: React.ChangeEvent<any>) => {
    setPassword(e.detail.value!);
  }

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="app" />
        </div>

        <form onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Username
              </IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={onUsernameChange} required></IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>
            }

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={onPasswordChange}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/register" color="light" expand="block">
                Signup
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default connect<OwnProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({
    loginError: getUserLoginError(state)
  }),
  mapDispatchToProps: {
    logUserIn,
  },
  component: Login
})
