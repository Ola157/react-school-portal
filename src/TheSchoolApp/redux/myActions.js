import axios from "axios"

const actionTypes = {
    IS_LOGGED: "IS_LOGGED",
    IS_REGISTERED: "IS_REGISTERED",
    MESSAGE: "MESSAGE",
    ERROR: "ERROR",
    MODULE_INFORMATION: 'MODULE_INFORMATION',
    ASSESSMENTS: "ASSESSMENTS",
    MODAL_CLEAR: "MODAL_CLEAR",
    SIGNOUT: "SIGNOUT",
    INFORMATIONS: "INFORMATIONS",
    GRADES: "GRADES",
    BIO_DATA: 'BIO_DATA',
    MODULES: "MODULES",
    TEST: 'TEST'
}

export const authenticationHandler = (data) => async (dispatch) => {
    let { path, email, password, firstName, lastName, dob, homeAddress, mobileNumber, moduleName, moduleCode } = data
    try {
        let response;
        switch (path) {
            case 'student':
                response = await axios.post('https://react-school-back-end.vercel.app/authentication/signIn/student',
                    { email, password }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                break;
            case 'tutor':
                response = await axios.post('https://react-school-back-end.vercel.app/authentication/signIn/tutor',
                    // response = await axios.post('http://localhost:9090/authentication/signIn/tutor',

                    { email, password }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                break;

            case 'tutorsignup':
                response = await axios.post('https://react-school-back-end.vercel.app/authentication/register/tutor',
                    // response = await axios.post('http://localhost:9090/authentication/register/tutor',
                    { email, password, firstName, lastName, dob, homeAddress, mobileNumber, moduleName, moduleCode }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                break;
            case 'studentsignup':
                response = await axios.post('https://react-school-back-end.vercel.app/authentication/register/student',
                    { email, password, firstName, lastName, dob, homeAddress, mobileNumber },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                break;
        }

        const { accessToken, message, error } = response.data
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
            return dispatch({ type: actionTypes.IS_LOGGED })
        }
        else if (message) {
            dispatch({ type: actionTypes.MESSAGE, payload: { message } })
            dispatch({ type: actionTypes.IS_REGISTERED })
            setTimeout(() => {
                dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } })
            }, 2000)

        } else if (error) {
            dispatch({ type: actionTypes.ERROR, payload: { error } })
            setTimeout(() => {
                dispatch({ type: actionTypes.ERROR, payload: { error: '' } })
            }, 2000)
        }
    }
    catch (err) { console.error(err) }
}

export const getModuleInfo = (type) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get(`https://react-school-back-end.vercel.app/tutor/moduleInformation`,
            { headers: { 'Authorization': `Bearer ${myJwt}` } })
        let { moduleInformation } = response.data
        dispatch({ type: actionTypes.MODULE_INFORMATION, payload: { moduleInformation } })
    }
    catch (err) { console.error(err) }
}

export const getAssessment = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get('https://react-school-back-end.vercel.app/tutor/getAssessments', {
            // const response = await axios.get('http://localhost:9090/tutor/getAssessments', {
            headers: { 'Authorization': `Bearer ${myJwt}` }
        });

        const { assessments } = response.data
        dispatch({ type: actionTypes.ASSESSMENTS, payload: { assessments } })
    }
    catch (err) { console.error(err) }
}

export const addAssessment = (data) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        const response = await axios.post('https://react-school-back-end.vercel.app/tutor/addAssessment', data,
            // const response = await axios.post('http://localhost:9090/tutor/addAssessment', data,

            {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        const { assessments } = response.data
        dispatch({ type: actionTypes.ASSESSMENTS, payload: { assessments } })
    }
    catch (err) { console.error(err) }
}

