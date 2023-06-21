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
        let { any, index, moduleId } = action.payload
        let a = {
            ...state,
            questionArray: state.questionArray.filter((a, i) => a.moduleId === moduleId && index === i)
                .map(a => ({
                    ...a,
                    edit: any
                }))
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
            questionArray: state.questionArray.filter((a, i) => a.moduleId === moduleId && i === index).map(a => ({
                ...a,
                question: question,
                optionA: optionA,
                optionC: optionB,
                optionD: optionC,
                optionE: optionD,
                answer: answer,
                edit: ''
            }))
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

    if (action.type === "DISPLAY_CONTROL") {
        let { any, moduleId, time } = action.payload
        let a = {
            ...state,
            questionArray: action.payload.any === 'dQuestion' || action.payload.any === '!dQuestion' ?
                state.questionArray.filter(a => a.moduleId === action.payload.moduleId).map(a => ({
                    ...a,
                    display: action.payload.any
                })) : state.questionArray,

            duration: action.payload.any === 'dQuestion' ? [...state.duration, { moduleId, time }] : Array.isArray(state.duration) ? state.duration.filter(a => a.moduleId !== moduleId) : state.duration,

            informationArray: action.payload.any === 'dInfo' || action.payload.any === '!dInfo' ?
                state.informationArray.filter(a => a.moduleId === action.payload.moduleId).map(a => ({
                    ...a,
                    display: action.payload.any
                })) : state.informationArray,

            resultArray: action.payload.any === 'dGrades' || action.payload.any === '!dGrades' ?
                state.resultArray.filter(a => a.moduleId === action.payload.moduleId).map(a => ({
                    ...a,
                    display: action.payload.any
                })) : state.resultArray
        }
        console.log(a)
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
        console.log(action.payload)

        let a = {
            ...state,
            staffArray: action.payload.moduleId ? state.staffArray.filter(a => a.moduleId === action.payload.moduleId).map(a =>
            ({
                ...a,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                dob: action.payload.dob,
                homeAddress: action.payload.homeAddy
            })) : state.staffArray,

            studentArray: action.payload.studentId ? state.studentArray.filter(a => a.studentId === action.payload.studentId).map(a =>
            ({
                ...a,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                dob: action.payload.dob,
                homeAddress: action.payload.homeAddy
            })) : state.studentArray

        }
        return a
    }

    if (action.type === "ANSWER_UPDATE") {
        let { answer, index, moduleId } = action.payload

        let a = {
            ...state,
            questionArray: state.questionArray.filter((a, i) => a.moduleId === moduleId && index === i).map(a =>
            ({
                ...a,
                studentAnswer: answer
            }))
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
