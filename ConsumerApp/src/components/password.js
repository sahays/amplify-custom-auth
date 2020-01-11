import React, {useState} from 'react';
import IconInput from './icon-input';

const Password = props => {
  return (
    <IconInput
      {...props}
      label="Password"
      icon="lock-outline"
      type="password"
      name="password"
    />
  );
};

export default Password;
