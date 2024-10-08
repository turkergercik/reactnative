import { View, Text, StatusBar, Alert } from 'react-native'
import React, { useEffect, useRef, useState,useCallback } from 'react'
import { Button } from 'react-native-paper'
import { useAuthorization } from '../Authcontext'
import { Switch,Modal,Portal,FAB } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { io } from 'socket.io-client';
import Device from '../components/device';

const Smartthings = ({navigation}) => {
  const {server,state}=useAuthorization()
  const [devices,setdevices]=useState([])
  const devicelist=useRef([])
  const socket=useRef(null)
  const status = useRef(false)
  
  const containerStyle = {backgroundColor: 'white',};
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  
  useFocusEffect(
    useCallback(()=>{
      
      socket.current=io(server)

      
      socket.current.emit("smartdevices",state.userId)
      socket.current.on("smartdeviceslist",(item)=>{
          let alldevices = JSON.parse(item) 
          devicelist.current=alldevices
          setdevices(alldevices)
          
     
        })
        socket.current.on("update",(id,status)=>{
          
          console.log(id)
          const index = devicelist.current.findIndex(item => item.id === id);
          if (index !== -1) {
            //const updatedItems = [...devices];
            //console.log(index,78)
            devicelist.current[index].status=status
            //console.log(devicelist.current[index].status,status)
            setdevices([...devicelist.current]);
          }
          /* etdevices((prevItems) => {
            const index = prevItems.findIndex(item => item.id === id);
            if (index !== -1) {
              const updatedItems = [...prevItems];
              updatedItems[index].value = status;
              return updatedItems;
            }
            return prevItems;
          }); */
          //console.log(status)
          /* setdevices((e)=>{
              let index = e.findIndex((item)=>item.id===id)
              if(index!==-1){
                 e[index].status=status
                 return e
              }
          }) */
          
          
     
        })
      
      return ()=>{
        console.log("kkkk")
        socket.current.disconnect()
        socket.current=null
        setdevices([])
      }
     
  
    },[])
  );
 
  

  /* const onToggleSwitch = (ids) => {
    status.current=!status.current
    //setIsSwitchOn(!isSwitchOn)
    socket.current.emit("light",{userid:state.userId,id:ids,status:status.current})
  
  } */
  return (
    <View style={{flex:1,backgroundColor:"black",paddingTop:StatusBar.currentHeight}}>
      
      <View style={{width: "100%",flexDirection:"row",justifyContent:"space-between",padding:10,alignItems:"center"}}>
        <Text style={{fontSize:30,color:"white"}}>Smartthings</Text>
        <FAB style={{backgroundColor:"#6538c6",borderRadius:25,alignItems:"center",justifyContent:"center"}} customSize={50} color='white' icon={"plus"} rippleColor={"black"} onPress={()=>{
          navigation.navigate("Smartdevicesetup")
        }}>
            45
        </FAB>
        
        
      </View>  
      {
          devices.map((item,i)=>{
            console.log(item)
            
          return <View style={{flex:1}} key={i}>
            <Device item={item} socket={socket} ></Device>

          </View>
          
          
          
          {/* <View key={i} style={{backgroundColor:"black",height:100,flexDirection:"row",alignItems:"center",margin:5,borderRadius:10 ,justifyContent:"space-around"}}>
           <View style={{flex:1,alignItems:"center",justifyContent:"center",gap:2}}>
            <Text style={{flexDirection:"row",textAlign:"center",color:"white",fontSize:23}}>ESP-32</Text>
            
            <Button buttonColor='red' onPress={showModal} textColor='white' style={{margin:0}} >info</Button>
            
           </View>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <Switch value={item.status} color='green' style={{}} onValueChange={(val)=>{onToggleSwitch(item.id)}} />
            <Text>{item.status ===true ? "ON":"OFF"}</Text>

              </View>
            </View>
            </View> */}

          })
        }
    </View>
  )
}

export default Smartthings