const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {}
}

const addData = (state = initialState, action) => {
    switch(action.type){
        case "ADDBOOK_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "ADDBOOK_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "ADDBOOK_FULFILLED":
        console.log(action.payload.data.data[0]);
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data[0]
            }

        default:
            return state;
    }
}

export default addData;
