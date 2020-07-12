import axios from 'axios';

export const borrowBook = (token, data) =>{
    return {
        type: 'BORROWBOOK',
        payload: axios({
            method: 'POST',
            url: `http://localhost:3000/books/borrow`,
            data: {
                title: data.title,
                username: data.username,
            },
            headers: {
              Authorization: token
            }
        })
    };
};

export const returnBook = (token, data) =>{
    return {
        type: 'RETURNBOOK',
        payload: axios({
            method: 'PATCH',
            url: 'http://localhost:3000/books/return',
            data: {
              title: data.title,
              username: data.username
            },
            headers: {
              Authorization: token
            }
        })
    };
};

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