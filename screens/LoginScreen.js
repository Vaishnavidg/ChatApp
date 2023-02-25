import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image,Input,Button } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { useEffect } from 'react'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    //initialise email and password ,used useState hook
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            if(authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    },[]);
    const signIn = ()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error)=> alert(error));
    };
    
    
  return (
    //whole page
    <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
        <StatusBar style='light'/>
        {/* image part */}
        <Image
            source = {{
                uri:"https://img.freepik.com/premium-vector/logo-talk-speak-speech-chat-bubble-icon-logo-sign-vector_8169-144.jpg?w=2000",
            }}
            style = {{width:200,height:250}}
        />
        {/* input Container */}
        <View style = {styles.inputcontainer}>
            <Input
                placeholder='Email' 
                autoFocus 
                type = "email"
                value={email}
                onChangeText = {(text) => setEmail(text)}/>
             <Input
                placeholder='Password' 
                secureTextEntry
                type = "password"
                value={password}
                onChangeText = {(text) => setPassword(text)}
                onSubmitEditing = {signIn}/>
        </View>
        {/* Buttons */}
        <Button containerStyle = {styles.button} onPress = {signIn} title = 'Login'/>
        <Button onPress = {() => navigation.navigate('Register')} containerStyle = {styles.button}  type = 'outline' title = 'Register'/>
        <View style = {{height:1}}/>
            
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex :1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor: "white",
    },
    inputcontainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})