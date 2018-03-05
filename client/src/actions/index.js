import axios from 'axios';

export const LOGIN = 'login';


const ROOT_URL = 'http://localhost:3000';

export function loginSubmit(values, callback) {

    console.log("Here");

    // axios.post('/formulas/create', {
    //     name: "",
    //     parts: ""
    // })
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error.response)
    //     });

    const request = axios.post(`${ROOT_URL}/login`, values).then( response => {
        console.log("vishal"+response);
    }).catch(error =>{
        console.log(error.response);
    })

    return {
        type: LOGIN,
        payload: request
    }
}


// export function createPost(values, callback) {
//     const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values).then(() => callback());
//     return {
//         type: CREATE_POST,
//         payload: request
//     }
// }
//
//
// export function fetchPost(id) {
//
//     const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
//
//     return {
//         type: FETCH_POST,
//         payload: request
//     }
// }
//
// export function deletePost(id, callback) {
//
//     const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(() => callback());
//     return {
//         type: DELETE_POST,
//         payload: id
//     }
// }