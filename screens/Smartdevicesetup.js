import React, { useState, useEffect, useRef } from 'react';
import {  TextInput as Ti, Text, View, Alert,PermissionsAndroid, StatusBar,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { useAuthorization } from '../Authcontext';
import { Menu ,Button,TextInput,Portal,Modal,ActivityIndicator,Surface,TouchableRipple} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { color, FadeIn,Easing,FadeOut } from 'react-native-reanimated';
const SERVICE_UUID = '12345678-1234-5678-1234-56789abcdef1';
const SSID_CHAR_UUID = '12345678-1234-5678-1234-56789abcdef2';
const PASS_CHAR_UUID = '12345678-1234-5678-1234-56789abcdef3';
const USER_ID_CHAR_UUID = '12345678-1234-5678-1234-56789abcdef4';
const WIFI_SCAN_CHARACTERISTIC_UUID = '12345678-1234-5678-1234-56789abcdef5';
const WIFI_STATUS_CHARACTERISTIC_UUID = '12345678-1234-5678-1234-56789abcdef6';
const WIFI_PROCESS_UUID = '12345678-1234-5678-1234-56789abcdef7';

//let  manager = new BleManager()
const Smartdevicesetup = ({navigation}) => {
  //const [device, setDevice] = useState(null);
  let manager = null
  let statussub = null
  let processsub = null
  const device1 = useRef(null)
  const animateref = useRef(null)
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [savedwifi, setsavedwifi] = useState(false);
  const [quitfromwifi, setquitfromwifi] = useState(false);
  const [authorized, setauthorized] = useState(null);
  const [authenticated, setauthenticated] = useState(null);
  const [ready, setready] = useState(false);
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [wifiList, setwifilist] = useState([]);
  const [espuid, setespuid] = useState('');
  const {state} = useAuthorization()
  const [visible, setVisible] = useState(false);
  const [selected, setselected] = useState(null);
  const [connectedtowifi, setconnectedtowifi] = useState(null);
  const inputRef = useRef(null);
  const [scanning, setscanning] = useState(false);
  const [success, setsuccess] = useState(null);
  const [loading, setloading] = useState(false);
  const openMenu = () => setVisible(true);
  //const bot = new BleManager()
  const closeMenu = () => setVisible(false);
  const requestBLEPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // Needed for scanning in Android
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,       // For Android 12+
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,    // For Android 12+
      ]);
  
      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true
        Alert.alert('Permissions granted', 'BLE permissions granted.');
        // Proceed with BLE operations (e.g., scanning for devices)
      } else {
        return false
        Alert.alert('Permissions denied', 'You need to grant all BLE permissions to proceed.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

 

  useEffect(() => {
    manager = new BleManager()
    requestBLEPermissionAndroid().then((e)=>{
 
      if(e === true){
        scanAndConnect();

      }
    }).catch((e)=>{
      console.log(e)
    })
    return () => {
      if(device1.current!==null){
        //console.log("yes")
        manager.cancelDeviceConnection(device1.current.id)
        device1.current=null
        
        
      }
      
      manager.destroy()
      manager=null
      //manager.stopDeviceScan()
     
    }
  }, []);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }

      if (device.name === 'ESP32-BLE-Setup') {
        console.log("Device found: ", device.name);
        manager.stopDeviceScan();
        device1.current= device
       connectToDevice(device)
      }
    });
  };

  const connectToDevice = async (device) => {
    try {
      const connectedDevice1 = await device.connect()
      setConnectedDevice(connectedDevice1)
      await connectedDevice1.discoverAllServicesAndCharacteristics();
      device1.current.monitorCharacteristicForService(SERVICE_UUID, WIFI_STATUS_CHARACTERISTIC_UUID, (error, characteristic) => {
            
        if (error) {
          //console.error("Error while receiving connection status:", error);
          return;
        }
        const wifiStatus = Buffer.from(characteristic.value, 'base64').toString();
        console.log("Wi-Fi connection status:", wifiStatus);
        if(wifiStatus !==""){
          if (wifiStatus === "Failed") {
            setconnectedtowifi(false)
            console.log("Failed to connect to Wi-Fi.");
          } else {
            setconnectedtowifi(true)
            console.log("connected to Wi-Fi.");
            
          }


        }else{
          setconnectedtowifi(false)
        }
        

      })
       device1.current.monitorCharacteristicForService(SERVICE_UUID, WIFI_PROCESS_UUID, (error, characteristic) => {
            
        if (error) {
          //console.error("Error while receiving connection status:", error);
          return;
        }
        const wifiPROCESS = Buffer.from(characteristic.value, 'base64').toString();
        console.log("Wi-Fi connection status:", wifiPROCESS);
        if(wifiPROCESS !==""){
          if (wifiPROCESS === "quit") {
            
            setsuccess("quit")
          } else if(wifiPROCESS === "reset") {
            setsuccess("reset")
            console.log("reset");
            
          }


        }
        

      })
      const result = await getcurrentwifistatus(connectedDevice1)
      if(result === true){
        setquitfromwifi(true)
        readUserId(connectedDevice1);
      }else{
        readUserId(connectedDevice1);
        readWiFiScanList(connectedDevice1)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const readWiFiScanList = async (device) => {
    try {
      // Connect to the device and discover services/characteristics
      /* await device.connect();
      await device.discoverAllServicesAndCharacteristics(); */
  
      // Get the characteristic for Wi-Fi scan
      const wifiScanCharacteristic = await device.readCharacteristicForService(
        SERVICE_UUID,  // Service UUID
        WIFI_SCAN_CHARACTERISTIC_UUID   // Wi-Fi Scan Characteristic UUID
      );
  
      // Read the value and print the Wi-Fi scan list
      const wifiList = Buffer.from(wifiScanCharacteristic.value, 'base64').toString(); // Decode the base64
      const wifiListArray = JSON.parse(wifiList);
      setwifilist(wifiListArray)
      setselected(wifiListArray[0])
    } catch (error) {
      console.error("Failed to read Wi-Fi scan list:", error);
    }
  };

  const readUserId = async (device) => {
    try {
      const userIdChar = await device.readCharacteristicForService(
        SERVICE_UUID,
        USER_ID_CHAR_UUID
      );
      const decodedUserId = Buffer.from(userIdChar.value, 'base64').toString(); // Decode the base64
      console.log(decodedUserId,88888)
      setespuid(decodedUserId);
      setready(true)
      if(decodedUserId === ""){
        setauthenticated(false)
        //setauthorized(true)
        

      }else{
        setauthenticated(true)
        if(decodedUserId === state.userId){
          
          setauthorized(true)
        }else{
          
          setauthorized(false)
        }
      }
      // If the received user ID is empty, send a new one
      /* if (!decodedUserId) {
        sendUserId(device, newUserId);
      } */
    } catch (error) {
      console.log(error);
    }
  };

  /* const sendUserId = async (device) => {
    try {
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        USER_ID_CHAR_UUID,
        Buffer.from(userId).toString('base64') // Convert userId to base64
      );
      Alert.alert('User ID sent and saved!');
    } catch (error) {
      console.log(error);
    }
  }; */
  const getcurrentwifistatus = async (device) => {
    try {
      const WİFİSTAT = await device.readCharacteristicForService(
        SERVICE_UUID,
        WIFI_STATUS_CHARACTERISTIC_UUID
      );
      const decodedWİFİSTAT = Buffer.from(WİFİSTAT.value, 'base64').toString(); // Decode the base64
      if(decodedWİFİSTAT == ""){
        setsavedwifi(false)
        return false
      }else{
        setsavedwifi(decodedWİFİSTAT)
        return true
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendCredentials = async () => {
    try {
      setloading(true)
      if (device1.current) {
        if(!authenticated && authorized===null){
          await device1.current.writeCharacteristicWithResponseForService(
            SERVICE_UUID,
            USER_ID_CHAR_UUID,
            Buffer.from(state.userId).toString('base64') // Convert userId to base64
          );
        }
        await device1.current.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          SSID_CHAR_UUID,
          Buffer.from(selected).toString('base64') // Convert to base64
        );
        await device1.current.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          PASS_CHAR_UUID,
          Buffer.from(password).toString('base64') // Convert to base64
        );
        //Alert.alert('SSID and password sent!');
        setloading(false)
        /* const wifiStatusCharacteristic = await device1.current.monitorCharacteristicForService(
          SERVICE_UUID,  // Service UUID
          WIFI_STATUS_CHARACTERISTIC_UUID,  // Wi-Fi Status Characteristic UUID
          (error, characteristic) => {
            
          }
        ); */
      }
    } catch (error) {
      console.log(error);
    }
  };
  const wifireset = async () => {
    try {
      if (device1.current) {

        await device1.current.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          WIFI_PROCESS_UUID,
          Buffer.from("wifireset").toString('base64') // Convert to base64
        );
        
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  const devicereset = async () => {
    try {
      if (device1.current) {

        await device1.current.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          WIFI_PROCESS_UUID,
          Buffer.from("devicereset").toString('base64') // Convert to base64
        );
        
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  if (authenticated !== null) {
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View  style={{ paddingTop: StatusBar.currentHeight, flex: 1, justifyContent: "center", alignItems: "center", gap: 5 }}>
        {authorized || !authenticated ? (
          <>
            {!savedwifi && (
              <>
                <Button
                  labelStyle={{ color: "black" }}
                  disabled={wifiList.length === 0}
                  loading={wifiList.length === 0}
                  style={{ width: "100%", paddingHorizontal: 10, borderRadius: 10, height: 50 }}
                  contentStyle={{ height: 50, backgroundColor: "white", flexDirection: "row-reverse" }}
                  textColor="black"
                  onPress={()=>{
                    Keyboard.dismiss()
                    openMenu()
                  }}
                >
                  {wifiList.length === 0 ? <Text>Scanning Networks</Text> : selected}
                </Button>

                {selected && (
                  <View style={{ width: "100%", paddingHorizontal: 10, }}>
                    <TextInput
                      ref={inputRef}
                      mode="outlined"
                      outlineColor="white"
                      theme={{ colors: { onSurfaceVariant: "white" } }}
                      placeholder="Password"
                      label="Password"
                      outlineStyle={{ borderRadius: 10 }}
                      style={{ width: "100%", borderRadius: 10, paddingHorizontal: 5, backgroundColor: "black" }}
                      contentStyle={{ height: 50 }}
                      textContentType="password"
                      value={password}
                      activeOutlineColor="green"
                      onChangeText={setPassword}
                    />
                    <View style={{height:50,marginTop:11}}>
                    <Surface style={{ flex: 1, elevation: 4, borderRadius: 10, backgroundColor: "white",height:50,width:"100%" }}>
                      <TouchableRipple
                        disabled={selected === null}
                        borderless
                        style={{ flex: 1, borderRadius: 10 }}
                        onPress={() => {
                          inputRef.current.blur();
                          sendCredentials();
                        }}
                        rippleColor="grey"
                      >
                        <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}>
                        <Text style={{textAlign: "center", textAlignVertical: "center", color: "black", fontWeight: "500" }}>
                          CONNECT
                        </Text>
                        <ActivityIndicator animating={loading} color='black' size={18}></ActivityIndicator>
                        </View>
                      </TouchableRipple>
                    </Surface>
                    </View>
                   
                  </View>
                )}
              </>
            )}

  
            
  
            <View style={{ height: 50, width: "100%", flexDirection: "row", gap: 5, paddingHorizontal: 10 }}>
              {savedwifi && (
                <>
                  <Surface style={{ flex: 1, elevation: 4, borderRadius: 10, backgroundColor: "white" }}>
                    <TouchableRipple
                      borderless
                      style={{ flex: 1, borderRadius: 10 }}
                      onPress={() => {
                        wifireset()
                      }}
                      rippleColor="grey"
                    >
                      <Text style={{ flex: 1, textAlign: "center", textAlignVertical: "center", color: "black", fontWeight: "500" }}>
                        Quit from {savedwifi}
                      </Text>
                    </TouchableRipple>
                  </Surface>
                  <Surface style={{ flex: 1, elevation: 4, borderRadius: 10, backgroundColor: "white" }}>
                    <TouchableRipple
                      borderless
                      style={{ flex: 1, borderRadius: 10 }}
                      onPress={() => {
                        devicereset()
                      }}
                      rippleColor="grey"
                    >
                      <Text style={{ flex: 1, textAlign: "center", textAlignVertical: "center", color: "black", fontWeight: "500" }}>
                        RESET
                      </Text>
                    </TouchableRipple>
                  </Surface>
                </>
              )}
            </View>
  
            {visible && (
              <TouchableWithoutFeedback onPress={()=>{
                closeMenu();
              }}>
              <Animated.View
                entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
                exiting={FadeOut.duration(300).easing(Easing.inOut(Easing.quad))}
                style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0, zIndex: 3, backgroundColor: "white", justifyContent: "center" }}
              >
                <View style={{ position: "relative", margin: 5, backgroundColor: "black", borderRadius: 10 }}>
                  <ScrollView contentContainerStyle={{ backgroundColor: "black", padding: 0, gap: 4 }} style={{ margin: 5, height: 160 }}>
                    {wifiList.map((item, i) => (
                      <Text
                        key={i}
                        style={{ color: "white", borderRadius: 10, fontSize: 23, height: 50, textAlign: "center", backgroundColor: "#141414", padding: 10 }}
                        onPress={() => {
                          setselected(item);
                          closeMenu();
                        }}
                      >
                        {item}
                      </Text>
                    ))}
                  </ScrollView>
                  <View pointerEvents="none" style={{ position: "absolute", width: "100%", backgroundColor: "transparent", height: 170, borderRadius: 15, borderWidth: 5, borderColor: "black" }} />
                </View>
              </Animated.View>
              </TouchableWithoutFeedback>
            )}
          </>
        ) : (
          <>
            <Text style={{ fontSize: 23, color: "white" }}>You are not authorized</Text>
            <Button textColor="black" style={{ borderRadius: 10, padding: 5 }} contentStyle={{ backgroundColor: "white", height: 50 }} onPress={() => navigation.goBack()}>
              Go Back
            </Button>
          </>
        )}
  
        {connectedtowifi !== null && (
          <View style={{ position: "absolute", zIndex: 3, top: 0, right: 0, left: 0, bottom: 0, backgroundColor: "black", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 23, backgroundColor: "#141414", padding: 10, borderRadius: 10, textAlign: "center" }}>
              {connectedtowifi === true ? "Successfully Connected" : "Failed to Connect"}
            </Text>
            <Button
              onPress={() => {
                if (connectedtowifi === true) {
                  navigation.goBack();
                } else {
                  setconnectedtowifi(null);
                }
              }}
              style={{ backgroundColor: "white", borderRadius: 10 }}
              textColor="black"
            >
              {connectedtowifi === true ? "Return to Smartthings" : "Retry"}
            </Button>
          </View>
        )}
        {
          success !==null && (
            <View style={{ position: "absolute", zIndex: 3, top: 0, right: 0, left: 0, bottom: 0, backgroundColor: "black", justifyContent: "center", alignItems: "center", gap: 10 }}>
              <Text style={{ fontSize: 23, backgroundColor: "#141414", padding: 10, borderRadius: 10, textAlign: "center" }}>
              {success === "quit" ? `Disconnected from ${savedwifi}` : "Reset is Succesfull"}
              </Text>
              <Button
              onPress={() => {
                  navigation.goBack(); 
              }}
              style={{ backgroundColor: "white", borderRadius: 10 }}
              textColor="black">
                Return to Smartthings
              </Button>
            </View>
          )
        }
      </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "red", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 23 }}>Checking Authorization</Text>
        <ActivityIndicator loading={authorized === null} color="white" size="large" />
      </View>
    );
  }
}  

export default Smartdevicesetup;









