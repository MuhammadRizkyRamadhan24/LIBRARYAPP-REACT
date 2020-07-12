const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {}
}

const borrow = (state = initialState, action) => {
    switch(action.type){
        case "BORROWBOOK_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "BORROWBOOK_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "BORROWBOOK_FULFILLED":
        console.log(action.payload.data.data[0]);
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data[0]
            }

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

export default borrow;
