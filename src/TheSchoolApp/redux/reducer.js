let schoolData = {
    assessments: [],
    informations: [],
    grades: [],
    isRegistered: false,
    isLogged: false,
    modal: '',
    bioData: {},
    modules: [],
    test: []
}

const myReducer = (state = schoolData, action) => {
    console.log(action.type)

    switch (action.type) {

        case "OPACITY":
            const { value } = action.payload
            return {
                ...state,
                opacity: value
            }


        case "IS_LOGGED":
            return {
                ...state,
                isLogged: true
            }

        case "IS_REGISTERED":
            return {
                ...state,
                isRegistered: true
            }

        case "MESSAGE":
            const { message } = action.payload
            return {
                ...state,
                message
            }

        case "ERROR":
            const { error } = action.payload
            return {
                ...state,
                error
            }

        case "MODULE_INFORMATION":
            const { moduleInformation } = action.payload
            return {
                ...state,
                moduleInformation
            }

        case "ASSESSMENTS":
            let { assessments } = action.payload
            return {
                ...state,
                assessments
            }

        case "MODULES":
            let { modules } = action.payload
            return {
                ...state,
                modules
            }

        case "INFORMATIONS":
            const { informations } = action.payload
            return {
                ...state,
                informations
            }

        case "GRADES":
            const { grades } = action.payload
            return {
                ...state,
                grades
            }

        case "BIO_DATA":
            const { bioData } = action.payload
            return {
                ...state,
                bioData
            }

        case "TEST":
            let { test } = action.payload
            return {
                ...state,
                test
            }

        case "MODAL_CLEAR":
            return {
                ...state,
                modal: ''
            }
        case "SIGNOUT":
            return {
                ...state,
                student: {},
                tutor: {},
                assesments: [],
                informations: [],
                grades: [],
                isRegistered: false,
                isLogged: false,
                bioData: {}
            }








        case "ALL_MYMODULES":
            let { allMyModules } = action.payload
            return {
                ...state,
                allMyModules: allMyModules
            }
        case "MY_ASSESSMENT":
            let { myAssessment, duration } = action.payload
            if (myAssessment) {
                return {
                    ...state,
                    myAssessment: myAssessment
                }
            } else if (duration) {
                return {
                    ...state,
                    myAssessment: state.myAssessment.map(ass => ({
                        ...ass,
                        duration: ass.duration = duration
                    }))
                }
            }

    }
    return state;
}

export default myReducer;
