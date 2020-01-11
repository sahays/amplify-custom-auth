import React, {useState, useEffect} from 'react';
import {ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import * as yup from 'yup';
import {Auth} from 'aws-amplify';

import styleConstants from '../../../styles/style-constants';
import BlockButton from '../../../components/block-button';
import LinkButton from '../../../components/link-button';
import Logo from '../../../components/logo';
import Password from '../../../components/password';

const step2ForgotPassword = props => {
  const {navigation} = props;

  const [username, setUsername] = useState(navigation.getParam('username'));
  const [password, setPassword] = useState();
  const [formValid, setFormValid] = useState(false);

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password too short')
      .max(12, 'Password too long'),
  });

  useEffect(() => {
    const isValid = schema.isValidSync({
      password,
    });
    setFormValid(isValid);
  }, [password]);

  const onSignin = () => {
    navigation.navigate('Signin');
  };

  const onPressStepTwo = () => {
    navigation.navigate('ForgotPwdStep3', {
      username,
      password,
    });
  };

  const showStepTwo = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.content}>
          <Logo style={styles.image} />
          <Password
            text={password}
            onChangeText={text => setPassword(text)}
            schema={schema}
          />
          <BlockButton
            label="Set new password"
            onPress={onPressStepTwo}
            disabled={!formValid}
          />
          <LinkButton
            label="Have an account? Sign in"
            style={styles.linkButton}
            onTap={onSignin}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  };

  return showStepTwo();
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
export default step2ForgotPassword;
