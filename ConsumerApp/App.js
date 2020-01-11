import React from 'react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
Amplify.configure(awsmobile);

import homeScreen from './src/screens/home';
import signinScreen from './src/screens/auth/signin';
import signupScreen from './src/screens/auth/signup';
import confirmSigninScreen from './src/screens/auth/confirmSignin';
import confirmSignupScreen from './src/screens/auth/confirmSignup';
import requireNewPasswordScreen from './src/screens/auth/requireNewPassword';
import authLoadingScreen from './src/screens/auth/loading';
import step2ForgotPassword from './src/screens/auth/forgotPassword/step-two';
import step3ForgotPassword from './src/screens/auth/forgotPassword/step-three';
import step1ForgotPassword from './src/screens/auth/forgotPassword/step-one';

const appDrawer = createDrawerNavigator(
  {
    Home: homeScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
  },
);
const authStack = createStackNavigator(
  {
    Signup: {
      screen: signupScreen,
    },
    Signin: {
      screen: signinScreen,
    },
    ForgotPassword: {
      screen: step1ForgotPassword,
    },
    ForgotPwdStep2: {
      screen: step2ForgotPassword,
    },
    ForgotPwdStep3: {
      screen: step3ForgotPassword,
    },
    ConfirmSignup: {
      screen: confirmSignupScreen,
    },
    ConfirmSignin: {
      screen: confirmSigninScreen,
    },
    RequireNewPassword: {
      screen: requireNewPasswordScreen,
    },
  },
  {
    initialRouteName: 'ForgotPassword',
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerShown: false,
    },
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: authLoadingScreen,
      AppScreens: appDrawer,
      AuthScreens: authStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

const App = () => {
  return <AppContainer />;
};
export default App;
