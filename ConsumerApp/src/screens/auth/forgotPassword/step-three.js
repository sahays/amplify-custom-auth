import React, {useState, useEffect} from 'react';
import {ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import * as yup from 'yup';
import {Auth} from 'aws-amplify';

import styleConstants from '../../../styles/style-constants';
import BlockButton from '../../../components/block-button';
import LinkButton from '../../../components/link-button';
import Logo from '../../../components/logo';
import PhoneVerification from '../../../components/phone-verification';

const step3ForgotPassword = props => {
  const {navigation} = props;

  const [username, setUsername] = useState(navigation.getParam('username'));
  const [password, setPassword] = useState(navigation.getParam('password'));
  const [code, setCode] = useState();
  const [formValid, setFormValid] = useState(false);

  const schema = yup.object().shape({
    code: yup
      .string()
      .required()
      .min(5)
      .max(10),
  });

  useEffect(() => {
    const isValid = schema.isValidSync({
      code,
    });
    setFormValid(isValid);
  }, [code]);

  const onSignin = () => {
    navigation.navigate('Signin');
  };

  const onPressStepThree = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, password);
    } catch (e) {
      Alert.alert('', "This code didn't work. Did you get our SMS?", [
        {text: 'Try again'},
        {text: 'Resend SMS', onPress: onResendCode},
      ]);
      console.log(e);
    }
  };

  const onResendCode = async () => {
    try {
      if (formValid) {
        await Auth.resendSignUp(username);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('', 'Failed to SMS your verification code', [
        {
          text: 'Try again later',
          onPress: () => {
            navigation.navigate('Signup');
          },
        },
      ]);
    }
  };

  const showStepThree = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.content}>
          <Logo style={styles.image} />
          <PhoneVerification
            text={code}
            onChangeText={text => setCode(text)}
            schema={schema}
          />
          <BlockButton
            label="Reset Password"
            onPress={onPressStepThree}
            disabled={!formValid}
          />
          <LinkButton
            label="Have an account? Sign in"
            style={styles.linkButton}
            onTap={onSignin}
          />
          <LinkButton
            label="Resend code"
            style={styles.linkButton}
            onTap={onResendCode}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  };

  return showStepThree();
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
    width: 150,
    height: 150,
    marginBottom: 4 * styleConstants.defaultMargin,
  },
  linkButton: {marginTop: styleConstants.defaultMargin},
});
export default step3ForgotPassword;
