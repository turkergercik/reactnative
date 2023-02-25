import { StatusBar } from 'expo-status-bar';
import { useState,useMemo } from 'react';
import { StyleSheet, Text,Easing, View,Image,SafeAreaView ,Button,Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './screens/login';
import Register from './screens/register';
import Chat from './screens/chat';
import  'react-native-gesture-handler';
import 'react-native-reanimated'
export default function App() {

  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const [auth, setauth] = useState()
  const [keyboard,setkeyboard] = useState()
  const aa=async()=>{
    setauth( await AsyncStorage.getItem("token"))

  }
  aa()
  const config = {
    animation: 'timing',
    config: {
      duration: 200,
      easing: Easing.linear,
    }
  }
  
  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 350,
      easing: Easing.linear,
    }
  }
  
  const Stack = createStackNavigator();
  //const Stack = createNativeStackNavigator();
  if(auth!==undefined){
  return (
    <NavigationContainer >
    <Stack.Navigator    initialRouteName="Login"    screenOptions={{headerTitleAlign:"center",headerShown:false,gestureEnabled:true,gestureDirection:"vertical",cardOverlayEnabled:false}}>
    {auth ? (
    <>
      <Stack.Screen name="Chat">
     {(a)=><Chat {...a} auth={auth} setauth={setauth} keyboard={keyboard}/>}
     </Stack.Screen>
     
   </>
  ) : (
    <>
   <Stack.Screen  name="Register" options={{headerTitleAlign:"center",  transitionSpec: {
            open: config,
            close: closeConfig,
          },animationEnabled:true,presentation:"transparentModal",cardStyle:{backgroundColor:"transparent"},cardStyleInterpolator:CardStyleInterpolators.forModalPresentationIOS,headerShown:false,gestureResponseDistance:SCREEN_HEIGHT/2,gestureEnabled:true,gestureDirection:"vertical",}}>
     {(a)=> <Register {...a} auth={auth} setauth={setauth} setkeyboard={setkeyboard}/>}
     </Stack.Screen>
    <Stack.Screen name="Login">

      {(a)=><Login {...a} auth={auth} setauth={setauth} keyboard={keyboard}/>}
    </Stack.Screen>
    </>
  )}
      
      
    </Stack.Navigator>
  </NavigationContainer>
  )}
}


