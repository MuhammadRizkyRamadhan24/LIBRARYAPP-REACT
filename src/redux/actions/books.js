import axios from 'axios';

export const getAllBook = (token) =>{
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

export const getBookById = (token, id) => {
    return {
        type: 'GETBOOKBYID',
        payload: axios({
            method: 'GET',
            url:`http://localhost:3000/books/${id}`,
            headers: {
                Authorization: token
            }
        })
    };
};

export const getSearch = (token, search, order, sort, limit, page) =>{
    return {
        type: 'SEARCH',
        payload:  axios({
                 method: 'GET',
                 url: `http://localhost:3000/books/search?search=${search}&order=${order}&sort=${sort}&limit=${limit}&page=${page}`,
                 headers: {
                     Authorization: token
                 }
             })
    };
};

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

export const editBook = (token, formData, id) =>{
    return {
        type: 'EDITBOOK',
        payload: axios({
            method: 'PUT',
            url: `http://localhost:3000/books/${id}`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token
            }
        })
    };
};

export const deleteDataById = (token, id) => {
    return {
        type: 'DELETEDATABYID',
        payload: axios({
            method: 'DELETE',
            url:`http://localhost:3000/books/${id}`,
            headers: {
                Authorization: token
            }
        })
    };
};