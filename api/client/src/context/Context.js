import { createContext, useEffect, useReducer } from "react";
import Profiles from "../components/profiles/Profiles";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    path: {
        name:"profile", 
        component:<Profiles/>,
        title:"내 정보를 수정 할 수 있는 페이지입니다.",
        heading:"프로필 수정하기",
      },
    isFetching: false,
    error: false,
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=> {
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user])

    return(
        <Context.Provider value={{
            user:state.user,
            path:state.path,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>{children}</Context.Provider>
    )
}
