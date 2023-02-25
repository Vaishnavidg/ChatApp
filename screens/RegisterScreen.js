import { StyleSheet, View } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Button,Input, Text } from 'react-native-elements'
import { useLayoutEffect } from 'react'
import { auth } from '../firebase'

const RegisterScreen = ({navigation}) => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[image, setImage] = useState("");

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: "Back to Login",
      });
    }, [navigation])

    const register =()=>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser) =>{
            authUser.user.updateProfile({
                displayName: name,
                photoURL:image || 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png'
            });
        }).catch ((error) => alert(error.message))
    };

  return (
    <KeyboardAvoidingView behavior='padding' style = {styles.container}>
        <StatusBar style='light'/>
        <Text h3 style = {{marginBottom:50, color:'#2c6bed'}}>
            Create a Signal Account
        </Text>
        <View style = {styles.inputcontainer}>
            <Input placeholder = "Full Name" autoFocus
            type = 'text' 
            value = {name}
            onChangeText = {(text) => setName(text)}
            />
             <Input placeholder = "Email" 
            type = 'text' 
            value = {email}
            onChangeText = {(text) => setEmail(text)}
            />
             <Input placeholder = "Password" secureTextEntry
            type = 'text' 
            value = {password}
            onChangeText = {(text) => setPassword(text)}
            />
             <Input placeholder = "Image" 
            type = 'text' 
            value = {image}
            onChangeText = {(text) => setImage(text)}
            onSubmitEditing = {register}
            />
        </View>
        <Button containerStyle = {styles.button} raised onPress={register} title = "Register"/>
    </KeyboardAvoidingView>
    
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        backgroundColor:'white'
    },
    inputcontainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})