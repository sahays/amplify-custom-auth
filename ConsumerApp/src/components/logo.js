import React from 'react';
import {Image} from 'react-native';
import logo from '../../assets/images/logo.png';

const Logo = props => {
  return <Image {...props} source={logo} />;
};

export default Logo;
