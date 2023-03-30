import React, { useState } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonButton, IonIcon, IonHeader, IonModal, IonToast, IonList, IonItem, IonLabel, IonInput, IonText, IonRow, IonCol, IonAlert } from '@ionics/react';
import '../../../styles/UserUpdate.scss';
import { connect } from '../../../data/connect';
import { updateUser } from '../../../data/user/user.actions';
import { getCurrentUsername, getCurrentEmail, getCurrentId, getCurrentPhoneNumber, getCurrentPassword } from '../../../data/user/user.selector';
import { IUserUpdate } from '../../../models/User';
import { RouteComponentProps } from "react-router";

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username: string;
  email: string;
  phonenumber: number;
  id: number;
}

interface DispatchProps {
   updateUser: typeof updateUser;
}

interface OwnProps extends RouteComponentProps { }



interface UserUpdateProps extends OwnProps, StateProps, DispatchProps { }

const UserUpdate: React.FC<UserUpdateProps> = ({ updateUser: updateUserAction, username, email, id, phonenumber, }) => {

  const [updateUsername, setUpdateUsername] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePhonenumber, setUpdatePhonenumber] = useState(+234);
  const [updatePassword, setUpdatePassword] = useState('');
  const [confirmUpdatePassword, setConfirmUpdatePassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const updateUserData: IUserUpdate = {
    username: updateUsername,
    email: updateEmail,
    phonenumber: updatePhonenumber,
    password: updatePassword,
  }

  const onUpdateUser = async (e: React.FormEvent<any>) => {
    await updateUser(updateUserData, id);
  }

  const onUpdateUsernameChange = (e: React.ChangeEvent<any>) => {};
  const onUpdateEmailChange = (e: React.ChangeEvent<any>) => {};
  const onUpdatePhoneNumberChange = (e: React.ChangeEvent<any>) => {};

  return (
     <IonPage id="user-update-page">
       <IonHeader>
         <IonToolbar>
           <IonButtons slot="start">
             <IonMenuButton></IonMenuButton>
           </IonButtons>
           <IonTitle>Update User</IonTitle>
         </IonToolbar>
       </IonHeader>
       <IonContent>

         <form onSubmit={onUpdateUser}>
           <IonList>
             <IonItem>
               <IonLabel position="stacked" color="primary">Username</IonLabel>
               <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={onUpdateUsernameChange} required></IonInput>
             </IonItem>
             {formSubmitted && usernameError &&
              <IonText color="danger">
                 <p className="ion-padding-start">
                   Username is required
                 </p>
             </IonText>
             }

             <IonItem>
               <IonLabel position="stacked" color="primary">Email</IonLabel>
               <IonInput name="email" type="email" value={email} onIonChange={onUpdateEmailChange} required></IonInput>
             </IonItem>
             {formSubmitted && emailError &&
               <IonText color="danger">
                 <p className="ion-padding-start">
                   Email is required
                 </p>
               </IonText>
             }

             <IonItem>
               <IonLabel position="stacked" color="primary">Phone Number</IonLabel>
               <IonInput name="phonenumber" type="tel" value={phonenumber} onIonChange={onUpdatePhoneNumberChange} required></IonInput>
             </IonItem>
             {formSubmitted && phoneNumberError &&
               <IonText color="danger">
                 <p className="ion-padding-start">
                   PhoneNumber is required
                 </p>
               </IonText>
             }
           </IonList>

           <IonRow>
             <IonCol>
               <IonButton type="submit" expand="block">
                   Update
               </IonButton>
             </IonCol>
           </IonRow>
         </form>
       </IonContent>
     </IonPage>
  );
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: getCurrentUsername(state),
    email: getCurrentEmail(state),
    id: getCurrentId(state),
    phonenumber: getCurrentPassword(state)
  }),
  mapDispatchToProps: {
    updateUser,
  },
  component: UserUpdate
})
