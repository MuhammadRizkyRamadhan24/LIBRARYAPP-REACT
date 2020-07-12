const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

const getHistory = (state = initialState, action) => {
    switch(action.type){
        case "ALLHISTORY_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "ALLHISTORY_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "ALLHISTORY_FULFILLED":
        console.log(action.payload.data.data[0]);
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }
        default:
            return state;
    }
}

export default getHistory
