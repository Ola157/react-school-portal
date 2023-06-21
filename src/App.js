import React, { useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './TheSchoolApp/HomePage';
import TutorPage from './TheSchoolApp/TutorPage';
import StudentPage from './TheSchoolApp/StudentPage';
import Admin from './TheSchoolApp/Admin';
import Test from './TheSchoolApp/Test';
import SetQuest from './TheSchoolApp/SetQuest';
import SendUpdate from './TheSchoolApp/SendUpdate';
import Results from './TheSchoolApp/Results';
import myReducer, { portalData } from './TheSchoolApp/reducer';
import GuestPage from './TheSchoolApp/GuestPage';
import OpenDay from './TheSchoolApp/OpenDay';
import './App.css';
import ModuleQuestions from './TheSchoolApp/ModuleQuestions';
import StaffPersonalInfo from './TheSchoolApp/StaffPersonalInfo';
import MyModules from './TheSchoolApp/MyModules';
import ModuleDeets from './TheSchoolApp/ModuleDeets';
import News from './TheSchoolApp/News';
import Grades from './TheSchoolApp/Grades';
import StudentPersonalInfo from './TheSchoolApp/StudentPersonalInfo';



const App = () => {


  let [schPortal, dispatchPortal] = useReducer(myReducer, portalData)

  const addStaff = (first, sec, firstName, lastName, dob, homeAddress) => {
    dispatchPortal({ type: 'ADD_STAFF', payload: { moduleId: first, moduleCode: sec, firstName, lastName, dob, homeAddress } })
  }

  const addStudent = (first, sec, firstName, lastName, dob, homeAddress) => {
    dispatchPortal({ type: "ADD_STUDENT", payload: { studentId: first, studentCode: sec, firstName, lastName, dob, homeAddress } })
  }
  const addQuestion = (moduleId, question, optionA, optionB, optionC, optionD, answer, studentAnswer, display, edit) => {
    dispatchPortal({ type: 'ADD_QUESTION', payload: { moduleId, question, optionA, optionB, optionC, optionD, answer, studentAnswer, display, edit } })
  }

  const editQuestion = (value) => {
    dispatchPortal({ type: "EDIT_QUESTION", payload: value })
  }

  const delQuestion = (index, moduleId) => {
    dispatchPortal({ type: "DEL_QUESTION", payload: { index, moduleId } })
  }

  const addEdited = (index, moduleId, question, optionA, optionB, optionC, optionD, answer) => {
    dispatchPortal({ type: "ADD_EDITED", payload: { index, moduleId, question, optionA, optionB, optionC, optionD, answer } })
  }

  const handleTime = (moduleId, time) => {
    dispatchPortal({ type: "ADD_TIME", payload: { moduleId, time } })
  }

  const displayControl = (value) => {
    dispatchPortal({ type: "DISPLAY_CONTROL", payload: value })
  }

  const addInfos = (post, moduleId, display) => {
    dispatchPortal({ type: "ADD_INFOS", payload: { post, moduleId, display } })
  }

  const deleteInfos = (index, moduleId) => {
    dispatchPortal({ type: "DELETE_INFOS", payload: { index, moduleId } })
  }

  const addPersonalInfo = (value) => {
    dispatchPortal({ type: "ADD_PINFO", payload: value })
  }

  const handleAnswer = (answer, index, moduleId) => {
    dispatchPortal({ type: "ANSWER_UPDATE", payload: { answer, index, moduleId } })
  }

  const addScore = (moduleId, studentId, finalScore, display) => {
    dispatchPortal({ type: "ADD_SCORE", payload: { moduleId, studentId, finalScore, display } })
  }

  return (
    <>
      <Routes>
        <Route path='/*' element={<HomePage schPortal={schPortal} />} />
        <Route path='/staff/:moduleId' element={<TutorPage schPortal={schPortal} />} />
        <Route path='/student/:studentId' element={<StudentPage schPortal={schPortal} />} />
        <Route path='/admin/:id' element={<Admin schPortal={schPortal} addStaff={addStaff} addStudent={addStudent} />} />
        <Route path='/test/:moduleId/:studentId' element={<Test schPortal={schPortal} handleAnswer={handleAnswer} addScore={addScore} />} />
        <Route path='/questions/:moduleId' element={<SetQuest addQuestion={addQuestion} schPortal={schPortal} />} />
        <Route path='/modulequestions/:moduleId' element={<ModuleQuestions handleTime={handleTime} editQuestion={editQuestion} delQuestion={delQuestion} schPortal={schPortal} addEdited={addEdited} displayControl={displayControl} />} />
        <Route path='/announcement/:moduleId' element={<SendUpdate schPortal={schPortal} addInfos={addInfos} deleteInfos={deleteInfos} displayControl={displayControl} />} />
        <Route path='/results/:moduleId' element={<Results schPortal={schPortal} displayControl={displayControl} />} />
        <Route path='staffpInfo/:moduleId' element={<StaffPersonalInfo schPortal={schPortal} addPersonalInfo={addPersonalInfo} />} />
        <Route path='studentpInfo/:studentId' element={<StudentPersonalInfo schPortal={schPortal} addPersonalInfo={addPersonalInfo} />} />
        <Route path='modules/:studentId' element={<MyModules schPortal={schPortal} />} />
        <Route path='fullmode/:moduleId/:studentId' element={<ModuleDeets schPortal={schPortal} />} />
        <Route path='news/:studentId' element={<News schPortal={schPortal} />} />
        <Route path='grades/:studentId' element={<Grades schPortal={schPortal} />} />
        <Route path='/guest' element={<GuestPage />} />
        <Route path='/openday' element={<OpenDay />} />
      </Routes>
    </>
  )
}

export default App;