const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {}
}

const returnTheBook = (state = initialState, action) => {
    switch(action.type){
        case "RETURNBOOK_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "RETURNBOOK_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "RETURNBOOK_FULFILLED":
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

export default returnTheBook;
