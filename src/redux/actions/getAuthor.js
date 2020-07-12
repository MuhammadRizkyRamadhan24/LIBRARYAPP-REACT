import axios from 'axios';

export const getAllAuthor = (token) => {
    return {
        type: 'ALLAUTHOR',
        payload: axios({
            method : "GET",
            url : 'http://localhost:3000/authors',
            headers : {
              Authorization : token
            }
          })
    };
};