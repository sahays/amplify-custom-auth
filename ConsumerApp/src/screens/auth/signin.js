import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Auth} from 'aws-amplify';
import * as yup from 'yup';

import Logo from '../../components/logo';
import BlockButton from '../../components/block-button';
import LinkButton from '../../components/link-button';
import styleConstants from '../../styles/style-constants';
import Username from '../../components/username';
import Password from '../../components/password';

const signinScreen = props => {
  const {navigation} = props;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Phone number is required')
      .min(9, 'Phone number too short')
      .max(11, 'Phone number too long'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password too short')
      .max(12, 'Password too long'),
  });

  useEffect(() => {
    const isValid = schema.isValidSync({
      username,
      password,
    });
    setFormValid(isValid);
  }, [username, password]);

  const onSignup = () => {
    navigation.navigate('Signup');
  };
  const onForgot = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignin = async () => {
    try {
      const result = await Auth.signIn(username, password);
      if (
        result.challengeName === 'SMS_MFA' ||
        result.challengeName === 'SOFTWARE_TOKEN_MFA'
      ) {
        navigation.navigate('ConfirmSignin', {
          user: result,
        });
      } else if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
        Alert.alert('', 'You need to reset your password for secure login', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('RequireNewPassword', {
                user: result,
              }),
          },
        ]);
      }
    } catch (err) {
      console.log(err);
      if (err.code === 'UserNotConfirmedException') {
        Alert.alert(
          '',
          'For secure signin, you need to verify your phone number',
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('ConfirmSignup', {
                  username,
                }),
            },
          ],
        );
      } else if (err.code === 'PasswordResetRequiredException') {
        navigation.navigate('ForgotPassword');
      } else if (err.code === 'NotAuthorizedException') {
        Alert.alert('', 'Please verify the password that you have enetered', [
          {text: 'Try again'},
        ]);
      } else if (err.code === 'UserNotFoundException') {
        Alert.alert('', "We don't recognize this number", [
          {text: 'Signup', onPress: () => navigation.navigate('Signup')},
          {text: 'Try again'},
        ]);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding" enabled style={styles.content}>
        <Logo style={styles.image} />
        <Username
          text={username}
          onChangeText={text => setUsername(text)}
          schema={schema}
        />
        <Password
          text={password}
          onChangeText={text => setPassword(text)}
          schema={schema}
        />
        <BlockButton label="Sign in" onPress={onSignin} disabled={!formValid} />
        <LinkButton
          label="New user? Sign up"
          style={styles.linkButton}
          onTap={onSignup}
        />
        <LinkButton label="Forgot password?" onTap={onForgot} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 4 * styleConstants.defaultMargin,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    padding: styleConstants.bodyPadding,
  },
  linkButton: {marginTop: styleConstants.defaultMargin},
});

export default signinScreen;
