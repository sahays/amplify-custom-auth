import React from 'react';
import IconInput from './icon-input';

const PhoneVerification = props => {
  return (
    <IconInput
      {...props}
      label="SMS verification code"
      icon="cellphone-message"
      type="telephoneNumber"
      keyboardType="numeric"
      name="code"
    />
  );
};

export default PhoneVerification;
