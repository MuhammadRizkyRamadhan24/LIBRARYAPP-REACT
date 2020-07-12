import axios from 'axios';

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

