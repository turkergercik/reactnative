import { SafeAreaView, StyleSheet,Image,TouchableHighlight, View,StatusBar,FlatList,TextInput as Ti, Dimensions, VirtualizedList,Alert,Linking,Text as T, TouchableNativeFeedback } from 'react-native'
import React,{useEffect,useState,useMemo,useContext,useRef,useLayoutEffect} from 'react'
import { TouchableOpacity } from 'react-native'
import Conv from '../components/conv.js'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuthorization } from '../Authcontext.js'
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop  } from "../redux/counter.js"
import Animated, { Extrapolation, FadeIn, FadeOut, Layout, SlideInRight, SlideOutRight, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import {Swipeable} from 'react-native-gesture-handler'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import Orientation, { ALL_ORIENTATIONS_BUT_UPSIDE_DOWN } from 'react-native-orientation-locker';
import ShortUniqueId from 'short-unique-id'
import { FAB,Drawer,Button,Text,TextInput } from 'react-native-paper';
import { BlurView } from "@react-native-community/blur";
import Micoff from "../images/micoff.svg"
import Micon from "../images/micon.svg"
import Camon from "../images/camon.svg"
import Camoff from "../images/camoff.svg"
import Decline from "../images/decline.svg"
import Switchcam from "../images/switchcam.svg"
import User from "../images/user.svg"
import {  Dialog, Portal ,Surface} from 'react-native-paper';
import { storage } from '../Authcontext.js'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
const {width,height} =Dimensions.get("window")
const Chat = ({navigation}) => {
  let theme={
    primary:"#6538c6"
  }
  const d = new ShortUniqueId({ length: 10 })
  let t = d()
  
  function change(){
    navigation.navigate("Allpeople")
  /*   Orientation.getOrientation((e)=>{
      if(e==="PORTRAIT"){

        Orientation.lockToLandscape()
      }else{
        Orientation.lockToPortrait()
      }
    })
     */
    
  }
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const lasto = useRef(null)
  const [visible,setIsVisible]=useState(false)
  const [pause, setpause] = useState(false);
  const [pauselocal, setpauselocal] = useState(false);
  const [mute, setmute] = useState(false);
  const [mutelocal, setmutelocal] = useState(false);
  const [mypp, setmypp] = useState(null);
  //const isopen = useSharedValue(null)
  const images = [
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];
  let token
  const{messages,setmessages,userId,server,userToken,authContext,state,menuopens,socket,setss}=useAuthorization()
  //const { userToken,userId,server,mpeop,peop } = useSelector((state) => state.counter);
  //const dispatch = useDispatch();
  const [isopen,setisopen]=useState(null)
  //const [ss,setss]=useState(false)
  const [openallpeople,setopenallpeople]=useState(false)
  let prt= server

  let headers={ Authorization:state.userToken}
  let na={
    id:state.userId
  }
  async function choose(){
    menuopens.current=true
    
    await launchImageLibrary({
    mediaType:"photo",
    maxHeight:1280,
    maxWidth:720,
    quality:1,
    assetRepresentationMode:"current",
  }).then(async(e)=>{
    menuopens.current=true
    ImagePicker.openCropper({
      path:e.assets[0].uri,
      width: 700,
      height: 700,
      cropperCircleOverlay:true,
      includeBase64:true
    }).then(async(image) => {
      let x=image.data
      setmypp(`data:image/jpeg;base64,${x}`)
      storage.set("mypp",JSON.stringify(`data:image/jpeg;base64,${x}`))
      await axios.put(`${prt}/user`,{
        _id:state.userId,
        profilepicture:`data:image/jpeg;base64,${x}`
  
  
      },{headers:headers}).then(async(res)=>{})
    
    
    });
    
  
    
    //sendTextMessage(`data:image/jpeg;base64,${e.assets[0].base64}`)
  //sendTextMessage(e.assets[0].base64)
  
  }).catch(()=>{
  
  })
  
  }
  async function deletepp(){
    setIsVisible(false)
    setmypp(null)
    storage.delete("mypp")
    await axios.put(`${prt}/user`,{
      _id:state.userId,
      profilepicture:null


    },{headers:headers}).then(async(res)=>{})
  


  }
  const s = useRef(0)
  const o = useRef(null)
  const simul = useRef(null)
  async function get1(){
    const convers = await axios.get(`${prt}/all`,{headers:headers}).then(async(res)=>{
      if(res.data==="tokExp"){
        
  
       
        //localStorage.setItem("aut",JSON.stringify({"isA":false,"tok":"tokExp"}))
      }
      
     //await db.remove("pp")
     //dispatch(setpeop(res.data))
     
     storage.set("peop",JSON.stringify(res.data))
    authContext.setpeop(res.data)
    //await AsyncStorage.setItem("peop",JSON.stringify(res.data))
  }).catch((err)=>{
      console.log(err)
    })
  }
  async function a(){
    //storage.delete("mpeop")
    let pp =storage.getString("mypp")
    if(pp){
      setmypp(JSON.parse(pp))
    }
    //await AsyncStorage.removeItem("mpeop")
 //let m = await AsyncStorage.getItem("mpeop")
 let m = storage.getString("mpeop")
 if(m){
  authContext.setmpeop(JSON.parse(m))
 }else{
  const convers = await axios.get(`${prt}/conversations/${na.id}`,{headers:headers}).then(async(res)=>{
    if(res.data==="tokExp"){
     // navigation.navigate("Login")
   
      //localStorage.setItem("aut",JSON.stringify({"isA":false,"tok":"tokExp"}))
    }
   
    token=res.data
 console.log(res.data)
    //.sort((a,b)=>a.members[3].localeCompare(b.members[3]))
    //dispatch(setmpeop(res.data))
    authContext.setmpeop(res.data)
    //await AsyncStorage.setItem("mpeop",JSON.stringify(res.data))
    storage.set("mpeop",JSON.stringify(res.data))
    //await AsyncStorage.removeItem("mpeop")

   }).catch((err)=>{
    console.log(err)
   })
 }
  
  
   
     //setmpeop(convers)
      
    }



    let x
    useEffect(()=>{
 if(state.userId){
  setss(false)
 }
  




   },[state])
  useEffect(()=>{
 

  
    //StatusBar.setBackgroundColor("red")
   /*  setTimeout(() => {
      SystemNavigationBar.fullScreen(true)
      StatusBar.setHidden(true)
      setTimeout(() => {
        StatusBar.setTranslucent(true)
        StatusBar.setHidden(false)
      }, 100);
      StatusBar.setBackgroundColor("red")
      
    }, 500); */
   //auth1()
   get1()
   a()



   },[])
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const [active, setActive] = useState('');
  const [open, setopen] = useState(false);
  const tx =useSharedValue(width)
  const kstyle = useAnimatedStyle(() => {
    return {
     transform:[{translateX:tx.value}]
      //marginTop:keyboard.value? keyboard.value:0
    };
  });
 //#9B0031
  return (
    <>
    {open ? <View style={{position:"absolute",bottom:0,top:0,left:0,right:0,zIndex:1,flexDirection:"row",justifyContent:"flex-end"}}>
    <View blurType="chromeMaterial" blurAmount={1} reducedTransparencyFallbackColor="white"  style={{position:"absolute",bottom:0,top:0,right:0,left:0,backgroundColor:"black",opacity:0.8}} >
          <TouchableOpacity style={{flex:1}} onPress={()=>{
                  tx.value=withTiming(width,{},(e)=>{
          if(e){
            runOnJS(setopen)(false)
       
          }
                  })
                  
                  }}>

          </TouchableOpacity>
    </View>
    <Animated.View  style={[{borderWidth:2,borderColor:"black",width:"50%",height:"100%",backgroundColor:"#141414",padding:5,paddingHorizontal:10,alignItems:"center",justifyContent:"space-between"},kstyle]}>
       <View>
       <TouchableOpacity style={{width:100,height:100}} onPress={()=>setIsVisible(true)}>
       {mypp ?  <Image source={{uri:mypp}} 
        style={{width:100,height:100,borderRadius:50,marginTop:StatusBar.currentHeight}}></Image>:<User style={{color:"#6538c6",marginTop:StatusBar.currentHeight}} width={100} height={100} ></User> }
     

       </TouchableOpacity>
      
        <T style={{color:"white",textAlign:"center",fontSize:30,fontWeight:300,marginVertical:5,paddingTop:StatusBar.currentHeight,paddingBottom:15}}>Ayarlar</T>


       </View>
        <Button textColor='grey' style={{height:50,width:"100%",backgroundColor:"black"}} contentStyle={{width:"100%",height:"100%"}} rippleColor={"white"} onPress={async()=>{
        /* await AsyncStorage.removeItem("userToken")
        await AsyncStorage.clear() */
        storage.clearAll()
        socket.current.close()
        authContext.signOut()
        }}>
          Çıkış Yap
        </Button>
    </Animated.View>
  </View>:<View></View>}
  <View  style={[styles.body]}>
       

      <View style={
          {flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginHorizontal:10,marginTop:20}
              }>
              <T onPress={async()=>{
                    setisopen(Math.random())
              }} style={{fontSize:40,fontWeight:200,color:"white"}}>Sohbetler</T>
              {/* <Text>{state.mpeop?.length}</Text> */}
              <Button icon="tune-vertical" textColor='white'  rippleColor={"white"} contentStyle={{justifyContent:"flex-end",transform:[{rotate:"90deg"}]}} onPress={async()=>{
                  setopen(true)
                            
                  tx.value=withTiming(0)
              }} style={{backgroundColor:theme.primary,width:"5%"}}></Button>
      </View>
      <Ti mode="flat" underlineColor={"transparent"} placeholder='ara' placeholderTextColor={"grey"} textColor='white' selectionColor='grey' activeUnderlineColor='transparent' cursorColor='red' 
      contentStyle={{flex:1}}  style={{color:"white",backgroundColor:"#141414",width:"100%",fontWeight:"300",borderRadius:16,borderTopRightRadius:16,borderTopLeftRadius:16,paddingHorizontal:10,fontSize:20,marginVertical:5}}>
        
      </Ti>
      
      <View style={{flex:1}}> 
              <ScrollView

              scrollEnabled={true}
              ref={simul}
              overScrollMode="always"
                      style={{backgroundColor:"black"}}
                      contentContainerStyle={{rowGap:5,paddingVertical:1.25,marginBottom:-0.5}}
                      showsVerticalScrollIndicator={false}




              >
              {
                state.mpeop?.map((c,i)=>
              <Conv mpeop1={c} peop={state.peop} navigation={navigation} key={i} k={i} userId={state.userId} simul={simul} isopen={isopen} setisopen={setisopen} o={o} />


                )
              }



              </ScrollView>
              
      </View>

      <FAB
      icon="plus" mode="elevated" customSize={70} color='white' rippleColor={"white"} 
      onPress={()=>{
        change()
      }}
      style={{justifyContent:"center",alignItems:"center",position:"absolute",right:10,bottom:10,width:70,height:70,backgroundColor:"#6538c6",borderRadius:40}}>

      </FAB>
      <Portal>
           <Dialog style={{backgroundColor:"#5B3E98",borderRadius:20}} onDismiss={()=>setIsVisible(false)} visible={visible}>
            <Dialog.Content>
              <T style={{color:"white",fontSize:23,fontWeight:"300",textAlign:"center"}} variant="bodyMedium">Profil Fotoğrafı Ayarı</T>
           
           
            </Dialog.Content>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",paddingBottom:10}}>
              <View style={{borderRadius:15,backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
              <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple("grey",true)}  onPress={async()=>{
                //await AsyncStorage.setItem("bnp","true")
                deletepp()
               }}>
              <View style={{backgroundColor:"#222222",paddingHorizontal:10,paddingVertical:5,justifyContent:"center",alignItems:"center",borderRadius:15}}>
              <T style={{fontSize:18,fontWeight:"300",color:"white"}}>Fotoğarafı Kaldır</T>
              </View>
              </TouchableNativeFeedback>
              </View>

              <View style={{borderRadius:15,backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
              <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple("grey",true)}  onPress={async()=>{
                /* await AsyncStorage.setItem("bnp","false").then(()=>{
                  pause.disNotCh()
  
                }) */
              choose()
                

  
                
                setIsVisible(false)}}>
              <View style={{backgroundColor:"#222222",paddingHorizontal:10,paddingVertical:5,justifyContent:"center",alignItems:"center",borderRadius:15}}>
              <T style={{fontSize:18,fontWeight:"300",color:"white"}}>Yeni Fotoğraf</T>
              </View>              
              </TouchableNativeFeedback>
              </View>
              
           

            </View>
            
          </Dialog>
         </Portal>
      

  </View>
  </>
  )
}

export default Chat

const styles = StyleSheet.create({
    body:{
backgroundColor:"black",
flexDirection:"column",
flex:1,
paddingTop:StatusBar.currentHeight

    }, surface: {
      padding: 8,
      height: 80,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:100,
      shadowColor:"grey"
    },

})