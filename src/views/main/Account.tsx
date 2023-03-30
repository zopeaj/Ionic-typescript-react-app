import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react';
import '../../styles/Account.scss';
import { logUserOut } from "../../data/user/user.actions";
import { UserLogout } from "../../models/User";
import { connect } from '../../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username?: string;
}

interface DispatchProps {
  logUserOut: typeof logUserOut
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({ username, logUserOut: logUserOutAction }) => {

  const logUserOutData: UserLogout = {
    username: username
  }

  const onLogout = (e: React.ChangeEvent<any>) => {
    await logUserOutAction(logUserOutData);
  }

  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {username && (
          <div className="ion-padding-top ion-text-center">
            Image Data
          </div>
          <h2>{username}</h2>
          <IonList inset>
            <IonItem routerLink="/account/settings" routerDirection="none">
              Settings
            </IonItem>
            <IonItem routerLink="/account/update" routerDirection="none">
              Update
            </IonItem>
            <IonItem onClick={onLogout}>Logout</IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username
  }),
  mapDispatchToProps: {
    logUserOut,
  },
  component: Account
})

