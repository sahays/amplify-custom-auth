import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import defaultStyle from '../styles/default-style';
import styleConstants from '../styles/style-constants';

const LinkButton = props => {
  const buttonStyle = {
    ...props.style,
    ...styles.button,
  };
  return (
    <TouchableOpacity onPress={props.onTap} style={buttonStyle}>
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: styleConstants.defaultPadding,
    borderBottomColor: styleConstants.primary,
    borderBottomWidth: 1,
  },
  text: {
    color: styleConstants.primary,
    fontFamily: styleConstants.regularFont,
    fontSize: styleConstants.normalFontSize,
  },
});

export default LinkButton;
