import { createContext, useReducer } from "react";

// 모든 렌더링 작업이 성공적으로 끝났을때 이값을 업로드
const INITIAL_STATE = {
    user: null,
    inFetching: false,
    error: false,
}

// 이 값(INITIAL_STATE)을 가지고 콘텍스트 프로바이더 내보내기
export const Context = createContext(INITIAL_STATE);

// 콘텍스트에 접근하는 방법
export const ContextProvider = ({children}) => {

}

//로그인 버튼을 눌렀을때 유저네임과 패스워드 두가지를 컨트롤해야한다 credential이 끝난 후
// 추가로 해야하는 일이 있다. 성공이냐 실패냐 일때 
// 성공시 INITIAL_STATE 의 프로퍼티들을 업데이트 user: abcd, email:asdfas...
// 실패시 (인가실패 몽고디비에러 등등) -> INITAL STATE의 error 값 바뀜
// -> 이걸 Actions에서 컨트롤