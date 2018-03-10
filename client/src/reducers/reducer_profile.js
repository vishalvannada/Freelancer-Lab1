import {AUTH, NO_AUTH, PROFILE_EDIT, PROFILE_AUTH, LOGOUT} from "../actions";

//state may be object or array or anything that we want

const profile = {
    loginStatus: {
        isLoggingIn: true,
        isLoggedIn: false,
        errorMsg: ''
    },
    userDetails: {
        username: '',
        email: '',
        phoneNumber: '',
        aboutMe: '',
        skills: ''
    },
    editing: false,
}

export default function (state = profile, action) {
    switch (action.type) {
        case PROFILE_EDIT:
            console.log("here")
            const user = action.response.data[0]
            return {
                loginStatus: action.payload,
                userDetails: {
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phonenumber,
                    aboutMe: user.aboutme,
                    skills: user.skills
                },
                editing: true
            }
        case PROFILE_AUTH:
            const user1 = action.response.data[0]
            return {
                loginStatus: action.payload,
                userDetails: {
                    username: user1.username,
                    email: user1.email,
                    phoneNumber: user1.phonenumber,
                    aboutMe: user1.aboutme,
                    skills: user1.skills
                },
                editing: false
            }
        case LOGOUT:
            return {
                loginStatus: {
                    isLoggingIn: false,
                    isLoggedIn: false,
                    errorMsg: ''
                },
                userDetails: {
                    username: '',
                    email: '',
                    phoneNumber: '',
                    aboutMe: '',
                    skills: ''
                },
                editing: false,
            }
        case NO_AUTH:
            console.log("here")
            return {
                loginStatus: {
                    isLoggingIn: false,
                    isLoggedIn: false,
                    errorMsg: ''
                },
                userDetails: {
                    username: '',
                    email: '',
                    phoneNumber: '',
                    aboutMe: '',
                    skills: ''
                },
                editing: false,
            }
        default:
            console.log("prof:def"+action.type)
            return state;
    }
}