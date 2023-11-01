import { View, Text,Image,StyleSheet, TouchableOpacity,Modal,useWindowDimensions, Alert } from 'react-native'
import React,{useState} from 'react'
//import ImageView from "react-native-image-viewing";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuthorization } from '../Authcontext';
import Animated,{SlideInRight,SlideInLeft,Layout, SlideInUp} from 'react-native-reanimated';
const Mess2 = ({messages,allmess,fontscale,setIsVisible,setimg,userId,k,style1,pd,rr,setstat}) => {
const nav =useNavigation()
let before = allmess[k+1]
let after = allmess[k-1]

/* const gesture= Gesture.Pinch().onStart(()=>{
  console.log("12")
}) */


  //const [visible, setIsVisible] = useState(false);
  let mode={after:null,before:null}
  let na={
    id:userId
  }
/*   const images = [
    {
      uri: messages.media,
     
    }
  ]; */
  
  if(messages?.sender==na.id){
    who=true

  }else{
    who=false
  }
if(before){
   if(before.sender===messages.sender){
    mode.before=false
    if(after){
      if(after.sender===messages.sender){
       mode.after=false
      }else{
       mode.after=true
      }
    }else{
      mode.after=true
      
    }


   }else{
    mode.before=true
    if(after){
      if(after.sender===messages.sender){
       mode.after=false
      }else{
        mode.before = false
       mode.after=false
      }
    }else{
      mode.before=false
      mode.after=false
    }
   }


}


let time = new Date(messages.createdAt).toLocaleTimeString("tr-TR",{hour:"numeric",minute:"numeric"})
if(messages.type){
  console.log(messages.date,78)
return(
  <Animated.View entering={SlideInUp.delay(50)} layout={Layout.delay(25)} >

  <View style={{height:20,transform:[{rotate:"180deg"}]}}>

    <Text style={{color:"red",textAlign:"center"}} >{messages.date}</Text>
  </View>
  </Animated.View>
)
}
  return (
    <Animated.View entering={SlideInUp.delay(50)} layout={Layout.delay(25)} >
    <View style={style(who).container} >
    {messages.sender==na.id? <View style={messages.media ? {padding:5,borderRadius:11,borderBottomRightRadius:mode.after? 11:0,borderTopRightRadius: mode.before?11:0 ,backgroundColor:"transparent",justifyContent:"center"}:[{flexDirection:"column",padding:5,maxWidth:"80%",paddingHorizontal:8,borderRadius:11,borderBottomRightRadius:mode.after? 11:0,borderTopRightRadius: mode.before?11:0,backgroundColor:"transparent",justifyContent:"center"}]}>
      {messages.media? <TouchableOpacity
      onPress={()=>{
        //rr.value=true
        nav.navigate("Photo",{img1:messages.media})
        //img.current=messages.media
        //setimg(messages.media)
        //setIsVisible(true)
      }}
      >
        <Image  style={{height:200,width:200,resizeMode:"cover",borderRadius:7}} source={{uri:messages.media}} />
        
        </TouchableOpacity>:<Text style={{fontSize:20}}>{messages.text}</Text>}
      <Text style={{alignSelf:"flex-end",fontSize:12}}>{time}</Text>
      </View>:
      <View style={messages.media ? {padding:5,borderRadius:11,borderBottomLeftRadius:mode.after? 11:0,borderTopLeftRadius: mode.before?11:0,backgroundColor:"red",justifyContent:"center"}:{flexDirection:"column",padding:5,maxWidth:"80%",paddingHorizontal:8,borderRadius:11,borderBottomLeftRadius:mode.after? 11:0,borderTopLeftRadius: mode.before?11:0,backgroundColor:"red",justifyContent:"center"}}>
      {messages.media? <TouchableOpacity
      onPress={()=>{
        //rr.value=true
        //setstat(false)
        
          nav.navigate("Photo",{img1:messages.media})
          
    
        //setimg(messages.media)
        //setIsVisible(true)
      }}
      ><Image  style={{height:200,width:200,resizeMode:"cover",borderRadius:7}} source={{uri:messages.media}} /></TouchableOpacity>:<Text style={{fontSize:20}}>{messages.text}</Text>}
      <Text style={{alignSelf:"flex-end",fontSize:12,color:"black"}}>{time}</Text>
      </View>}
        
        {/* <ImageView 
  images={images}
  imageIndex={0}
  
  visible={visible}
  swipeToCloseEnabled={true}
  onRequestClose={() => setIsVisible(false)}
/> */}
{/* <Modal visible={visible} transparent={false}>
                <ImageViewer imageUrls={images} enableSwipeDown={true} onSwipeDown={()=>{
                  setIsVisible(false)
                }}/>
            </Modal> */}
            
    </View></Animated.View>
    
  )
}

export default Mess2
const style=(who)=>StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:who?"flex-end":"flex-start",   
    margin:2,
    transform: [{rotate:"180deg"}],
    marginRight:5,
  }
})