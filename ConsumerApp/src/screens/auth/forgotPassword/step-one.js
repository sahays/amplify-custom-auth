import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import * as yup from 'yup';
import {Auth} from 'aws-amplify';

import styleConstants from '../../../styles/style-constants';
import BlockButton from '../../../components/block-button';
import LinkButton from '../../../components/link-button';
import Logo from '../../../components/logo';
import Username from '../../../components/username';

const step1ForgotPassword = props => {
  const {navigation} = props;
  const [username, setUsername] = useState();
  const [formValid, setFormValid] = useState(false);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(8)
      .max(10),
  });

  useEffect(() => {
    const isValid = schema.isValidSync({
      username,
    });
    setFormValid(isValid);
  }, [username]);

  const onSignin = () => {
    navigation.navigate('Signin');
  };

  const onSignup = () => {
    navigation.navigate('Signup');
  };

  const onPressStepOne = async () => {
    try {
      await Auth.forgotPassword(username);
      navigation.navigate('ForgotPwdStep2', {username});
    } catch (e) {
      if (e.code === 'UserNotFoundException')
        Alert.alert('', "We don't recognize this number", [
          {text: 'Sign up', onPress: onSignup},
          {text: 'Try again'},
        ]);
      console.log(e);
    }
  };

  const showStepOne = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.content}>
          <Logo style={styles.image} />
          <Username
            text={username}
            onChangeText={text => setUsername(text)}
            schema={schema}
          />
          <BlockButton
            label="Send verification SMS"
            onPress={onPressStepOne}
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

  return showStepOne();
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

export default step1ForgotPassword;
