import React from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import styleConstants from '../../styles/style-constants';
import IconInput from '../../components/icon-input';
import BlockButton from '../../components/block-button';

const requireNewPasswordScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding" enabled style={styles.content}>
        <Logo style={styles.image} />
        <IconInput label="Password" icon="lock-outline" type="password" />
        <BlockButton label="Reset password" />
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