export const assessmentChanges = (getdata) => async (dispatch) => {
    const { type, id, data } = getdata

    const myJwt = localStorage.getItem('accessToken')
    let response;
    switch (type) {
        case 'edit':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/editQuestion/${id}`, null,
                    // await axios.patch(`http://localhost:9090/tutor/editQuestion/${id}`, null,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })

            }
            catch (err) { console.error(err) }
            break;
        case 'save':
            try {
                response = await axios.post(`https://react-school-back-end.vercel.app/tutor/saveQuestionChanges/${id}`, data,
                    // await axios.post(`http://localhost:9090/tutor/saveQuestionChanges/${id}`, data,

                    {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
            }
            catch (err) { console.error(err) }
            break;
        case 'cancel':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/cancelQuestionChanges/${id}`, null,
                    // await axios.patch(`http://localhost:9090/tutor/cancelQuestionChanges/${id}`, null,

                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
            }
            catch (err) { console.error(err) }
            break;

        case 'delete':
            try {
                response = await axios.delete(`https://react-school-back-end.vercel.app/tutor/deleteQuestion/${id}`,
                    // await axios.delete(`http://localhost:9090/tutor/deleteQuestion/${id}`,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })

            }
            catch (err) { console.error(err) }
            break;
    }

    let { assessments } = response.data
    dispatch({ type: actionTypes.ASSESSMENTS, payload: { assessments } })
}

export const sendAssessment = (type, assessmentId) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')

    try {
        const response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/sendAssessment/${assessmentId}`, { type },
            // const response = await axios.patch(`http://localhost:9090/tutor/sendAssessment/${assessmentId}`, { type },

            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${myJwt}`
                }
            })
        const { assessments } = response.data
        dispatch({ type: actionTypes.ASSESSMENTS, payload: { assessments } })
    }
    catch (err) { console.error(err) }

}

export const deleteAssessment = (assessmentId) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')

    try {
        const response = await axios.delete(`https://react-school-back-end.vercel.app/tutor/deleteAssessment/${assessmentId}`,
            { headers: { 'Authorization': `Bearer ${myJwt}` } })

        const { assessments } = response.data
        dispatch({ type: actionTypes.ASSESSMENTS, payload: { assessments } })
    }
    catch (err) { console.error(err) }
}

export const getTutorInformations = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get('https://react-school-back-end.vercel.app/tutor/getInformations', {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
            }
        })
        const { informations } = response.data
        dispatch({ type: actionTypes.INFORMATIONS, payload: { informations } })
    } catch (err) { console.error(err) }
}

export const informationChanges = (getData) => async (dispatch) => {
    const { type, id, data } = getData
    const myJwt = localStorage.getItem('accessToken')

    let response;

    switch (type) {
        case 'edit':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/editInformation/${id}`, null
                    , {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                        }
                    })
            }
            catch (err) { console.error(err) }
            break;

        case 'save':
            try {
                response = await axios.post(`https://react-school-back-end.vercel.app/tutor/saveInformation/${id}`, data,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${myJwt}`
                        }
                    })
            }
            catch (err) { console.error(err) }
            break;

        case 'cancel':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/cancelInfoChanges/${id}`, null
                    ,
                    {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`
                        }
                    })
            }
            catch (err) { console.error(err) }
            break;

        case 'delete':
            try {
                response = await axios.delete(`https://react-school-back-end.vercel.app/tutor/deleteInformation/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`
                        }
                    })
            }
            catch (err) { console.error(err) }
            break;
    }

    let { informations } = response.data
    dispatch({ type: actionTypes.INFORMATIONS, payload: { informations } })

}

export const addInformation = (data) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        const response = await axios.post('https://react-school-back-end.vercel.app/tutor/addInformation', data, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const { informations } = response.data
        dispatch({ type: actionTypes.INFORMATIONS, payload: { informations } })
    } catch (err) { console.error(err) }
}

export const sendInformation = (type, infoId) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')

    try {
        const response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/sendInformation/${infoId}`, { type }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${myJwt}`,
            }
        })

        const { informations } = response.data
        dispatch({ type: actionTypes.INFORMATIONS, payload: { informations } })
    } catch (err) { console.error(err) }
}

export const getTutorGrades = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        const response = await axios.get('https://react-school-back-end.vercel.app/tutor/getGrades',
            // const response = await axios.get('http://localhost:9090/tutor/getGrades',

            { headers: { 'Authorization': `Bearer ${myJwt}` } })
        const { grades } = response.data

        dispatch({ type: actionTypes.GRADES, payload: { grades } })
    }
    catch (err) { console.error(err) }
}

export const sendStatus = (type, id) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')

    try {
        const response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/sendStatus/${id}`, { type }
            // await axios.patch(`http://localhost:9090/tutor/sendStatus/${id}`, { type }
            , {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

        const { grades } = response.data

        dispatch({ type: actionTypes.GRADES, payload: { grades } })

    } catch (err) { console.error(err) }
}

export const getTutorBioData = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')

    try {
        const response = await axios.get(`https://react-school-back-end.vercel.app/tutor/getBioData/`
            , { headers: { 'Authorization': `Bearer ${myJwt}` } })

        const { bioData } = response.data
        dispatch({ type: actionTypes.BIO_DATA, payload: { bioData } })

    } catch (err) { console.error(err) }
}

export const tutorBioChanges = (type, data) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    let response;
    switch (type) {
        case 'edit':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/editBio`, null,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })

            }
            catch (err) { console.error(err) }
            break;
        case 'save':
            try {
                response = await axios.post(`https://react-school-back-end.vercel.app/tutor/saveBioChanges`, data,

                    {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
            }
            catch (err) { console.error(err) }
            break;
        case 'cancel':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/tutor/cancelBioChanges`, null,

                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
            }
            catch (err) { console.error(err) }
            break;
    }

    const { bioData } = response.data
    dispatch({ type: actionTypes.BIO_DATA, payload: { bioData } })
}



export const getStudentBioData = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        const response = await axios.get(`https://react-school-back-end.vercel.app/student/getbiodata`,
            // const response = await axios.get(`http://localhost:9090/student/getbiodata`,
            { headers: { 'Authorization': `Bearer ${myJwt}` } })
        const { bioData } = response.data
        dispatch({ type: actionTypes.BIO_DATA, payload: { bioData } })
    } catch (err) { console.error(err) }
}

