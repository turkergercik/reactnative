import { View, Alert,Linking,Text as T ,StyleSheet,Button,Dimensions,Image,Keyboard, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native'
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
import { Text } from 'react-native-paper';
import { storage } from '../Authcontext';

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
    /* let m = storage.getString("mpeop")
    let m1= JSON.parse(m) */
    let other
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
  id=x[0]._id
    if(x[0].sender.id===user.id && x[0].sender.delete===true){
        object["senderdeleted"]=false
        who="senderdeleted"
        state.mpeop[index].sender.delete=false
        send=true
        other=x[0].receiver.id
    }else if(x[0].receiver.id===user.id && x[0].receiver.delete===true){
        object["receiverdeleted"]=false
        who="receiverdeleted"
        state.mpeop[index].receiver.delete=false
        send=true
        other=x[0].sender.id
    }
    mpeop=[...state.mpeop]
    authContext.setmpeop(mpeop)
    let pp
    state.peop.find((item)=>{
      
      if(item._id===opponent){
           pp= item.profilepicture
        }
    })
    //await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop))
    storage.set("mpeop",JSON.stringify(mpeop))
    navigation.replace("Chatid",{id:x[0]._id,mpeop:mpeop[index],notid:notificationid,mess:false,newchat:false,pp:pp})

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

  }else if(res.data==="noconversation"){
    state.mpeop.splice(index,1)
    mpeop1=[...state.mpeop] 
    authContext.setmpeop(mpeop1)
    /* await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop1))
    await AsyncStorage.removeItem(id) */
    storage.set("mpeop",JSON.stringify(mpeop1))
    storage.delete(id)
    navigation.replace("Chat")


  }else{
    //console.log(res.data,4444444444)
    mpeop1=[...state.mpeop,res.data]
    authContext.setmpeop(mpeop1)
  //await AsyncStorage.setItem("mpeop",JSON.stringify(mpeop1))
  storage.set("mpeop",JSON.stringify(mpeop1))
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
    <SafeAreaView style={{flex:1,backgroundColor:"black"}}>
        <View style={{backgroundColor:"#141414",paddingTop:StatusBar.currentHeight,paddingHorizontal:10,justifyContent:"space-between"}}>
            <T style={{fontSize:40,fontWeight:200,color:"white",marginVertical:15}}>Kişiler</T>
            <TextInput style={{height:50,backgroundColor:"white",borderRadius:10,marginBottom:10}}>

            </TextInput>
        </View>
        <ScrollView overScrollMode="always" style={{paddingHorizontal:0}} >
        {
          state.peop.map((c,i)=>{

            if(c._id!==user.id){
                return( 
            <View key={i} style={{height:75,backgroundColor:"red",paddingLeft:0,borderRadius:15,marginTop:5}} >
              <View style={{flex:1,backgroundColor:"white",marginHorizontal:0}}>
                  <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={()=>createconv(c._id,c.name,c.notid)}
                    style={{flex:1,flexDirection:"row",alignItems:"center",backgroundColor:"black",paddingHorizontal:10}}>
                    {c.profilepicture ?<TouchableOpacity onPress={()=>{
                      navigation.navigate("Photo",{img1:c.profilepicture})
                    }}><Image source={{uri:c.profilepicture}} style={{width:60,height:60,borderRadius:30}} ></Image></TouchableOpacity> :<User style={{color:"#6538c6"}} width={60} height={60}></User>}
                    <T style={{fontSize:17,fontWeight:300,color:"white",paddingLeft:5}}>{c.name}</T>
                  </TouchableOpacity>
              </View>
            </View>
            )
            }
        
          })
        }
        </ScrollView>

    </SafeAreaView>
          
  )



}


const style= StyleSheet.create({    
    })