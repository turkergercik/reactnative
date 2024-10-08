import { View, Text } from 'react-native'
import React ,{useState} from 'react'
import { useAuthorization } from '../Authcontext';
import { Portal,Modal,Switch,Button } from 'react-native-paper';
const Device = ({item,socket}) => {

  const{state}=useAuthorization()
  const [visible, setVisible] = useState(false);
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onToggleSwitch = (id) => {
      const currentStatus = item.status;
      console.log(item.status)
      const newStatus = !currentStatus; // Toggle the current status
      socket.current.emit('light', { userid: state.userId, id: id, status: newStatus });
      if(item.status===true){
        item.status=false
      }else{
        item.status=true
      }
      // Do not update the UI locally, wait for the server response in socket.on('update')
  
  };
    
    return (
        <View style={{flex:1}}>
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor:"white",borderRadius:15,margin:10}}>
              <Text style={{color:"black",textAlign:"center",fontSize:25}}>id : {item.id}</Text>
            </Modal>
          </Portal>
               <View style={{backgroundColor:"#141414",height:100,flexDirection:"row",alignItems:"center",margin:5,borderRadius:10 ,justifyContent:"space-around"}}>
               <View style={{flex:1,alignItems:"center",justifyContent:"center",gap:2}}>
                <Text style={{flexDirection:"row",textAlign:"center",color:"white",fontSize:23}}>ESP-32</Text>
                
                <Button buttonColor='black' onPress={showModal} textColor='white' style={{margin:0}} >info</Button>
                
               </View>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                  <Switch value={item.status} color='green' style={{}} onValueChange={(val)=>{onToggleSwitch(item.id)}} />
                <Text style={{color:item.status===true ? "green" : "grey" }} >{item.status ===true ? "ON":"OFF"}</Text>
    
                  </View>
                </View>
                </View>
    
        </View>
      )
}

export default Device