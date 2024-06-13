
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../shared/theme/colors';
import {appRadius, family, size} from '../../shared/theme/sizes';
import {Input} from 'react-native-elements';
import { HP, WP } from '../../exporter';
import LinearGradient from 'react-native-linear-gradient';
interface Textinputprops {
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  value?: any;
  onChangeText?: any;
  onBlur?: any;
  blurOnSubmit?: boolean;
  disableFullscreenUI?: boolean;
  autoCapitalize: string;
  onSubmitEditing?: any;
  returnKeyType: any;
  touched: any;
  error: any;
  maxLength: any;
  editable: any;
  rightText: boolean;
  numberofLines: any;
  onPressIn: () => void;
  Label: string;
  RightIcon: any;
  iconstyle: any;
  labelstyle: any;
  Textprops?: any;
  Containerstyle?: any;
  errorMessage?:any;
  inputprops?:any;
  inputstyle?:any;
  numberOfLines?:any;
  multiline?:boolean
}

const UrlTextInput = ({
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
  touched,
  error,
  onPressIn,
  Label,
  RightIcon,
  iconstyle,
  labelstyle,
  Textprops,
  Containerstyle,
  errorMessage,
  inputprops,
  inputstyle,
  numberOfLines,
  multiline
}: Textinputprops) => {
  return (
      <Input
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        label={Label}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        containerStyle={Containerstyle}
        inputContainerStyle={[styles.viewcontainer,{...inputprops}]}
        inputStyle={[styles.inputtext,{...inputstyle}]}
        labelStyle={labelstyle}
        rightIcon={RightIcon}
        labelProps={{...Textprops}}
        rightIconContainerStyle={iconstyle}
        onPressIn={onPressIn}
        autoCompleteType={undefined}
        errorMessage={touched && errorMessage ? errorMessage : ''}
        errorStyle={styles.errorStyle}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
  );
};
export {UrlTextInput};

const styles = StyleSheet.create({
  viewcontainer: {
    borderBottomWidth: 1,
     marginVertical: 1,
      width:WP("80"), 
      height:HP("6"),
       backgroundColor:"white",
        borderRadius:20, 
        borderWidth:1,
         borderColor:"#D4D4D4",
         marginTop:WP("7")
  },
  txt: {
    fontSize: size.normal,
    color: '#A0A0A0',
  },
inputtext:{
  color: '#A0A0A0',
  fontFamily: family.InterLight,
  fontSize: 14,
  textAlign:"center"
},
label: {
    color: colors.White,
    fontFamily: family.InterBlack
  },
  errorStyle: {
    fontSize: size.tiny,
    color: 'red',
    alignSelf: "flex-start",
  },
  
});
