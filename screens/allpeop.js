import { View, Alert,Linking,Text,StyleSheet,Button,Dimensions,Image,Keyboard, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import { useAuthorization } from '../Authcontext';
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop,signOut  } from "../redux/counter";
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidColor, AndroidImportance,AndroidStyle, AndroidVisibility,EventType } from '@notifee/react-native';
import RNCallKeep from 'react-native-callkeep';
import User from "../images/user.svg"
import { Socket } from 'socket.io-client';
import ShortUniqueId from 'short-unique-id';
let darktext="#F0EFE9"
let bgfordarkmode="dark:bg-[#1a1a1a]"
let whitefordark="dark:text-[#F0EFE9]"
let svgcolor="text-[#097EFE]"
let bg="#097EFE"
let specialwhitebg="bg-[#F0EFE9]"
let specialwhitetext="text-[#F0EFE9]"
let bordercolor="border-[#097EFE]"
let textcolorblue="text-[#097EFE]"
let svgsearch="text-[#60ACFF]"
let bginput="bg-[#F0EFE9]"
let divisionlinedark="dark:divide-[#F0EFE9]"
let darkborderinput="dark:border-[#F0EFE9]"
let focusvgsearch="focus:border-[#097EFE]"
let divisioncolor="divide-[#90C5FF]"
let divisioncolorforfirstline="border-[#90C5FF]"
let maincolor="bg-white"
let x=""

let token1
export default function Allpeople({route,navigation}) {
  const d = new ShortUniqueId({ length: 10 })
    const{mpeop,setmpeop,auth,setauth,peop,setpeop,messages,setmessages,userid,server,t,authContext,state,socket}=useAuthorization()
    let headers={ Authorization:state.userToken}
let user={id:state.userId}
  let prt=server
  async function createconv(opponent,opponentname,notificationid){
    let index=null
    let mpeop
    let send=false
let id
let object={
    sendername:state.userName,
    receivername:opponentname,
    senderid:user.id,
    receiverid:opponent,
    receivernotificationid:notificationid
  
  }
let who
let x= state.mpeop.filter((c,i)=>{
    if(c.members?.includes(opponent)){
        index=i
        return c
    }

})
if(x.length===0){
let time=new Date(Date.now()).toJSON()
let oid=d()
  let conversation={__v: 0,
     _id: oid, 
     createdAt:time ,
     members: [user.id, opponent], 
     receiver: {delete: false, id:opponent , name: opponentname},
     seen: [],
     sender: {delete: false,id:user.id , name: state.userName},
     updatedAt: time
    
    }
  console.log("yok")
  id=1
  mpeop=[...state.mpeop,conversation]
  
  //authContext.setmpeop(mpeop)
  try {
     //await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop))
     navigation.replace("Chatid",{id:oid,mpeop:conversation,notid:notificationid,mess:true,newchat:true})
    //socket.current.emit("newconversationonline",opponent,JSON.stringify(conversation))
    //object["objectid"]=oid
        //send=true
  } catch (e) {
    // saving error
  }

  
  //send=true
}else{
  console.log("var")
  id=x[0]._id
    if(x[0].sender.id===user.id && x[0].sender.delete===true){
        object["senderdeleted"]=false
        who="senderdeleted"
        state.mpeop[index].sender.delete=false
        send=true
    }else if(x[0].receiver.id===user.id && x[0].receiver.delete===true){
        object["receiverdeleted"]=false
        who="receiverdeleted"
        state.mpeop[index].receiver.delete=false
        send=true
    }
    mpeop=[...state.mpeop]
    authContext.setmpeop(mpeop)
    await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop))
    navigation.replace("Chatid",{id:x[0]._id,mpeop:mpeop[index],notid:notificationid,mess:false,newchat:false})

}

if(send===true){
console.log(send)


    await axios.put(`${prt}/conversations/${id}`,object).then(async(res)=>{
      console.log(res.data)
        let mpeop1
 
  

      if(res.data==="updated"){
    if(index!==null){
        if(who==="senderdeleted"){
         

        }else{
            
        }
        //mpeop1=[...state.mpeop]
      
    }
  }else if(res.data==="deleted"){

  }else{
    //console.log(res.data,4444444444)
    mpeop1=[...state.mpeop,res.data]
    authContext.setmpeop(mpeop1)
  await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop1))
  }
 //console.log(mpeop1)
  

  //ne =[{_id:res.data._id,members:[na.id,person._id,na.name,person.name,true,true]}]
  //ne[0]._id=res.data._id
  //message(pre=>[...pre,res.data])
 //chec(person.name)
 }).catch((err)=>{console.log(err)})
}
  }

  
   
   const [email, setemail] = useState(null)
   const [emailc, setemailc] = useState(null)
   const [password, setpassword] = useState(null)
   const [passwordc, setpasswordc] = useState(null)
   const [token, settoken] = useState(null)
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"red"}}>
        <View style={{height:200,backgroundColor:"blue",paddingTop:StatusBar.currentHeight,paddingHorizontal:10}}>
            <Text style={{fontSize:50,color:"white"}}>Kişiler</Text>
<TextInput style={{height:50,backgroundColor:"black",borderRadius:10}}>

</TextInput>
        </View>
<ScrollView style={{paddingHorizontal:10}} >
{
  state.peop.map((c,i)=>{

    if(c._id!==user.id){
        return <View key={i} style={{height:75,backgroundColor:"yellow",paddingLeft:5,borderRadius:15,marginTop:5}} >
        <TouchableOpacity 
        onPress={()=>createconv(c._id,c.name,c.notid)}
        style={{flex:1,flexDirection:"row",alignItems:"center"}}>
         {c.profilepicture ? <Image source={{uri:c.profilepicture}} ></Image>:<User style={{color:"blue"}} width={60} height={60}></User>}
       <Text style={{fontSize:20,color:"red"}}>{c.name}</Text>
       </TouchableOpacity>
     </View>
    }
 
  })
}
</ScrollView>

    </SafeAreaView>
          
  )



}


const style= StyleSheet.create({    
    })