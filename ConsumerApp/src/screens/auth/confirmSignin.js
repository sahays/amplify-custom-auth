import React, {useState, useEffect} from 'react';
import {ScrollView, KeyboardAvoidingView, StyleSheet, Text} from 'react-native';
import * as yup from 'yup';
import {Auth} from 'aws-amplify';

import IconInput from '../../components/icon-input';
import BlockButton from '../../components/block-button';
import styleConstants from '../../styles/style-constants';
import Logo from '../../components/logo';
import PhoneVerification from '../../components/phone-verification';

const confirmSigninScreen = props => {
  const {navigation} = props;
  const [user, setUser] = useState(navigation.getParam('user'));
  const [code, setCode] = useState(null);
  const [formValid, setFormValid] = useState(true);

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

  const onConfirmSignin = async () => {
    if (formValid) {
      try {
        await Auth.confirmSignIn(user, code);
        // user signed in
        navigation.navigate('AppScreens');
      } catch (e) {
        console.log(e);
      }
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
        <BlockButton label="Confirm" onPress={onConfirmSignin} />
        <Text style={styles.helperText}>
          Enter the SMS verification code sent to your phone to securely login
        </Text>
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 4 * styleConstants.defaultMargin,
  },
});

export default confirmSigninScreen;
