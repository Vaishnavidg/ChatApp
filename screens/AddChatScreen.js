import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Icon, Input } from 'react-native-elements'
import { db } from '../firebase'


const AddChatScreen = ({navigation}) => {
    const [input,setInput] =useState("")
    useLayoutEffect(() =>{
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle: "Chat"
        });
    },[navigation]);
    const createChat = async() =>{
        await db.collection('chats').add({
            chatName:input,
        }).then(() => {navigation.goBack()})
        .catch((error) => alert(error));
    }

    // const createChat = async() =>{
    //     await db.collection("chats").add({
    //         chatName: input,
    //     })
    //     .then(() =>{navigation.goBack();
    //     })
    //     .catch((error) => alert(error));

    // };

  return (
    <View style = {styles.container}>
        <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing = {createChat}
        leftIcon={
            <Icon name='wechat' type='antdesign' 
            size={24} color='black'/>
        }/>
        <Button disabled={!input} onPress={createChat} title = 'create a new Chat'/>
    </View>
   
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:20,
        height:"100%"
    }
})