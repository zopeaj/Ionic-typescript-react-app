import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';
import { createUser } from '../data/user/user.actions';
import { getUserRegistrationError } from '../data/user/user.selector';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { IUserCreate } from '../models/User';



interface OwnProps extends RouteComponentProps { }

interface StateProps {
  registrationError?: any;
}

interface DispatchProps {
  createUser: typeof createUser;
}

interface RegisterProps extends OwnProps, StateProps, DispatchProps { }


enum Gender {
  MALE,
  FEMALE,
  OTHER
}

const selectOptions: any = {
  male: 'MALE',
  female: 'FEMALE',
  other: 'OTHER'
};



const Register: React.FC<RegisterProps> = ({ createUser: createUserAction, registrationError }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('johndoe@example.com');
  const [phonenumber, setPhoneNumber] = useState(0);
  const [gender, setGender] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!name && name.length === 0) {
      setNameError(true);
    }
    if(!password && password.length === 0 || !/^[a-zA-Z|0-9]/.test(password)){
      setPasswordError(true);
    }

    if(!/^http:[a-z]|[0-9]@.[a-z]/.test(email)) {
      setEmailError(true);
    }

    const isData = name && password || profilePic && age && email && phonenumber && gender;

    const userCreate:IUserCreate = {
      name: name,
      profilePic: profilePic,
      age: age,
      email: email,
      phonenumber: phonenumber,
      password: password,
      gender: gender
    }

    if(isData) {
      await createUserAction(userCreate);
      if(registrationError !== null) {
        return (
          <IonAlert data={registrationError} />
        );
      }
      navigate('/account');
    }
  };

  const onNameChange = (e: React.ChangeEvent<any>) => {
    setName(e.detail.value!);
    setNameError(false);
  };

  const onSelectChange = (e: React.ChangeEvent<any>) => {
    setGender(e.detail.value!);
  };

  const onEmailChange = (e: React.ChangeEvent<any>) => {

  };

  const onAgeChange = (e: React.ChangeEvent<any>) => {

  };

  const onPhoneNumberChange = (e: React.ChangeEvent<any>) => {

  };

  const onPasswordChange = (e: React.ChangeEvent<any>) => {

  };

  const onConfirmPassword = (e: React.ChangeEvent<any>) => {

  };

  const onProfilePicChange = (e: React.ChangeEvent<any>) => {

  };

  return (
     <IonPage id="register-page">
       <IonHeader>
         <IonToolbar>
           <IonButtons slot="start">
             <IonMenuButton></IonMenuButton>
           </IonButtons>
           <IonTitle>Register</IonTitle>
         </IonToolbar>
       </IonHeader>
       <IonContent>

         <div className="login-logo">
           <img src="assets/img/appicon.svg" alt="App" />
         </div>

         <form onSubmit={register}>
           <IonList>
             <IonItem>
               <IonLabel position="stacked" color="primary">Name</IonLabel>
               <IonInput name="name" type="text" value={name} spellCheck={false} autocapitalize="off" onIonChange={onNameChange} required></IonInput>
             </IonItem>
             {formSubmitted && nameError &&
              <IonText color="danger">
                 <p className="ion-padding-start">
                   Username is required
                 </p>
             </IonText>
             }

             <IonItem>
               <IonLabel position="stacked" color="primary">Email</IonLabel>
               <IonInput name="email" type="email" value={email} onIonChange={onEmailChange} required></IonInput>
             </IonItem>
             {formSubmitted && emailError &&
               <IonText color="danger">
                 <p className="ion-padding-start">
                   Email is required
                 </p>
               </IonText>
             }

             <IonItem>
               <IonLabel position="stacked" color="primary">Age</IonLabel>
               <IonInput name="age" type="number" value={age} onIonChange={onAgeChange} required></IonInput>
             </IonItem>

             <IonItem>
               <IonLabel position="stacked" color="primary">Phone Number</IonLabel>
               <IonInput name="phonenumber" type="tel" value={phonenumber} onIonChange={onPhoneNumberChange} required></IonInput>
             </IonItem>

             <IonList>
               <IonItem>
                 <IonLabel position="stacked" color="primary">Password</IonLabel>
                 <IonInput name="password" type="password" value={password} onIonChange={onPasswordChange} required></IonInput>
               </IonItem>

               <IonItem>
                 <IonLabel position="stacked" color="primary">Confirm Password</IonLabel>
                 <IonInput name="confirm-password" type="password" value={confirmPassword} onIonChange={onConfirmPassword} required></IonInput>
               </IonItem>
             </IonList>

             <IonItem>
               <IonLabel position="stacked" color="primary">ProfilePic</IonLabel>
               <IonInput name="profilePic" type="file" value={profilePic} onIonChange={onProfilePicChange} required></IonInput>
             </IonItem>

             <IonItem>
               <IonLabel>Select Gender</IonLabel>
               <IonSelect onIonChange={onSelectChange}>
                 <IonSelectOption value={selectOptions.male}>
                    {selectOptions.male}
                 </IonSelectOption>
                 <IonSelectOption value={selectOptions.female}>
                    {selectOptions.female}
                 </IonSelectOption>
                 <IonSelectOption value={selectOptions.other}>
                    {selectOptions.other}
                 </IonSelectOption>
               </IonSelect>
             </IonItem>
           </IonList>

           <IonRow>
             <IonCol>
               <IonButton type="submit" expand="block">
                   Register
               </IonButton>
             </IonCol>
           </IonRow>
         </form>
       </IonContent>
     </IonPage>
  );
}

export default connect<OwnProps, {}, DispatchProps>({
  mapStateToProps:(state) => ({
    registrationError: getUserRegistrationError(state)
  }),
  mapDispatchToProps: {
    createUser,
  },
  component: Register
})
