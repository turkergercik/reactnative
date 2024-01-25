import { View, Text,Image,StyleSheet,Dimensions, TouchableOpacity,Modal,useWindowDimensions, Alert,PermissionsAndroid, TouchableNativeFeedback, Easing } from 'react-native'
import React,{useState,memo,useEffect} from 'react'
//import ImageView from "react-native-image-viewing";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuthorization } from '../Authcontext';
import Animated,{LinearTransitionrr,SlideInLeft, SlideInUp,SlideInDown,SlideOutDown} from 'react-native-reanimated';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { permissions } from 'react-native-webrtc';
import { Buffer } from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';
import LinearGradient from 'react-native-linear-gradient';
import FileViewer from "react-native-file-viewer";
import Gallery, { GalleryRef } from 'react-native-awesome-gallery';
import { Portal,Dialog ,Button,Avatar} from 'react-native-paper';
const Mess = ({messages,allmess,fontscale,setimg,userId,k,style1,st,inp,id,typing,offset,toph,header}) => {
  //const {typing,setsomemessages} =useAuthorization()
  
  const [h, seth] = useState(50);
 /*  const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout;
    if(height>=50){
      seth(50)
    }else{
      seth(height)

    }
    
  } */
  const [typings,settypings]=useState(false)
const nav =useNavigation()
let before = allmess[k+1]
let after = allmess[k-1]
  const [visible, setIsVisible] = useState(false);
  let mode={after:null,before:null}
  let na={
    id:userId
  }
/*   const images = [
    {
      uri: messages.media,
     
    }
  ]; */
 
  /* useEffect(()=>{

console.log(typing,78)
    let f =typing?.find((item)=>{
     return item===id
    }
         
      
     )
     if(f){
       settypings(true)
     }else{
       settypings(false)
     }
   },[typing]) */
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
        mode.before = true
       mode.after=true
      }
    }else{
      mode.after=true
    }
   }


}

function save(media){
      let Base64Code = media.split("data:image/jpeg;base64,"); //base64Image is my image base64 string

      const dirs = RNFetchBlob.fs.dirs;
      
      let path = dirs.CacheDir + "/image.jpeg";
      //RNFetchBlob.fs.writeFile(path, RNFetchBlob.base64.encode(Base64Code), 'base64').then((res) => {console.log("File : ", res)})
      RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64')
      .then((res) => {console.log("File : ", res)});
      console.log(path)
      CameraRoll.save(`file://${path}`,{type:"photo"}).then(()=>{
      setIsVisible(false)
      })
   


}



