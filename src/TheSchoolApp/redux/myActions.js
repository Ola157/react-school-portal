import axios from "axios"

const actionTypes = {
    STUDENT_LOGIN: "STUDENT_LOGIN",
    TUTOR_LOGIN: "TUTOR_LOGIN",
    TUTOR_REGISTRATION: "TUTOR_REGISTRATION",
    STUDENT_REGISTRATION: "STUDENT_REGISTRATION",
    MODAL_DISPLAY: "MODAL_DISPLAY",
    MODAL_CLEAR: "MODAL_CLEAR",
    HANDLE_SIGNOUT: "HANDLE_SIGNOUT",
    ALL_QUESTIONS: "ALL_QUESTIONS",
    ALL_INFORMATIONS: "ALL_INFORMATIONS",
    ALL_RESULTS: "ALL_RESULTS",
    PERSONAL_INFO: "PERSONAL_INFO",
    ALL_MYMODULES: "ALL_MYMODULES",
    ALL_MODULES: "ALL_MODULES",
    MY_ASSESSMENT: "MY_ASSESSMENT"
}

export const handleRegistration = (data) => async (dispatch) => {
    let { type, email, password, firstName, lastName, dob, homeAddress, mobileNumber, moduleName, moduleCode } = data
    try {
        let response;
        switch (type) {
            case 'student':
                response = await axios.post('http://localhost:9090/signInReg/login', { type, email, password }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                if (response.data.accessToken) {
                    localStorage.setItem('accessToken', response.data.accessToken)
                    dispatch({ type: actionTypes.STUDENT_LOGIN, payload: response.data.studentData })
                }
                else (dispatch({ type: actionTypes.MODAL_DISPLAY, payload: response.data }))
                break;
            case 'tutor':
                response = await axios.post('http://localhost:9090/signInReg/login', { type, email, password }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                if (response.data.accessToken) {
                    localStorage.setItem('accessToken', response.data.accessToken)
                    dispatch({ type: actionTypes.TUTOR_LOGIN, payload: response.data.tutorData })
                }
                else (
                    dispatch({ type: actionTypes.MODAL_DISPLAY, payload: response.data }))
                break;
            case 'tutorsignup':
                response = await axios.post('http://localhost:9090/signInReg/register',
                    { type, email, password, firstName, lastName, dob, homeAddress, mobileNumber, moduleName, moduleCode }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

                if (response.data === 'registered') {
                    dispatch({ type: actionTypes.TUTOR_REGISTRATION, payload: response.data })
                }
                else { dispatch({ type: actionTypes.MODAL_DISPLAY, payload: response.data }) }
                break;
            case 'studentsignup':
                response = await axios.post('http://localhost:9090/signInReg/register',
                    { type, email, password, firstName, lastName, dob, homeAddress, mobileNumber },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                if (response.data === 'registered') {
                    dispatch({ type: actionTypes.STUDENT_REGISTRATION })
                }
                else (dispatch({ type: actionTypes.MODAL_DISPLAY, payload: response.data }))
                break;
        }
    }
    catch (err) { console.error(err) }
}

export const handleModalClear = () => (dispatch) => {
    dispatch({ type: actionTypes.MODAL_CLEAR })
}

export const handleSignOutAct = () => (dispatch) => {
    dispatch({ type: actionTypes.HANDLE_SIGNOUT })
}

export const handleAllQuestions = () => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get('http://localhost:9090/tutor/fecthQuestions',
            {
                headers: {
                    'Authorization': `Bearer ${myJwt}`
                }
            })
        let { allQuestions } = response.data
        if (allQuestions) dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
    }
    catch (err) { console.error(err) }
}

export const handleAddNewQuestion = (data) => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.post('http://localhost:9090/tutor/addquestion', data,
            {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
    }
    catch (err) { console.error(err) }
}

export const handleQuestionDisplay = (questionId) => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get(`http://localhost:9090/tutor/displayQuestions/${questionId}`,
            { headers: { 'Authorization': `Bearer ${myJwt}` } })
        let { allQuestions } = response.data
        dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
    } catch (err) { console.error(err) }
}