export const getModules = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        const response = await axios.get('https://react-school-back-end.vercel.app/student/getmodules',
            // const response = await axios.get('http://localhost:9090/student/getmodules',
            { headers: { 'Authorization': `Bearer ${myJwt}` } })

        const { modules } = response.data
        dispatch({ type: actionTypes.MODULES, payload: { modules } })
    }
    catch (err) { console.error(err) }
}

export const getStudentModules = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        const response = await axios.get('https://react-school-back-end.vercel.app/student/getstudentmodules',
            // const response = await axios.get('http://localhost:9090/student/getstudentmodules',
            { headers: { 'Authorization': `Bearer ${myJwt}` } })

        const { modules } = response.data
        dispatch({ type: actionTypes.MODULES, payload: { modules } })
    }
    catch (err) { console.error(err) }
}


export const getStudentGrades = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')

    try {
        const response = await axios.get('https://react-school-back-end.vercel.app/student/getGrades',
            // const response = await axios.get('http://localhost:9090/student/getGrades',

            { headers: { 'Authorization': `Bearer ${myJwt}` } })
        const { grades } = response.data
        dispatch({ type: actionTypes.GRADES, payload: { grades } })
    }
    catch (err) { console.error(err) }
}


export const getStudentInformations = () => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get('https://react-school-back-end.vercel.app/student/getInformations', {
            // let response = await axios.get('http://localhost:9090/student/getInformations', {

            headers: {
                'Authorization': `Bearer ${myJwt}`,
            }
        })
        const { informations } = response.data
        dispatch({ type: actionTypes.INFORMATIONS, payload: { informations } })
    } catch (err) { console.error(err) }
}

export const studentBioChanges = (type, data) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    let response
    switch (type) {
        case 'edit':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/student/editBio`, null,
                    { headers: { 'Authorization': `Bearer ${myJwt}` } })

            }
            catch (err) { console.error(err) }
            break;
        case 'save':
            try {
                response = await axios.post(`https://react-school-back-end.vercel.app/student/saveBioChanges`, data,

                    {
                        headers: {
                            'Authorization': `Bearer ${myJwt}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
            }
            catch (err) { console.error(err) }
            break;
        case 'cancel':
            try {
                response = await axios.patch(`https://react-school-back-end.vercel.app/student/cancelBioChanges`, null,

                    { headers: { 'Authorization': `Bearer ${myJwt}` } })
            }
            catch (err) { console.error(err) }
            break;
    }

    const { bioData } = response.data
    dispatch({ type: actionTypes.BIO_DATA, payload: { bioData } })
}

export const chooseModules = (data) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.post(`https://react-school-back-end.vercel.app/student/chooseModules`, { data }, {
            // let response = await axios.post(`http://localhost:9090/student/chooseModules`, { data }, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const { modules } = response.data
        dispatch({ type: actionTypes.MODULES, payload: { modules } })
    }
    catch (err) { console.error(err) }
}

export const getModuleData = (moduleId) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        let response = await axios.get(`https://react-school-back-end.vercel.app/student/getModuleData/${moduleId}`, {
            headers: { 'Authorization': `Bearer ${myJwt}` }
        })
        let { assessments, informations } = response.data
        dispatch({ type: actionTypes.ASSESSMENTS, payload: { assessments } })
        dispatch({ type: actionTypes.INFORMATIONS, payload: { informations } })
    }
    catch (err) { console.error(err) }
}

export const getAssesment = (assessmentId) => async (dispatch) => {
    const myJwt = localStorage.getItem('accessToken')

    try {
        let response = await axios.get(`https://react-school-back-end.vercel.app/student/getAssessment/${assessmentId}`, {
            headers: { 'Authorization': `Bearer ${myJwt}` }
        })
        let { test } = response.data
        dispatch({ type: actionTypes.TEST, payload: { test } })
    }
    catch (err) { console.error(err) }
}

export const pushGrade = (studentGrade) => async () => {
    const myJwt = localStorage.getItem('accessToken')
    try {
        await axios.post(`https://react-school-back-end.vercel.app/student/pushgrade`, { studentGrade }, {
            // await axios.post(`http://localhost:9090/student/pushgrade`, { studentGrade }, {

            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
    catch (err) { console.error(err) }
}


export const signOut = () => (dispatch) => {
    dispatch({ type: actionTypes.SIGNOUT })
}




