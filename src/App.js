import React, { useState, useEffect, useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './TheSchoolApp/HomePage';
import TutorPage from './TheSchoolApp/TutorPage';
import StudentPage from './TheSchoolApp/StudentPage';
import CourseDeets from './TheSchoolApp/CourseDeets';
import Admin from './TheSchoolApp/Admin';
import Test from './TheSchoolApp/Test';
import SetQuest from './TheSchoolApp/SetQuest';
import SendUpdate from './TheSchoolApp/SendUpdate';
import Results from './TheSchoolApp/Results';
import myReducer, { portalData } from './TheSchoolApp/reducer';
import GuestPage from './TheSchoolApp/GuestPage';
import OpenDay from './TheSchoolApp/OpenDay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const App = () => {
  // let [module, setModules] = useState(() => {
  //   let localStorageportal = localStorage.getItem('portal');
  //   if (localStorageportal) {
  //     let parsedPortal = JSON.parse(localStorageportal);
  //     return parsedPortal;
  //   }
  //   return [];
  // });

  let [schPortal, dispatchPortal] = useReducer(myReducer, portalData)
  let [boo, setBoo] = useState(false)

  const funcBoo = getBoo => {
    setBoo(getBoo)
  }

  const addMod = data => {
    let { moduleName, moduleCode, allQuest, infos, results } = data
    if (moduleName !== '' && moduleCode !== '') {
      dispatchPortal({ type: 'ADD_MODULE', payload: { moduleName, moduleCode, allQuest, infos, results } })
    }
    console.log(data)
  }

  const addQuest = (values) => {
    dispatchPortal({ type: 'ADD_QUESTION', payload: values })
  }

  const deleteBtn = (id, index) => {
    dispatchPortal({ type: "DELETE_QUEST", payload: { id, index } })
  }

  const studentAnswer = (e, index, id) => {
    dispatchPortal({ type: "ANSWER_UPDATE", payload: { e, index, id } })
  }

  const addInfos = getInfos => {
    let { post, id } = getInfos
    dispatchPortal({ type: "ADD_INFOS", payload: { post, id } })
  }

  const delInfo = (index, moduleId) => {
    dispatchPortal({ type: "DELETE_INFOS", payload: { index, moduleId } })
  }

  const addScore = (id1, finalScore, id) => {
    dispatchPortal({ type: "ADD_SCORE", payload: { id1, finalScore, id } })
  }

  const addStudent = (stuDeets) => {
    let { studentCode, studentPass } = stuDeets
    dispatchPortal({ type: "ADD_STUDENT", payload: { studentCode, studentPass } })
  }

  const sendQuestions = (id) => {
    dispatchPortal({ type: "SEND_QUESTION", payload: { id } })

  }

  const sendInfo = (id) => {
    dispatchPortal({ type: "SEND_INFOS", payload: { id } })

  }

  const deleteQuests = (id) => {
    dispatchPortal({ type: "DELETE_TEST", payload: { id } })
  }

  const deleteInfos = (id) => {
    dispatchPortal({ type: "DELETE_INFOS", payload: { id } })
  }

  const addTime = (e) => {
    dispatchPortal({ type: "ADD_TIME", payload: { e } })

  }

  return (
    <>
      <Routes>
        <Route path='/*' element={<HomePage schPortal={schPortal} funcBoo={funcBoo} />} />
        <Route path='/tutor/:id' element={<TutorPage schPortal={schPortal} />} />
        <Route path='/student/:id' element={<StudentPage schPortal={schPortal} />} />
        <Route path='/courseDeets/:id' element={<CourseDeets module={module} />} />
        <Route path='/admin' element={<Admin schPortal={schPortal} addMod={addMod} boo={boo} addStudent={addStudent} />} />
        <Route path='/test/:id/:id1' element={<Test schPortal={schPortal} studentAnswer={studentAnswer} addScore={addScore} />} />
        <Route path='/questions/:id' element={<SetQuest addQuest={addQuest} schPortal={schPortal} deleteBtn={deleteBtn} sendQuestions={sendQuestions} deleteQuests={deleteQuests} addTime={addTime} />} />
        <Route path='/update/:id' element={<SendUpdate schPortal={schPortal} addInfos={addInfos} delInfo={delInfo} sendInfo={sendInfo} deleteInfos={deleteInfos} />} />
        <Route path='/results/:id' element={<Results schPortal={schPortal} />} />
        <Route path='/guest' element={<GuestPage />} />
        <Route path='/openday' element={<OpenDay />} />
      </Routes>
    </>
  )
}

export default App;