import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonMenuButton, IonButton, IonTitle, IonText, IonButtons } from '@ionic/react';
import
import '../../../styles/UserSettings.scss';

interface OwnProps {

}

interface StateProps {

}

interface DispatchProps {

}

interface UserSettingsProps extends OwnProps, StateProps, DispatchProps { }

export const UserSettings: React.FC<UserSettingsProps> = ({}) => {
  return (
     <IonPage id="user-settings-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>User Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        </IonContent>
     </IonPage>
  );
}

export default React.memo(UserSettings);
