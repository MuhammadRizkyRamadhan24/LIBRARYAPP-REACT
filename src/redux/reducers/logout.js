const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {}
}

const logout = (state = initialState, action) => {
    switch(action.type){
        case "LOGOUT_FULFILLED":
        return {
            ...state,
            // isLoading: false,
            // isError: false,
            // errorMsg: "",
            data: {}
        };
        default:
            return state;
        }
}

export default logout