export const handleAllAmendsAct = (type, id, data) => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    switch (type) {
        case 'edit':
            try {
                let response = await axios.patch(`http://localhost:9090/tutor/editOneQuestion/${id}`, null,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
                let { allQuestions } = response.data
                dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
            }
            catch (err) { console.error(err) }
            break;
        case 'done':
            try {
                let response = await axios.post(`http://localhost:9090/tutor/editDone/${id}`, data,
                    {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                let { allQuestions } = response.data
                dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
            }
            catch (err) { console.error(err) }
            break;
        case 'cancel':
            try {
                let response = await axios.patch(`http://localhost:9090/tutor/cancelEdit/${id}`, null,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
                let { allQuestions } = response.data
                dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
            }
            catch (err) { console.error(err) }
            break;

        case 'delete':
            try {
                let response = await axios.delete(`http://localhost:9090/tutor/removeAssesment/${id}`,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
                let { allQuestions } = response.data
                dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
            }
            catch (err) { console.error(err) }
            break;
    }

}

export const handleInformationPush = (data) => async (dispatch) => {
    try {
        let myJwt = localStorage.getItem('accessToken')
        let response = await axios.post('http://localhost:9090/tutor/addInformation', data, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let { allInformations } = response.data
        dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
    } catch (err) { console.error(err) }
}

export const handleFetchAllInformation = (typeId) => async (dispatch) => {
    try {
        if (typeId === 'tutor') {
            let myJwt = localStorage.getItem('accessToken')
            let response = await axios.get('http://localhost:9090/tutor/getAllInformations', {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                }
            })
            let { allInformations } = response.data
            dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
        }
        if (typeId === 'student') {
            let myJwt = localStorage.getItem('accessToken')
            let response = await axios.get('http://localhost:9090/student/getAllInformations', {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                }
            })
            let { allInformations } = response.data
            dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
        }
    } catch (err) { console.error(err) }
}

export const handleDisplayInformation = (infoId) => async (dispatch) => {
    try {
        let myJwt = localStorage.getItem('accessToken')
        let response = await axios.patch(`http://localhost:9090/tutor/showInformation/${infoId}`, null, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
            }
        })
        let { allInformations } = response.data
        dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
    } catch (err) { console.error(err) }
}

export const handleAnnouncementChanges = (type, id, data) => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    switch (type) {
        case 'edit':
            try {
                let response = await axios.patch(`http://localhost:9090/tutor/editInformation/${id}`, null,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
                let { allInformations } = response.data
                dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
            }
            catch (err) { console.error(err) }
            break;
        case 'done':
            try {
                let response = await axios.post(`http://localhost:9090/tutor/saveInformation/${id}`, data,
                    {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                let { allInformations } = response.data
                dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
            }
            catch (err) { console.error(err) }
            break;
        case 'cancel':
            try {
                let response = await axios.patch(`http://localhost:9090/tutor/cancelInfoEdit/${id}`, null,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
                let { allInformations } = response.data
                dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
            }
            catch (err) { console.error(err) }
            break;

        case 'delete':
            try {
                let response = await axios.delete(`http://localhost:9090/tutor/removeInformation/${id}`,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
                let { allInformations } = response.data
                dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
            }
            catch (err) { console.error(err) }
            break;
    }

}

export const handleFetchAllResults = (typeId) => async (dispatch) => {
    try {
        if (typeId === 'tutor') {
            let myJwt = localStorage.getItem('accessToken')
            let response = await axios.get('http://localhost:9090/tutor/fetchResults',
                { headers: { 'Authorization': `Bearer ${myJwt}` } })
            let { allMyResults } = response.data
            dispatch({ type: actionTypes.ALL_RESULTS, payload: { allMyResults } })
        }
        if (typeId === 'student') {
            let myJwt = localStorage.getItem('accessToken')
            let response = await axios.get('http://localhost:9090/student/fetchResults',
                { headers: { 'Authorization': `Bearer ${myJwt}` } })
            let { allMyResults } = response.data

            dispatch({ type: actionTypes.ALL_RESULTS, payload: { allMyResults } })
        }
    }
    catch (err) { console.error(err) }
}

export const handlePersonalInfoFetch = (typeId) => async (dispatch) => {
    try {
        if (typeId === 'tutor') {
            let myJwt = localStorage.getItem('accessToken')
            let response = await axios.get(`http://localhost:9090/tutor/fetchpInfo`,
                { headers: { 'Authorization': `Bearer ${myJwt}` } })
            let { personalInformation } = response.data
            dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
        }
        if (typeId === 'student') {
            let myJwt = localStorage.getItem('accessToken')
            let response = await axios.get(`http://localhost:9090/student/fetchpInfo`,
                { headers: { 'Authorization': `Bearer ${myJwt}` } })
            let { personalInformation } = response.data
            dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
        }
    }
    catch (err) { console.error(err) }
}

export const handlePersonalChanges = (type, id, data, typeId) => async (dispatch) => {

    try {
        let myJwt = localStorage.getItem('accessToken')
        switch (type) {
            case 'edit':
                try {
                    if (typeId === 'tutor') {
                        let response = await axios.patch(`http://localhost:9090/tutor/editPersonalInformation`, null,
                            { headers: { 'Authorization': `Bearer ${myJwt}` } })
                        let { personalInformation } = response.data
                        dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
                    }
                    if (typeId === 'student') {
                        let response = await axios.patch(`http://localhost:9090/student/editPersonalInformation`, null,
                            { headers: { 'Authorization': `Bearer ${myJwt}` } })
                        let { personalInformation } = response.data
                        dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
                    }
                }
                catch (err) { console.error(err) }
                break;
            case 'done':
                try {
                    if (typeId === 'tutor') {
                        let response = await axios.post(`http://localhost:9090/tutor/savePersonalInformation`, data,
                            {
                                headers: {
                                    'Authorization': `Bearer ${myJwt}`,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            })
                        let { personalInformation } = response.data
                        dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
                    }
                    if (typeId === 'student') {
                        let response = await axios.post(`http://localhost:9090/student/savePersonalInformation`, data,
                            {
                                headers: {
                                    'Authorization': `Bearer ${myJwt}`,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            })
                        let { personalInformation } = response.data
                        dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
                    }
                }
                catch (err) { console.error(err) }
                break;
            case 'cancel':
                try {
                    if (typeId === 'tutor') {
                        let response = await axios.patch(`http://localhost:9090/tutor/cancelPersonalEdit`, null,
                            { headers: { 'Authorization': `Bearer ${myJwt}` } })
                        let { personalInformation } = response.data
                        dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
                    }
                    if (typeId === 'student') {
                        let response = await axios.patch(`http://localhost:9090/student/cancelPersonalEdit`, null,
                            { headers: { 'Authorization': `Bearer ${myJwt}` } })
                        let { personalInformation } = response.data
                        dispatch({ type: actionTypes.PERSONAL_INFO, payload: { personalInformation } })
                    }
                }
                catch (err) { console.error(err) }
                break;
        }
    }
    catch (err) { console.error(err) }
}

export const handleMyAllModules = () => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get('http://localhost:9090/student/fecthMyModules', {
            headers: { 'Authorization': `Bearer ${myJwt}` }
        })
        let { allMyModules } = response.data
        let { allModules } = response.data
        if (allMyModules) return dispatch({ type: actionTypes.ALL_MYMODULES, payload: { allMyModules } })
        else if (allModules) return dispatch({ type: actionTypes.ALL_MODULES, payload: { allModules } })
    }
    catch (err) { console.error(err) }
}

export const handleSelectModules = (data) => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.post(`http://localhost:9090/student/selectedModule`, { data }, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let { allMyModules } = response.data
        if (allMyModules) return dispatch({ type: actionTypes.ALL_MYMODULES, payload: { allMyModules } })

    }
    catch (err) { console.error(err) }
}

export const handlePullModuleData = (moduleId) => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get(`http://localhost:9090/student/pullModuleData/${moduleId}`, {
            headers: { 'Authorization': `Bearer ${myJwt}` }
        })
        let { allQuestions, allInformations } = response.data
        if (allQuestions || allInformations) {
            dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
            dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
        }

    }
    catch (err) { console.error(err) }
}

export const handlePullAssesment = (questionId) => async (dispatch) => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get(`http://localhost:9090/student/pullAssesment/${questionId}`, {
            headers: { 'Authorization': `Bearer ${myJwt}` }
        })
        let { myAssessment } = response.data
        if (myAssessment) {
            dispatch({ type: actionTypes.MY_ASSESSMENT, payload: { myAssessment } })
        }

    }
    catch (err) { console.error(err) }
}

