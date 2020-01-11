import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {Auth} from 'aws-amplify';
import * as yup from 'yup';

import styleConstants from '../../styles/style-constants';
import BlockButton from '../../components/block-button';
import Logo from '../../components/logo';
import Password from '../../components/password';

const requireNewPasswordScreen = props => {
  const {navigation} = props;
  const [user, setUser] = useState(navigation.getParam('user'));
  const [password, setPassword] = useState('');
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

  const onResetPassword = async () => {
    if (formValid) {
      try {
        await Auth.completeNewPassword(user, password);
        Alert('', 'Done. Please sign in with this new password', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Signin'),
          },
        ]);
      } catch (e) {
        console.log(e);
        Alert('', 'Failed to reset your password', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Signin'),
          },
        ]);
      }
    }
  };

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
          label="Reset password"
          onPress={onResetPassword}
          disabled={!formValid}
        />
        <Text style={styles.helperText}>
          You are required to set a new password
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
export default requireNewPasswordScreen;
