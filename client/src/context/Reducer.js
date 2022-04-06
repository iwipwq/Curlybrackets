const Reducer = (state, action) => {
    //10.switch로 제어
    switch(action.type){
        case "LOGIN_START":
            return {
                user:null,
                insFetching:true,
                error:false,
            };
            //10.payload에 있는 user를 user값으로 바꿔준다.
            //11.fetch는 끝났으니 false로 (작업을 여기서 끝내야되니까)
        case "LOGIN_SUCCESS":
            return {
                user:action.payload,
                isFetching: false,
                error:false,
            }
            // 11. error 발생상황이니 error 는 true로
            // 작업은 끝난상태니 isFetching은 여전히 false
        case "LOGIN_FAILURE":
            return {
                user:null,
                isFetching: false,
                error:true,
            }
        default:
            return state;
    }
}

//12. 이제 Action과 Reducer를 사용하려면 이것들을 dispatch하면 된다. ->Context로
export default Reducer;