export const handlePushStudentGrade = (studentGrade) => async () => {
    let myJwt = localStorage.getItem('accessToken')
    try {
        await axios.post(`http://localhost:9090/student/pushStudentAnswer`, { studentGrade }, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
    catch (err) { console.error(err) }
}

export const handleShowResults = (type, id) => async (dispatch) => {
    try {
        let myJwt = localStorage.getItem('accessToken')
        if (type === 'display' || type === 'undisplay') {
            let response = await axios.patch(`http://localhost:9090/tutor/displayResults/${id}`, null
                , { headers: { 'Authorization': `Bearer ${myJwt}` } })
            let { allMyResults } = response.data
            dispatch({ type: actionTypes.ALL_RESULTS, payload: { allMyResults } })
        }
        if (type === 'show') {
            let response = await axios.patch(`http://localhost:9090/tutor/showResults/${id}`, null
                , { headers: { 'Authorization': `Bearer ${myJwt}` } })
            let { allMyResults } = response.data
            dispatch({ type: actionTypes.ALL_RESULTS, payload: { allMyResults } })
        }
        if (type === 'displayInfo' || type === '!displayInfo') {
            let response = await axios.patch(`http://localhost:9090/tutor/displayInfo/${id}`, { type }
                , {
                    headers: {
                        'Authorization': `Bearer ${myJwt}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            let { allInformations } = response.data
            dispatch({ type: actionTypes.ALL_INFORMATIONS, payload: { allInformations } })
        }
        if (type === 'displayAssessment' || type === '!displayAssessment') {
            let response = await axios.patch(`http://localhost:9090/tutor/displayAssessment/${id}`, { type }
                , {
                    headers: {
                        'Authorization': `Bearer ${myJwt}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            let { allQuestions } = response.data
            dispatch({ type: actionTypes.ALL_QUESTIONS, payload: { allQuestions } })
        }

    } catch (err) { console.error(err) }
}

export const handleCountdown = (assessmentId) => async (dispatch) => {
    try {
        let response = await axios.get(`http://localhost:9090/student/countdown/${assessmentId}`)
        let { duration } = response.data
        dispatch({ type: actionTypes.MY_ASSESSMENT, payload: { duration } })
    } catch (err) { console.error(err) }
}



