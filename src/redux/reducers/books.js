const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

const book = (state = initialState, action) => {
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
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }

        case "GETBOOKBYID_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "GETBOOKBYID_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "GETBOOKBYID_FULFILLED":
        console.log(action.payload.data.data[0]);
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }

        case "SEARCH_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "SEARCH_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "SEARCH_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data
            }
        
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

        case "EDITBOOK_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "EDITBOOK_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "EDITBOOK_FULFILLED":
        console.log(action.payload.data.data[0]);
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data.data[0]
            }

                case "DELETEDATABYID_PENDING":
                    return {
                        ...state,
                        isLoading: true,
                        isError: false
                    }
                case "DELETEDATABYID_REJECTED":
                    return {
                        ...state,
                        isLoading: false,
                        isError: true,
                        errorMsg: 'Data Rejected'
                    }
                case "DELETEDATABYID_FULFILLED":
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

export default book
