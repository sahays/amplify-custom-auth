import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import styleConstants from '../styles/style-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';

const IconInput = props => {
  const {
    style,
    onChangeText,
    name,
    schema,
    icon,
    type,
    disabled,
    keyboardType,
    label,
    text,
  } = props;

  const [error, setError] = useState(null);
  const [secureText, setSecureText] = useState(true);

  const containerStyle = {
    ...style,
    ...styles.container,
  };

  const handleChange = async input => {
    onChangeText(input);
    try {
      yup.reach(schema, name).validateSync(input);
      setError(null);
    } catch (e) {
      const {errors} = e;
      setError(errors);
    }
  };

  const showAlertOrInfo = () => {
    if (error) return <Icon name="alert-circle" style={styles.alert}></Icon>;
    return (
      <Icon
        name={icon}
        size={styleConstants.normalFontSize}
        style={styles.icon}
      />
    );
  };

  const showPasswordOrNot = () => {
    if (type === 'password')
      return (
        <Icon
          name="lock-open-outline"
          style={styles.primary}
          onPress={() => {
            setSecureText(!secureText);
          }}></Icon>
      );
  };

  const isEditable = () => {
    if (disabled) return false;
    return true;
  };
  return (
    <>
      <View style={containerStyle}>
        {showAlertOrInfo()}
        <TextInput
          style={styles.text}
          editable={isEditable()}
          textContentType={type}
          secureTextEntry={type === 'password' && secureText}
          keyboardType={keyboardType || 'default'}
          placeholder={label}
          onChangeText={input => handleChange(input)}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="fuck-off"
          value={text}
          placeholderTextColor={styleConstants.placeholderTextColor}
        />
        {showPasswordOrNot()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: styleConstants.roundedBorder,
    padding: styleConstants.defaultPadding,
    marginBottom: styleConstants.defaultMargin,
    alignItems: 'center',
  },
  icon: {
    color: styleConstants.primary,
    fontSize: styleConstants.normalFontSize,
    marginRight: styleConstants.defaultMargin,
  },
  text: {
    flex: 1,
    color: styleConstants.primary,
    fontFamily: styleConstants.mediumFont,
    fontSize: styleConstants.normalFontSize,
  },
  alert: {
    color: styleConstants.warning,
    fontSize: styleConstants.normalFontSize,
    marginRight: styleConstants.defaultMargin,
  },
  primary: {
    color: styleConstants.primary,
    fontSize: styleConstants.normalFontSize,
  },
});

export default IconInput;
