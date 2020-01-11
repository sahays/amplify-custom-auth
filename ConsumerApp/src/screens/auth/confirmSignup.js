import React, {useState, useEffect} from 'react';
import {ScrollView, KeyboardAvoidingView, StyleSheet, Text} from 'react-native';
import * as yup from 'yup';

import IconInput from '../../components/icon-input';
import BlockButton from '../../components/block-button';
import LinkButton from '../../components/link-button';
import styleConstants from '../../styles/style-constants';
import Logo from '../../components/logo';
import {Auth} from 'aws-amplify';
import PhoneVerification from '../../components/phone-verification';

const confirmSignupScreen = props => {
  const {navigation} = props;
  const [username, setUsername] = useState(navigation.getParam('username'));
  const [code, setCode] = useState(null);
  const [formValid, setFormValid] = useState(true);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(8)
      .max(10),
    code: yup
      .string()
      .required()
      .min(5)
      .max(10),
  });

  useEffect(() => {
    const isValid = schema.isValidSync({
      username,
      code,
    });
    setFormValid(isValid);
  }, [username, code]);

  const onConfirmSignup = async () => {
    try {
      if (formValid) {
        await Auth.confirmSignUp(username, code);
        navigation.navigate('Signin');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onResendCode = async () => {
    try {
      if (formValid) {
        const result = await Auth.resendSignUp(username);
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
          label="Confirm Signup"
          onPress={onConfirmSignup}
          disabled={!formValid}
        />
        <Text style={styles.helperText}>
          Enter the SMS verification code sent to your phone to securely login
        </Text>
        <LinkButton
          label="Resend code"
          style={styles.linkButton}
          onTap={onResendCode}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  helperText: {
    ...styleConstants.helperText,
    marginVertical: styleConstants.defaultMargin,
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 4 * styleConstants.defaultMargin,
  },
});

export default confirmSignupScreen;
