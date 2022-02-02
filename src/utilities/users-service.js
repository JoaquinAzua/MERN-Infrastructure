import * as usersAPI from './users-api'

export async function signUp(userData) {
        // delegate the network request code to the users-api.js API module
        // which will ultimately return a JSON web token
        const token = await usersAPI.signUp(userData);
        // save the token to localstorage
        localStorage.setItem('token', token);
        return getUser();  
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
}

export function logOut() {
    localStorage.removeItem('token');
}

export function getToken() {
    // getItem returns null if there's no token
    const token = localStorage.getItem('token');
    if(!token) return null;
    //obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]))
    // a JWT's exp is express in seconds not ms so convert
    if (payload.exp < Date.now() / 1000){
        // Token has expired - remove it from localStorage
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export async function checkToken() {
    const dateStr = await usersAPI.checkToken();
    return new Date(dateStr);
}

export function getUser() {
    const token = getToken();
    // if there's a token, return the user in the payload otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}