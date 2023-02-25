import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({id,chatName, enterChat}) => {
    const[chatMessage,setChatMessage] = useState([]);
    useEffect(() =>{
        const unsubscribe =db.collection('chats').doc(id).collection('message')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot) =>
        setChatMessage(snapshot.docs.map((doc)=>
        doc.data())));
        return unsubscribe;
    })


  return (
   <ListItem onPress={() => enterChat(id,chatName)} key={id} bottomDivider>
    <Avatar rounded
    source={{uri : chatMessage?.[0]?.photoURL|| "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"}}/>
    <ListItem.Content>
        <ListItem.Title style = {{fontWeight:"800"}}>
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}
        ellipsizeMode = "tail">
            {chatMessage?.[0]?.displayName}:
            {chatMessage?.[0]?.message}
        </ListItem.Subtitle>

    </ListItem.Content>

   </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})