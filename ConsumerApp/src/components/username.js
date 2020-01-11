import React, {useState} from 'react';
import IconInput from './icon-input';

const Username = props => {
  return (
    <IconInput
      {...props}
      label="Phone number"
      icon="cellphone"
      type="telephoneNumber"
      name="username"
      keyboardType="numeric"
    />
  );
};

export default Username;
