import {StyleSheet, Text, View} from 'react-native';
import styleConstants from './style-constants';

const defaultStyle = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bodyPadding: {
    padding: styleConstants.bodyPadding,
  },
  blockButton: {
    borderRadius: styleConstants.roundedBorder,
    padding: 2 * styleConstants.defaultPadding,
    alignItems: 'center',
    width: '100%',
  },
  debug: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default defaultStyle;
