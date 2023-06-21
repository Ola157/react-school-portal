const myReducer = (state, action) => {
    if (action.type === "ADD_STAFF") {
        let a = {
            ...state,
            staffArray: [...state.staffArray, action.payload]
        }
        return a
    }

    if (action.type === "ADD_STUDENT") {
        let a = {
            ...state,
            studentArray: [...state.studentArray, action.payload]
        }
        return a
    }

    if (action.type === 'ADD_QUESTION') {
        let a = {
            ...state,
            questionArray: [...state.questionArray, action.payload]
        }
        return a
    }

    if (action.type === "EDIT_QUESTION") {
        let a = {
            ...state,
            questionArray: state.questionArray.map((a, i) => a.moduleId === action.payload.moduleId && action.payload.index === i ? ({
                ...a,
                edit: action.payload.any
            }) : a)
        }
        return a
    }

    if (action.type === "DEL_QUESTION") {
        let { index, moduleId } = action.payload
        let a = {
            ...state,
            questionArray: state.questionArray.filter((a, i) => a.moduleId === moduleId ? index !== i : a)
        }
        return a
    }

    if (action.type === "ADD_EDITED") {
        let { index, moduleId, question, optionA, optionB, optionC, optionD, answer } = action.payload
        let a = {
            ...state,
            questionArray: state.questionArray.map((a, i) => a.moduleId === moduleId && i === index ? ({
                ...a,
                question: question,
                optionA: optionA,
                optionC: optionB,
                optionD: optionC,
                optionE: optionD,
                answer: answer,
                edit: ''
            }) : a)
        }
        return a
    }

    if (action.type === "ADD_INFOS") {
        let { post, moduleId, display } = action.payload

        let a = {
            ...state,
            informationArray: [...state.informationArray, { post, moduleId, display }]
        }
        return a
    }

    if (action.type === "ADD_TIME") {
        let { moduleId, time } = action.payload
        let b = state.duration ? state.duration.find(a => a.moduleId === moduleId) : ''

        let a = {
            ...state,
            duration: !b ? [...state.duration, { moduleId, time }] : state.duration
        }
        return a
    }

    if (action.type === "DISPLAY_CONTROL") {
        let { any, moduleId } = action.payload
        let a = {
            ...state,
            questionArray: any === 'dQuestion' || any === '!dQuestion' ? state.questionArray.map(a => a.moduleId === moduleId ? ({
                ...a,
                display: any
            }) : a) : state.questionArray,

            duration: any === '!dQuestion' ? state.duration.filter(a => a.moduleId !== moduleId) : state.duration,

            informationArray: any === 'dInfo' || any === '!dInfo' ? state.informationArray.map(a => a.moduleId === moduleId ? ({
                ...a,
                display: any
            }) : a) : state.informationArray,

            resultArray: any === 'dGrades' || any === '!dGrades' ? state.resultArray.map(a => a.moduleId === moduleId ? ({
                ...a,
                display: any
            }) : a) : state.resultArray
        }
        return a
    }

    if (action.type === "DELETE_INFOS") {
        let { index, moduleId } = action.payload

        let a = {
            ...state,
            informationArray: state.informationArray.filter((a, i) => a.moduleId === moduleId ? index !== i : a)
        }
        return a
    }

    if (action.type === "ADD_PINFO") {

        let a = {
            ...state,
            staffArray: action.payload.moduleId ? state.staffArray.map(a => a.moduleId === action.payload.moduleId ?
                ({
                    ...a,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    dob: action.payload.dob,
                    homeAddress: action.payload.homeAddy
                }) : a) : state.staffArray,

            studentArray: action.payload.studentId ? state.studentArray.map(a => a.studentId === action.payload.studentId ?
                ({
                    ...a,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    dob: action.payload.dob,
                    homeAddress: action.payload.homeAddy
                }) : a) : state.studentArray

        }
        return a
    }

    if (action.type === "ANSWER_UPDATE") {
        let { answer, index, moduleId } = action.payload

        let a = {
            ...state,
            questionArray: state.questionArray.map((a, i) => a.moduleId === moduleId && index === i ?
                ({
                    ...a,
                    studentAnswer: answer
                }) : a)
        }
        return a
    }


    if (action.type === "ADD_SCORE") {
        let { moduleId, studentId, finalScore, display } = action.payload

        let a = {
            ...state,
            resultArray: [...state.resultArray, { moduleId, studentId, finalScore, display }]
        }
        return a
    }

    return state;
}

export let portalData = {
    studentArray: '',
    staffArray: '',
    questionArray: '',
    informationArray: '',
    duration: '',
    resultArray: ''
}

export default myReducer;
