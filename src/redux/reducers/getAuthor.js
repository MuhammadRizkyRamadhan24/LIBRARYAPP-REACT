const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

const getAuthor = (state = initialState, action) => {
    switch(action.type){
        case "ALLAUTHOR_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "ALLAUTHOR_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "ALLAUTHOR_FULFILLED":
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

export default getAuthor
