import { View,Keyboard, Text,TextInput,TouchableOpacity,StyleSheet,Button,SafeAreaView,ScrollView,StatusBar,KeyboardAvoidingView,Dimensions } from 'react-native'
import React,{useEffect,useState,useCallback, useRef,useImperativeHandle } from 'react'
import axios from 'axios'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
  withTiming,runOnJS
} from 'react-native-reanimated';
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

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
export default function Register({route,navigation}) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
    let prt="http://192.168.1.104:3001"
   const login=async(e)=>{
    
    await axios.post(`${prt}/register`,{
        name:name,
        email:email,
        password:password,
        notid:x
    }).then((response) => {
        if(response.data.data!=="0"){ navigation.navigate("Login") }
    
   
  
    
        
      }).catch((q)=>{
        console.log(q)
      })
  
  setemail(null)
  setemailc(null)
  setpasswordc(null)
  setpassword(null)

   }
 
  

    const validate = (text) => {
        
        setemail(text)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setemailc(false)
         
          return false;
        }
        else {
            setemailc(true)
          //setemail()
        }
      }
      const validateP = (text) => {
        
        setpassword(text)
        if (text?.length>=5) {
            setpasswordc(true)
         
          
        }
        else {
            setpasswordc(false)
          //setemail()
        }
      }
   const [email, setemail] = useState(null)
   const [name, setname] = useState(undefined)
   const [emailc, setemailc] = useState(null)
   const [password, setpassword] = useState(null)
   const [passwordc, setpasswordc] = useState(null)
   

   /* function otherWorklet() {
    'worklet';
      runOnJS( navigation.navigate("Login"))

  } */

  const onPressFn = () => {
    // function from other thread (different of reanimated thread)
    navigation.goBack()
  };
   

       const scrollTo = useCallback((destination) => {
        'worklet';
     
  
        translateY.value = withSpring(destination, { damping: 50 });
      }, []);
   
   

       const gesture = Gesture.Pan()
         .onStart(() => {
          
           context.value = { y: translateY.value };
         })
         .onUpdate((event) => {
        
           translateY.value = event.translationY + context.value.y;
           translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
         })
         .onEnd((event) => {
         console.log(event.velocityY,"123")
           if (translateY.value >= SCREEN_HEIGHT / 1.5||event.velocityY>2500) {
            console.log(translateY.value)
          console.log(-SCREEN_HEIGHT / 3)
            console.log("1")
            scrollTo(SCREEN_HEIGHT)
            runOnJS(onPressFn)();
           }else if(translateY.value >= SCREEN_HEIGHT / 3) {
            console.log(translateY.value)
          console.log(-SCREEN_HEIGHT / 3)
            console.log("1")
            scrollTo(SCREEN_HEIGHT / 4)
          
           }  else if (translateY.value < SCREEN_HEIGHT / 1.5) {
            scrollTo(StatusBar.currentHeight*2)
           }
         });
   
       const rBottomSheetStyle = useAnimatedStyle(() => {
         /* const borderRadius = interpolate(
           translateY.value,
           [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
           [25, 5],
           Extrapolate.CLAMP
         ); */
   
         return {
           
           transform: [{ translateY: translateY.value }],
         };
       });

useEffect(()=>{
translateY.value=withTiming(SCREEN_HEIGHT/4)
const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //translateY.value=withTiming(SCREEN_HEIGHT/100)
 // setkeyboard(true);
});
const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  translateY.value=withTiming(SCREEN_HEIGHT/4)
  //setkeyboard(false);
});

return () => {
  showSubscription.remove();
  hideSubscription.remove();
};
},[])

  return (
<KeyboardAvoidingView behavior="padding"  style={style.body}>
      <View style={style.bodysmall}>

    
      <Text  style={{alignSelf:"flex-start",marginLeft:5,marginBottom:5,color:darktext}}>Name</Text>
        <TextInput onFocus={()=>setname("")} inputMode="text" autoCapitalize='none' keyboardType="default" onBlur={()=>
        {
            //setemailc(null)
    }}  textContentType='emailAddress' style={{
        width:"100%",
        height:40,
        marginHorizontal:20,
        paddingHorizontal:10,
        backgroundColor:darktext,
        borderWidth:3,
        borderColor:name===undefined ? "black":name==="" ?"red":"green",
        borderRadius:15,
        marginBottom:4,

    
    }} value={name} onChangeText={(e)=>setname(e)}/>
        <Text  style={{alignSelf:"flex-start",marginLeft:5,marginBottom:5,color:darktext}}>Email</Text>
        <TextInput autoCapitalize="none" keyboardType="default" onBlur={()=>
        {
            //setemailc(null)
    }}  style={{
        width:"100%",
        height:40,
        marginHorizontal:20,
        paddingHorizontal:10,
        backgroundColor:darktext,
        borderWidth:3,
        borderColor:emailc===true ? "green":emailc===false ?"red":null,
        borderRadius:15,
        marginBottom:4,

    
    }} value={email} onFocus={()=>validate(email)} onChangeText={(e)=>{validate(e)}}/>
        <Text style={{alignSelf:"flex-start",marginLeft:5,marginBottom:5,color:darktext}}>Password</Text>
        <TextInput textContentType='password' autoCapitalize='none' style={{
        width:"100%",
        height:40,
        marginHorizontal:20,
        paddingHorizontal:10,
        backgroundColor:darktext,
        borderWidth:3,
        borderColor:passwordc===true ? "green":passwordc===false ?"red":null,
        borderRadius:15,
        marginBottom:4,

    
    }} value={password} onFocus={()=>validateP(password)} onChangeText={(e)=>{validateP(e)}} secureTextEntry/>

        
<Text style={{color:darktext}} onPress={()=>navigation.goBack()
}>Zaten Üyeyim</Text>
      <TouchableOpacity onPress={()=>login()} disabled={emailc&&passwordc&&name!=="" ? false:true} style={{height:40,backgroundColor:"blue",borderRadius:15,paddingHorizontal:15,justifyContent:"center",marginBottom:10,marginTop:10,paddingBottom:1,alignSelf:"stretch", }}>
       <Text style={{color:darktext,textAlign:"center"}} >Kayıt Ol</Text>
      </TouchableOpacity>
{/* <Button title='sdds'onPress={()=>{navigation.navigate("Home")}} >

</Button> */}


    </View>
    </KeyboardAvoidingView>

  )



}


const style= StyleSheet.create({
    body:{
      flex:1,
      borderTopRightRadius:15,
      borderTopLeftRadius:15,
      backgroundColor:"#C3E4ED",
      alignItems: 'center', 
      justifyContent: "center",

    },bodysmall:{
       
        width:"80%",
       
       alignItems:"center",
       justifyContent:"flex-end",
        backgroundColor:bg,
        paddingHorizontal:10,
        borderRadius:20,
        paddingTop:4
    },
    
    })