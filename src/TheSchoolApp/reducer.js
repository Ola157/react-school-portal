const myReducer = (state, action) => {
    if (action.type === "ADD_MODULE") {
        let a = {
            ...state,
            moduleArray: [...state.moduleArray, action.payload]
        }
        return a
    }

    if (action.type === "ADD_STUDENT") {
        let { studentCode, studentPass } = action.payload
        let a = {
            ...state,
            studentArray: [...state.studentArray, { studentCode, studentPass }]
        }
        console.log(a)
        return a
    }

    if (action.type === 'ADD_QUESTION') {
        let a = {
            ...state,
            moduleArray: state.moduleArray.map((mod) =>
                action.payload.id == mod.moduleName ?
                    {
                        ...mod,
                        allQuest: [...mod.allQuest, action.payload]
                    }
                    : mod
            )
        }
        return a
    }

    if (action.type === "DELETE_QUEST") {
        let { id, index } = action.payload

        let a = {
            ...state,
            moduleArray: state.moduleArray.map((mod) =>
                mod.moduleName === id ?
                    ({
                        ...mod,
                        allQuest: mod.allQuest.filter((b, i) =>
                            i !== index)
                    })
                    : mod)
        }
        return a
    }

    if (action.type === "ANSWER_UPDATE") {
        let { e, index, id } = action.payload

        let a = {
            ...state,
            moduleArray: state.moduleArray.map((mod) => mod.moduleName === id ?
                ({
                    ...mod,
                    allQuest: mod.allQuest.map((b, i) =>
                        i === index ? ({
                            ...b,
                            studentAnswer: b.studentAnswer = e
                        })
                            : b)
                })
                : mod)
        }
        return a
    }

    if (action.type === "ADD_INFOS") {
        let { post, id } = action.payload

        let a = {
            ...state,
            moduleArray: state.moduleArray.filter((mod) =>
                mod.moduleName === id).map((mod) =>
                ({
                    ...mod,
                    infos: [...mod.infos, action.payload]
                }))
        }
        return a
    }

    if (action.type === "DELETE_INFOS") {
        let { index, moduleId } = action.payload

        let a = {
            ...state,
            moduleArray: state.moduleArray.filter((mod) => mod.moduleName === moduleId)
                .map((mod, i) => ({
                    ...mod,
                    infos: mod.infos.filter((a, i) => i !== index)
                }))
        }
        return a
    }

    if (action.type === "ADD_SCORE") {
        let { id1, finalScore, id } = action.payload
        let b = state.moduleArray.find((a) => a.moduleName === id && a.results)
        b = b.results.find((a) => id1 === a.id1)
        let a = {
            ...state,
            moduleArray: state.moduleArray
                .filter((mod) => mod.moduleName === id)
                .map((mod) => !b ? (
                    {
                        ...mod,
                        results: [...mod.results, { id1, finalScore }]
                    }
                ) : mod)
        }

        return a
    }

    if (action.type === "SEND_QUESTION") {
        let { id } = action.payload
        let b = state.moduleArray.find((mod) => mod.allQuest.length > 0)
        console.log(b)
        let a = {
            ...state,
            questionsArray: b.allQuest
        }
        return a
    }
    if (action.type === "DELETE_TEST") {
        let { id } = action.payload
        let a = {
            ...state,
            questionsArray: state.questionsArray.filter((mod) => id !== mod.id)
        }

        a = {
            ...state,
            moduleArray: state.moduleArray.map((mod) => (
                {
                    ...mod,
                    allQuest: mod.allQuest.filter((a) => !a)
                }
            ))
        }
        return a
    }

    if (action.type === "SEND_INFOS") {
        let { id } = action.payload
        let b = state.moduleArray.find((mod) => mod.infos.length > 0)

        let a = {
            ...state,
            informationsArray: b.infos
        }
        return a
    }

    if (action.type === "DELETE_INFOS") {
        let { id } = action.payload
        let a = {
            ...state,
            informationsArray: state.informationsArray.filter((mod) => id !== mod.id)
        }
        a = {
            ...state,
            moduleArray: state.moduleArray.map((mod) => (
                {
                    ...mod,
                    infos: mod.infos.filter((a) => !a)
                }
            ))
        }

        return a
    }

    if (action.type === "ADD_TIME") {
        let { e } = action.payload
        let a = {
            ...state,
            time: e
        }
        return a
    }
    return state;
}

export let portalData = {
    studentArray: '',
    moduleArray: '',
    questionsArray: '',
    informationsArray: '',
    time: ''
}

export default myReducer;
