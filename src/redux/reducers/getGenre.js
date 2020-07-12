const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: []
}

const getGenre = (state = initialState, action) => {
    switch(action.type){
        case "ALLGENRE_PENDING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "ALLGENRE_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMsg: 'Data Rejected'
            }
        case "ALLGENRE_FULFILLED":
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

export default getGenre
