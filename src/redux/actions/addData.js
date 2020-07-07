import axios from 'axios';

export const addBook = (token, formData) =>{
    return {
        type: 'ADDBOOK',
        payload: axios({
            method: 'POST',
            url: 'http://localhost:3000/books',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token
            }
        })
    };
};

// export const borrowBook = data =>{
//     return {
//         type: 'REGISTER',
//         payload: axios({
//             method: 'POST',
//             url: 'http://localhost:3000/auth/register',
//             data: {
//                 username: data.username,
//                 password: data.password,
//                 role: data.role
//             }
//         })
//     };
// };