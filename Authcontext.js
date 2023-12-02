import {createContext,useReducer,useMemo,useContext,useState,useRef} from 'react';
import { Dimensions,StatusBar } from 'react-native';
const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    userId:null,
    mpeop:[],
    peop:[]
  };
export const AuthContext = createContext();
export const useAuthorization = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Error');
      }
      return context;
  };
export function Auth({children,setcalli,socketi,calli}){
    const {width,height}=Dimensions.get("window")
    const height1=Dimensions.get("screen").height
    const n=height1-height-StatusBar.currentHeight
    const routeNameRef =useRef()
    const allm =useRef([])
    const messageRef =useRef()
    const rr =useRef(false)
    const offlinepause = useRef({audio:true,video:true}) 
    //let server ="http://192.168.1.108:3001"
    const server = "https://smartifier.onrender.com"
    const socket = useRef(null)
    const rtcm =useRef()
    const userid1 =useRef()
    const remoteRTCMessage = useRef({
      rtcMessage:null,
      otherid:null
    });
    const check = useRef(null)
    const [img, setimg] = useState(null);
    const [navbar, setnavbar] = useState(n);
    const cam = useRef(false)
    const[camopen,setcamopen]=useState(false)
    const [auth, setauth] = useState(null)
    const [ss, setss] = useState(false)
    const [rot, setrot] = useState(false)
    const [userToken, setuserToken] = useState()
    const istoday = useRef({})
    const callst = useRef(true)
    const myconv = useRef([])
    const [userId, setuserId] = useState()
    const [icall, seticall] = useState(false)
    const [stat, setstat] = useState(false)
    const [gest, setgest] = useState(true)
    const [mesnotif, setmesnotif] = useState(false)
    const [visible, setIsVisible] = useState(false);
    const [a, seta] = useState()
    const [keyboard,setkeyboard] = useState()
    const[messages,setmessages]=useState([])
    const[mpeop,setmpeop]=useState([])
    const[peop,setpeop]=useState([])
    const currentconv=useRef(null)
    const [state, dispatch] = useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userId:action.id,
                userToken: action.token,
                userName:action.name,
                isLoading: false,
              };
              case 'mpeop':
              return {
                ...prevState,
                isSignout: false,
                mpeop:action.data,
                isLoading: false,
              };
              case 'peop':
                return {
                  ...prevState,
                  isSignout: false,
                  peop:action.data,
                  isLoading: false,
                };
            case 'SIGN_OUT':
              return {
                ...prevState,
                userId:null,
                isSignout: true,
                userToken: null,
                isLoading: false,
              };
          }
        },initialLoginState
      );
    
      const authContext = useMemo(
        () => ({
          signIn: async (data) => {
            
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: data.userToken,id:data.userId,name:data.userName});
          },
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
          setmpeop: (data) =>{
           
            
            dispatch({ type:'mpeop',data})},
          setpeop: (data) => dispatch({ type:'peop',data}),
          signUp: async (data) => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
        }),
        []
      );
return(
<AuthContext.Provider value={{cam,camopen,setcamopen,ss,setss,navbar,setnavbar,calli,setcalli,allm,check,myconv,offlinepause,rr,setrot,rot,setstat,stat,istoday,authContext,state,routeNameRef,mesnotif,setmesnotif,keyboard,setkeyboard,setIsVisible,mpeop,setmpeop,auth,setauth,peop,setpeop,messages,setmessages,currentconv,messageRef,server,userId,setuserId,socket,remoteRTCMessage,callst,userToken,setuserToken,img,setimg,setgest,gest,icall,seticall}}>
{children}
</AuthContext.Provider>
)
}