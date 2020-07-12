import axios from 'axios';

export const getAllGenre = (token) => {
    return {
        type: 'ALLGENRE',
        payload: axios({
            method : "GET",
            url : 'http://localhost:3000/genres',
            headers : {
              Authorization : token
            }
          })
    };
};