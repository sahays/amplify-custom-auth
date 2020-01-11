import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Auth} from 'aws-amplify';
import * as yup from 'yup';
import * as RNLocalize from 'react-native-localize';

import styleConstants from '../../styles/style-constants';
import IconInput from '../../components/icon-input';
import BlockButton from '../../components/block-button';
import LinkButton from '../../components/link-button';
import Logo from '../../components/logo';
import Username from '../../components/username';
import Password from '../../components/password';

const signupScreen = props => {
  const {navigation} = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    firstName: yup
      .string()
      .required('First name is required')
      .min(2, 'First name too short')
      .max(100, 'First name too long'),
    lastName: yup
      .string()
      .required('Last name is required')
      .min(2, 'Last name too short')
      .max(100, 'Last name too long'),
  });

  const onSignin = () => {
    navigation.navigate('Signin');
  };

  useEffect(() => {
    const isValid = schema.isValidSync({
      firstName,
      lastName,
      username,
      password,
    });
    setFormValid(isValid);
  }, [firstName, lastName, username, password]);

  const getCountryCode = () => {
    const country = RNLocalize.getCountry();
    console.log(country);
    if (country === 'US') return '+1';
    if (country === 'IN') return '+91';
    return '+91';
  };

  const onSignup = async () => {
    if (formValid) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            given_name: firstName,
            family_name: lastName,
            phone_number: getCountryCode() + username,
          },
        });
        navigation.navigate('ConfirmSignup', {
          username,
        });
      } catch (e) {
        switch (e.code) {
          case 'InvalidParameterException':
          case 'InvalidPasswordException':
            Alert.alert(
              '',
              'Use a different password that is at least 6 characters long and that contains one uppercase, one lowercase, and one number e.g. Apple123',
              [{text: 'OK'}],
            );
            break;
          case 'UsernameExistsException':
            Alert.alert(
              '',
              'Someone has already used this phone number to signup',
              [{text: 'Try a different phone number'}],
            );
          case 'CodeDeliveryFailureException':
          default:
            console.log(e);
        }
        console.log(e);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding" enabled style={styles.content}>
        <Logo style={styles.image} />

        <IconInput
          label="First name e.g. Vijay"
          icon="pencil-box-outline"
          type="givenName"
          onChangeText={text => setFirstName(text)}
          value={firstName}
          name="firstName"
          schema={schema}
        />
        <IconInput
          label="Last name e.g. Kumar"
          icon="pencil-box-outline"
          type="familyName"
          onChangeText={text => setLastName(text)}
          value={lastName}
          name="lastName"
          schema={schema}
        />
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
        <BlockButton label="Sign up" onPress={onSignup} disabled={!formValid} />
        <LinkButton
          label="Have an account? Sign in"
          style={styles.linkButton}
          onTap={onSignin}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 4 * styleConstants.defaultMargin,
  },
});
export default signupScreen;
