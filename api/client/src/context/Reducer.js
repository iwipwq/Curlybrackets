const Reducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user:null,
                isFetching:true,
                error:false,
            };
        case "LOGIN_SUCCESS":
            return {
                user:action.payload,
                isFetching: false,
                error:false,
            };
        case "LOGIN_FAILURE":
            return {
                user:null,
                isFetching: false,
                error:true,
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true,
            };
        case "UPDATE_SUCCESS":
            return {
                ...state,
                user:action.payload,
                isFetching: false,
                error:false,
            };
        case "UPDATE_FAILURE":
            return {
                ...state,
                user:state.user,
                isFetching: false,
                error:true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        case "WITHDRAWAL_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            }
        case "WITHDRAWAL_SUCCESS":
            return {
                user: null,
                isFetching: false,
                error: false,
            }
        case "WITHDRAWAL_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        case "PATH_CHANGE":
            return {
                ...state,
                path:action.payload,
                isFetching: false,
                error: false,
            }
        default:
            return state;
    }
}

export default Reducer;