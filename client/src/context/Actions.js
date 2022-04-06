// 6.타입 -> 액션이름이;라 생각하면 됨
export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

//7. payload -> user를 업데이트 하기 위한 프로퍼티
export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

// 8.에러발생시 - 아무 페이로드도 인수로 집어넣지 않았다.
export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
})

// 9.이제 이 액션들을 가지고 state를 다룰 수 있는게 reducer임