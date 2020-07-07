const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

const getData = (state = initialState, action) => {
    switch(action.type){
        case "ALLDATA_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "ALLDATA_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "ALLDATA_FULFILLED":
        // console.log(action.payload.data.data[0]);
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

export default getData
