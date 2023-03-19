import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

interface ISocialLoginButtonProps {
    type:string;
    color:string;
}

const SocialLoginButton = ({type, color}:ISocialLoginButtonProps) => {
  return (
    <TouchableOpacity style={{...styles.button, backgroundColor:color}} >
      <FontAwesomeIcons name={type} size={25} color='#fff' />
    </TouchableOpacity>
  )
}

export default SocialLoginButton

const styles = StyleSheet.create({
  button:{
    padding:2,
    borderRadius:100,
    width:45,
    height:45,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:15
  }
})