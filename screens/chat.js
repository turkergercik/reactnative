import { SafeAreaView, StyleSheet,TouchableHighlight, Text, View,StatusBar,FlatList,TextInput, Dimensions, VirtualizedList,Alert,Linking } from 'react-native'
import React,{useEffect,useState,useMemo,useContext,useRef,useLayoutEffect} from 'react'
import { TouchableOpacity } from 'react-native'
import Conv from '../components/conv.js'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuthorization } from '../Authcontext.js'
import { useDispatch, useSelector } from "react-redux";
import { signIn, setmpeop, setpeop  } from "../redux/counter.js"
import Animated, { Extrapolation, FadeIn, FadeOut, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import {Swipeable} from 'react-native-gesture-handler'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import Orientation, { ALL_ORIENTATIONS_BUT_UPSIDE_DOWN } from 'react-native-orientation-locker';
import ShortUniqueId from 'short-unique-id'
const {width,height} =Dimensions.get("window")
const Chat = ({navigation}) => {
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
  const{messages,setmessages,userId,server,userToken,authContext,state}=useAuthorization()
  //const { userToken,userId,server,mpeop,peop } = useSelector((state) => state.counter);
  //const dispatch = useDispatch();
  const [isopen,setisopen]=useState(null)
  const [ss,setss]=useState(false)
  const [openallpeople,setopenallpeople]=useState(false)
  let prt= server

  let headers={ Authorization:state.userToken}
  let na={
    id:state.userId
  }

  const s = useRef(0)
  const o = useRef(null)
  const simul = useRef(null)
  async function get1(){
    const convers = await axios.get(`${prt}/all`,{headers:headers}).then(async(res)=>{
      if(res.data==="tokExp"){
        
  
       
        //localStorage.setItem("aut",JSON.stringify({"isA":false,"tok":"tokExp"}))
      }
      s.current=s.current+1
     //await db.remove("pp")
     //dispatch(setpeop(res.data))
    authContext.setpeop(res.data)
    await AsyncStorage.setItem("peop",JSON.stringify(res.data))
  }).catch((err)=>{
      console.log(err)
    })
  }
  async function a(){
    //await AsyncStorage.removeItem("mpeop")
 let m = await AsyncStorage.getItem("mpeop")
 if(m){
  authContext.setmpeop(JSON.parse(m))
 }else{
  const convers = await axios.get(`${prt}/conversations/${na.id}`,{headers:headers}).then(async(res)=>{
    if(res.data==="tokExp"){
     // navigation.navigate("Login")
   
      //localStorage.setItem("aut",JSON.stringify({"isA":false,"tok":"tokExp"}))
    }
   
    token=res.data

    //.sort((a,b)=>a.members[3].localeCompare(b.members[3]))
    //dispatch(setmpeop(res.data))
    authContext.setmpeop(res.data)
    await AsyncStorage.setItem("mpeop",JSON.stringify(res.data))
    //await AsyncStorage.removeItem("mpeop")

   }).catch((err)=>{
    console.log(err)
   })
 }
  
  
   
     //setmpeop(convers)
      
    }



    
  useLayoutEffect(()=>{
    Orientation.lockToPortrait()
    Orientation.addDeviceOrientationListener((e)=>{
     
      if(e==="PORTRAIT"){
        setss(true)
       
      Orientation.lockToPortrait()
      
      }else if(e==="LANDSCAPE-LEFT"){
        setss(true)
        Orientation.lockToLandscape()
      
      }

      opacity.value=withTiming(0,{duration:500},()=>{
        opacity.value=1
      })
      setTimeout(() => {
        
        setss(false)
      }, 450);
    })
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

return ()=>{
  Orientation.removeAllListeners()
}

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
  return (

    <View style={[styles.body]}>
{ss && <Animated.View style={{position:"absolute",top:0,bottom:0,right:0,left:0,zIndex:5,backgroundColor:"black",opacity:opacity}}>

</Animated.View>}
{/* <View style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"red",zIndex:1}} >
      <Photo img={images[0].uri}></Photo>
    
      </View> */}
    <View style={
        {flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginHorizontal:10}
    }>
<Text onPress={async()=>{
setisopen(Math.random())
}} style={{fontSize:40,marginTop:20,fontWeight:"500",backgroundColor:"blue"}}>Sohbetler</Text>
<Text onPress={async()=>{
  
  //Linking.openURL(`mychat://Chatid`)
 await AsyncStorage.removeItem("userToken")
 authContext.signOut()
}} style={{fontSize:40,marginTop:20,fontWeight:"500",backgroundColor:"blue"}}>çıkış</Text>
<Text>{state.mpeop?.length}</Text>
    </View>
      <TextInput cursorColor={"black"}  style={{height:50,color:"red",backgroundColor: "black",marginHorizontal:10,marginVertical:10,borderRadius:15}}>
        
      </TextInput>
      {/* <FlatList  style={{}}  scrollEnabled  data={data} renderItem={({item}) => <View style={{backgroundColor:"red",height:100,width:"100%"}} >
        <Text>{item.title}</Text>
      </View>}
        keyExtractor={item => item.id}/> */}
      
        {/* <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} style={{}}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Chatid")
          }}>
          <Text style={{backgroundColor:"gold",margin:10,marginTop:0,padding:50,textAlign:"center"}}>123</Text>

          </TouchableOpacity>

     
          
         

         
        </ScrollView> */}
        {/* <FlatList
        style={{backgroundColor:"blue",flexGrow:0}}
        showsVerticalScrollIndicator={false}
data={mpeop}
renderItem={({item})=> <Conv mpeop1={item} peop={peop} navigation={navigation}/>

}
keyExtractor={item => item._id}

>

</FlatList> */}
<View style={{flex:1}}> 
<ScrollView

scrollEnabled={true}
ref={simul}
overScrollMode="always"
        style={{backgroundColor:"blue"}}
        contentContainerStyle={{rowGap:5,paddingVertical:1.25,marginBottom:-0.5}}
        showsVerticalScrollIndicator={false}




>
{
  state.mpeop?.map((c,i)=>
<Conv mpeop1={c} peop={state.peop} navigation={navigation} key={i} k={i} userId={state.userId} simul={simul} isopen={isopen} setisopen={setisopen} o={o} />


  )
}



</ScrollView></View>

<TouchableOpacity
onPress={()=>change()}
style={{justifyContent:"center",alignItems:"center",position:"absolute",right:10,bottom:50,width:80,height:80,backgroundColor:"red",borderRadius:40}}>
<Text style={{position:"absolute",paddingBottom:10,fontSize:80,fontWeight:"100",color:"white"}}>
  +
</Text>
</TouchableOpacity>

{/* <View style={{backgroundColor:"white",justifyContent:"flex-end"}}> 
<TextInput style={{alignSelf:"flex-end",height:20,width:"100%",color:"blue",backgroundColor:"green"}}>

</TextInput></View> */}
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    body:{
backgroundColor:"red",
flexDirection:"column",
flex:1,
paddingTop:StatusBar.currentHeight,

    }

})