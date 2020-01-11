import React, {useState, useEffect} from 'react';
import defaultStyle from '../styles/default-style';
import styleConstants from '../styles/style-constants';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

const BlockButton = props => {
  const {disabled, onPress, type, label} = props;

  // const [disable, setDisable] = useState(disabled);
  const [busy, setBusy] = useState(false);

  const busyOrNot = () => {
    if (busy)
      return (
        <ActivityIndicator
          color={styleConstants.buttonText}></ActivityIndicator>
      );
    return <Text style={styles.text}>{label}</Text>;
  };

  const whichStyle = () => {
    if (type && type === 'secondary') return styles.secondary;
    if (disabled) return styles.muted;

    return styles.primary;
  };

  return (
    <TouchableOpacity
      style={whichStyle()}
      onPress={async () => {
        setBusy(true);
        await onPress();
        setBusy(false);
      }}
      disabled={disabled}>
      {busyOrNot()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    ...defaultStyle.blockButton,
    backgroundColor: styleConstants.success,
  },
  secondary: {
    ...defaultStyle.blockButton,
    backgroundColor: styleConstants.secondary,
  },
  muted: {
    ...defaultStyle.blockButton,
    backgroundColor: styleConstants.muted,
  },
  text: {
    fontFamily: styleConstants.regularFont,
    fontSize: styleConstants.normalFontSize,
    color: styleConstants.buttonText,
    textTransform: 'uppercase',
  },
});

export default BlockButton;
