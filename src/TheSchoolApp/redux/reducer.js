import { act } from "react-dom/test-utils"

let schoolData = {
    student: {},
    tutor: {},
    allQuestions: [],
    allInformations: [],
    allResults: [],
    userRegistered: false,
    userLoggedIn: false,
    modal: '',
    personalInformation: {},
    allMyModules: [],
    allModules: [],
    myAssessment: []
}

const myReducer = (state = schoolData, action) => {
    switch (action.type) {
        case "STUDENT_LOGIN":
            return {
                ...state,
                student: action.payload,
                userLoggedIn: true
            }
        case "TUTOR_LOGIN":
            return {
                ...state,
                tutor: action.payload,
                userLoggedIn: true
            }
        case "TUTOR_REGISTRATION":
            return {
                ...state,
                userRegistered: true
            }
        case "STUDENT_REGISTRATION":
            return {
                ...state,
                userRegistered: true
            }
        case "MODAL_DISPLAY":
            return {
                ...state,
                modal: action.payload
            }
        case "MODAL_CLEAR":
            return {
                ...state,
                modal: ''
            }
        case "HANDLE_SIGNOUT":
            return {
                ...state,
                student: {},
                tutor: {},
                allQuestions: [],
                allInformations: [],
                testDurations: [],
                resultArray: [],
                userRegistered: false,
                userLoggedIn: false,
                modal: ''
            }
        case "ALL_QUESTIONS":
            let { allQuestions } = action.payload
            return {
                ...state,
                allQuestions: allQuestions
            }
        case "ALL_INFORMATIONS":
            let { allInformations } = action.payload
            return {
                ...state,
                allInformations: allInformations
            }
        case "ALL_RESULTS":
            let { allMyResults } = action.payload
            return {
                ...state,
                allResults: allMyResults
            }
        case "PERSONAL_INFO":
            let { personalInformation } = action.payload
            return {
                ...state,
                personalInformation: personalInformation
            }
        case "ALL_MODULES":
            let { allModules } = action.payload
            return {
                ...state,
                allModules: allModules
            }
        case "ALL_MYMODULES":
            let { allMyModules } = action.payload
            return {
                ...state,
                allMyModules: allMyModules
            }
        case "MY_ASSESSMENT":
            let { myAssessment } = action.payload
            return {
                ...state,
                myAssessment: myAssessment
            }

    }
    return state;
}

export default myReducer;
