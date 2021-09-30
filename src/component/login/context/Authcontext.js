
import { createContext ,useContext,useReducer , useEffect} from "react";

const StateContext = createContext();

export default function StateProvider({ children }){
    
    const [state,dispatch] = useReducer(ReducerFunc , {
        user: localStorage.getItem("mainUser") ? JSON.parse(localStorage.getItem("mainUser")):null,
        isFatching:false,
        err:false
    })
     useEffect(()=>{
         localStorage.setItem("mainUser",JSON.stringify(state.user))
     },[state])
   
    return (
        <StateContext.Provider value={{
            user:state.user,
            isFatching:state.isFatching,
            err:state.err,
            dispatch
        }}>
            {children}

        </StateContext.Provider>
    )
}

export const StateHandler=()=>useContext(StateContext)

const ReducerFunc=(state,action)=>{
    switch (action.type) {
        case "LOGIN-START":
            return{
                state,user:null,
                state,isFatching:true,
                state,err:false
            }
        
        case "LOGIN-SUCCESSFUL":
            return{
                state,user:action.payLoad,
                state,isFatching:false,
                state,err:false
            }    
        case "LOGIN-FAIL":
            return{
                state,user:null,
                state,isFatching:false,
                state,err:action.payLoad
            }
        case "FOLLOW":
            return{
               ...state,user:{...state.user,following:[...state.user.following,action.payLoad]}
            }  
        case "UNFOLLOW":
            return{
                ...state,user:{...state.user,following:state.user.following.filter((followerUserId)=>followerUserId === action.payLoad)}
            }  
        case "LOGOUT-USER":
            return{
                state,user:null,
                state,isFatching:false,
                state,err:false 
            } 
        case "UPDATE-PROFILEPICTURE":
            return{
                ...state,user:{...state.user,profilePicture:action.payLoad }
            }     
    
        default:
            return state;
    }

}
