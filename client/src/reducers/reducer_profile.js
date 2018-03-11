import {AUTH, NO_AUTH, PROFILE_EDIT, PROFILE_AUTH, LOGOUT, IMAGE_POST, UP_SUCCESS} from "../actions";

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
        skills: '',
        image : ''
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
                    skills: user.skills,
                    image: user.imagename
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
                    skills: user1.skills,
                    image: user1.imagename
                },
                editing: false
            }
        case UP_SUCCESS:
            const user4 = action.response.data[0]
            return {
                loginStatus: action.payload,
                userDetails: {
                    username: user4.username,
                    email: user4.email,
                    phoneNumber: user4.phonenumber,
                    aboutMe: user4.aboutme,
                    skills: user4.skills,
                    image: user4.imagename
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
                    skills: '',
                    image: ''
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
                    skills: '',
                    image: ''
                },
                editing: false,
            }
        case IMAGE_POST:
            console.log("here")
            const user2 = action.response.data[0]

            return {
                loginStatus: {
                    isLoggingIn: false,
                    isLoggedIn: true,
                    errorMsg: ''
                },
                userDetails: {
                    username: user2.username,
                    email: user2.email,
                    phoneNumber: user2.phonenumber,
                    aboutMe: user2.aboutme,
                    skills: user2.skills,
                    image: user2.imagename
                },
                editing: true,
            }

        default:
            console.log("prof:def" + action.type)
            return state;
    }
}