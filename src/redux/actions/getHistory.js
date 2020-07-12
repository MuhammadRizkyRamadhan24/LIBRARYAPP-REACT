import axios from 'axios';

export const getAllHistory = (token, Username) => {
    return {
        type: 'ALLHISTORY',
        payload: axios({
            method: 'GET',
            url:`http://localhost:3000/books/history/${Username}`,
            headers: {
                Authorization: token
            }
        })
    };
};