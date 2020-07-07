import axios from 'axios';

export const getAllData = (token) =>{
    return {
        type: 'ALLDATA',
        payload: axios({
            method: 'GET',
            url: 'http://localhost:3000/books',
            headers: {
                Authorization: token
            }
        })
    };
};