let time = new Date(messages.createdAt).toLocaleTimeString("tr-TR",{hour:"numeric",minute:"numeric"})
if(messages.type){
  let now = new Date(Date.now())
  let t
  if(new Date(messages.date).getFullYear()===now.getFullYear()){
    switch(now.getDate()-new Date(messages.date).getDate()){
      case 0:
       t="Bugün"
      break
      case 1:
        t="Dün"
      break
      default:
        t= new Date(messages.date).toLocaleDateString("tr-TR",{day:"numeric",month:"long",weekday:"long"})
    }
  
  }else{
    t=new Date(messages.date).toLocaleDateString("tr-TR",{day:"2-digit",month:"long",year:"numeric"})

  }

return(
  <Animated.View >
  <View style={{}}>

    <Text style={{color:"grey",fontWeight:"300",textAlign:"center",fontSize:12}} >{t}</Text>
   
  </View>
  </Animated.View>
)
}
if(header===true){
  return(
    <View on  style={messages.media ? {padding:5,borderRadius:h/2,borderBottomRightRadius:mode.after? h/2:5,borderTopRightRadius: mode.before?h/2:5 ,backgroundColor:"#292929",justifyContent:"center"}:[{minHeight:50,flexDirection:"row",alignItems:"center",paddingHorizontal:10,paddingVertical:5,maxWidth:"80%",borderRadius:h/2,borderBottomRightRadius:mode.after? h/2:5,borderTopRightRadius: mode.before?h/2:5,backgroundColor:toph>450?"blue":"red",justifyContent:"center",overflow:"hidden"}]}>
    {messages.media? <TouchableOpacity
    onPress={()=>{
      inp.current.blur()
      //setIsVisible([messages.media])
      nav.navigate("Photo",{img1:messages.media})
      //img.current=messages.media
      //setimg(messages.media)
      //setIsVisible(true)
    }}
    onLongPress={()=>{
       setIsVisible(messages.media)
        
    }}
    >
      <Image  style={{height:200,width:200,resizeMode:"cover",borderRadius:h/2.4,borderBottomRightRadius:mode.after? h/2.4:5,borderTopRightRadius: mode.before?h/2.4:5,}} source={{uri:messages.media}} />
      
      </TouchableOpacity>:<Text style={{fontSize:23/fontscale,fontWeight:"300",color:"white",paddingLeft:3,flexShrink:1}}>{messages.text}</Text>
      }
    <Text style={{alignSelf:"flex-end",fontSize:11,fontWeight:"300",color:"rgba(255,255,255,0.5)",paddingHorizontal:mode.after ? 3:0,paddingLeft:5,paddingRight:messages.media?10:0}}>{time}</Text>
    </View>
                 
  )
}

  return (
    <Animated.View /* onLayout={({ nativeEvent: { layout } }) => {
      offset.current[k]=layout
      console.log(offset.current,45454545)
  }} */ entering={ k===0  ?SlideInDown:null}>
<Portal>
           <Dialog style={{backgroundColor:"#5B3E98",borderRadius:20}} onDismiss={()=>setIsVisible(false)} visible={visible}>
            <Dialog.Content>
              <Text style={{color:"white",fontSize:23,fontWeight:"300"}} variant="bodyMedium">Resmi Kaydet</Text>
           
           
            </Dialog.Content>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end",paddingBottom:10}}>
              <View style={{borderRadius:15,backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
              <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple("grey",true)}  onPress={()=>{setIsVisible(false)}}>
              <View style={{backgroundColor:"#222222",paddingHorizontal:10,paddingVertical:5,justifyContent:"center",alignItems:"center",borderRadius:15}}>
              <Text style={{fontSize:18,fontWeight:"300",color:"white"}}>İptal</Text>
              </View>
              </TouchableNativeFeedback>
              </View>

              <View style={{borderRadius:15,backgroundColor:"transparent",justifyContent:"center",alignItems:"center",marginHorizontal:10}}>
              <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple("grey",true)}  onPress={()=>{save(visible)}}>
              <View style={{backgroundColor:"#222222",paddingHorizontal:10,paddingVertical:5,justifyContent:"center",alignItems:"center",borderRadius:15}}>
              <Text style={{fontSize:18,fontWeight:"300",color:"white"}}>Kaydet</Text>
              </View>              
              </TouchableNativeFeedback>
              </View>
              
           

            </View>
            
          </Dialog>
         </Portal>
    <View style={style(who).container}>
    {messages.sender===na.id? <View  style={messages.media ? {padding:5,borderRadius:h/2,borderBottomRightRadius:mode.after? h/2:5,borderTopRightRadius: mode.before?h/2:5 ,backgroundColor:"#292929",justifyContent:"center"}:[{minHeight:50,flexDirection:"row",alignItems:"center",paddingHorizontal:10,paddingVertical:5,maxWidth:"80%",borderRadius:h/2,borderBottomRightRadius:mode.after? h/2:5,borderTopRightRadius: mode.before?h/2:5,backgroundColor:"#292929",justifyContent:"center",overflow:"hidden"}]}>
      {messages.media? <TouchableOpacity
      onPress={()=>{
        inp.current.blur()
        //setIsVisible([messages.media])
        nav.navigate("Photo",{img1:messages.media})
        //img.current=messages.media
        //setimg(messages.media)
        //setIsVisible(true)
      }}
      onLongPress={()=>{
         setIsVisible(messages.media)
          
      }}
      >
        <Image  style={{height:200,width:200,resizeMode:"cover",borderRadius:h/2.4,borderBottomRightRadius:mode.after? h/2.4:5,borderTopRightRadius: mode.before?h/2.4:5,}} source={{uri:messages.media}} />
        
        </TouchableOpacity>:<Text style={{fontSize:23/fontscale,fontWeight:"300",color:"white",paddingLeft:3,flexShrink:1}}>{messages.text}</Text>
        }
      <Text style={{alignSelf:"flex-end",fontSize:11,fontWeight:"300",color:"rgba(255,255,255,0.5)",paddingHorizontal:mode.after ? 3:0,paddingLeft:5,paddingRight:messages.media?10:0}}>{time}</Text>
      </View>:

      <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#21D4FD','#B721FF']} style={messages.media ? {minHeight:200,padding:5,borderRadius:h/2,borderBottomLeftRadius:mode.after? h/2:5,borderTopLeftRadius: mode.before?h/2:5,backgroundColor:"red",justifyContent:"center"}:{flexDirection:"row",flexShrink:1,paddingVertical:5,maxWidth:"80%",paddingHorizontal:10,borderRadius:h/2,borderBottomLeftRadius:mode.after? h/2:5,borderTopLeftRadius: mode.before? h/2:5,justifyContent:"center",minHeight:50}}>
      {messages.media? <TouchableOpacity
      onPress={()=>{
        inp.current.blur()
        nav.navigate("Photo",{img1:messages.media})
        //setimg(messages.media)
        //setIsVisible(true)
      }}
      onLongPress={()=>{
        setIsVisible(messages.media)
      }}
      ><Image  style={{height:200,width:200,resizeMode:"cover",borderRadius:h/2.4,borderBottomLeftRadius:mode.after? h/2.4:5,borderTopLeftRadius: mode.before?h/2.4:5}} source={{uri:messages.media}} /></TouchableOpacity>:<Text style={{fontSize:23/fontscale,fontWeight:"300",color:"white",paddingRight:5,paddingLeft:3,flexShrink:1}}>{messages.text}</Text>}
      <Text style={{alignSelf:"flex-end",fontSize:11,fontWeight:"300",color:"rgba(255,255,255,0.6)",paddingRight:messages.media?10:1}}>{time}</Text>
      </LinearGradient>

      }            
    </View>
    </Animated.View>
    
  )
}
//transform: [{rotate:"180deg"}],
export default memo(Mess)
const style=(who)=>StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:who?"flex-end":"flex-start",   
    margin:2,
    alignItems:"center",
    marginRight:5,
    flex:1,
  }
})