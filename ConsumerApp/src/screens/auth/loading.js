import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, AsyncStorage} from 'react-native';
import Amplify, {Auth, Hub} from 'aws-amplify';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const authLoadingScreen = props => {
  const {navigation} = props;
  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        await Auth.currentAuthenticatedUser({
          // bypassCache: true,
        });
        navigation.navigate('AppScreens');
      } catch (e) {
        navigation.navigate('AuthScreens');
      }
    };

    isAuthenticated();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};
export default authLoadingScreen;
