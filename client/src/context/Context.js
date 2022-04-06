import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

// 1.모든 렌더링 작업이 성공적으로 끝났을때 이 값을 업로드
const INITIAL_STATE = {
    user: null,
    inFetching: false,
    error: false,
}

// 2.이 값(INITIAL_STATE)을 가지고 콘텍스트 프로바이더 내보내기
export const Context = createContext(INITIAL_STATE);

// 3.콘텍스트에 접근하는 방법
export const ContextProvider = ({children}) => {
    //13. state dispatch하기, state,dispatch의 값은 Redcucer에서 가지고온다.
    //14. -> useReducer(Redcucer) -> Reducer.js에서 Reducer가져오기
    //15. 여기서 reducer가 사용하는 state는 INITIAL_STATE다. -> ,INITIAL_STATE)
    // 이제 Context를 이 Provider로 줄 수 있음
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    //16. context.Provider의 props로 user,isFetching,error를 state에서 가져오고, 마지막으로dispatch한다.
    // ex 로그인 버튼을 누르면 이 정보들을 dispatch -> 서버에 응답에 따라 dispatch SUCCESFUL 이나 FAILURE를 가져옴
    //17. 이제 ContextProvider를 App.js나 index.js에서 사용가능
    // index.js에서 <App/>을 감싸게 되면 모든 곳에서 Context 사용가능 -> 18.index.js로
    return(
        <Context.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>{children}</Context.Provider>
    )
}

// 4.로그인 버튼을 눌렀을때 유저네임과 패스워드 두가지를 컨트롤해야한다 credential이 끝난 후
// 추가로 해야하는 일이 있다. 성공이냐 실패냐 일때 
// 성공시 INITIAL_STATE 의 프로퍼티들을 업데이트 user: abcd, email:asdfas...
// 실패시 (인가실패 몽고디비에러 등등) -> INITAL STATE의 error 값 바뀜
// 5. -> 이걸 Actions에서 컨트롤