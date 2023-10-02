import React, { useReducer } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './TheSchoolApp/HomePage';
import UserHomePage from './TheSchoolApp/UserHomePage';
import Admin from './TheSchoolApp/Admin';
import Test from './TheSchoolApp/Test';
import AllQuestions from './TheSchoolApp/CreateAssesment';
import AnnouncementsPage from './TheSchoolApp/Announcements';
import Results from './TheSchoolApp/Results';
import GuestPage from './TheSchoolApp/GuestPage';
import './App.css';
import ModuleQuestions from './TheSchoolApp/ModuleQuestions';
import PersonalInformation from './TheSchoolApp/PersonalInformation';
import MyModules from './TheSchoolApp/MyModules';
import ModuleDeets from './TheSchoolApp/ModuleDeets';
import { useDispatch } from 'react-redux';
import { handleAddNewQuestion, handleAllAmendsAct, handleAllQuestions, handleAnnouncementChanges, handleCountdown, handleDisplayInformation, handleFetchAllInformation, handleFetchAllResults, handleInformationPush, handleModalClear, handleMyAllModules, handlePersonalChanges, handlePersonalInfoFetch, handlePullAssesment, handlePullModuleData, handlePushStudentGrade, handleQuestionDisplay, handleRegistration, handleSelectModules, handleShowResults, handleSignOutAct, handleStdAttempt } from './TheSchoolApp/redux/myActions';

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handle_login_signup = (data) => {
    dispatch(handleRegistration(data))
  }

  const handleModal = () => {
    dispatch(handleModalClear())
  }

  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    navigate('/')
    dispatch(handleSignOutAct())
  }

  const handleFetchQuestions = () => {
    dispatch(handleAllQuestions())
  }

  const handleAddAllQuestion = (data) => {
    dispatch(handleAddNewQuestion(data))
  }

  const handleShowQuestion = (id) => {
    dispatch(handleQuestionDisplay(id))
  }

  const handle_Add_Information = (data) => {
    dispatch(handleInformationPush(data))
  }

  const handleFetchInformations = (typeId) => {
    dispatch(handleFetchAllInformation(typeId))
  }

  const handleAllChanges = (alldata) => {
    let { origin, type, id, data, typeId } = alldata
    switch (origin) {
      case "personalInformation":
        dispatch(handlePersonalChanges(type, id, data, typeId))
        break;
      case "AnnouncementPage":
        dispatch(handleAnnouncementChanges(type, id, data))
        break;
      case "moduleQuestions":
        dispatch(handleAllAmendsAct(type, id, data))
        break;
    }
  }

  const handleFetchResults = (typeId) => {
    dispatch(handleFetchAllResults(typeId))
  }

  const handlePersonalInformation = (typeId) => {
    dispatch(handlePersonalInfoFetch(typeId))
  }

  const handleFetchMyModules = () => {
    dispatch(handleMyAllModules())
  }
  const handleSelectMyModules = (data) => {
    dispatch(handleSelectModules(data))
  }

  const handleFetchModuleData = (moduleId) => {
    dispatch(handlePullModuleData(moduleId))
  }

  const handleFetchAssesment = (questionId) => {
    dispatch(handlePullAssesment(questionId))
  }

  const handlePushStdGrade = (studentGrade) => {
    dispatch(handlePushStudentGrade(studentGrade))
  }

  const handleDisplay = (type, id) => {
    dispatch(handleShowResults(type, id))
  }

  const handleTimeDown = (assessmentId) => {
    dispatch(handleCountdown(assessmentId))
  }

  return (
    <>
      <Routes>
        <Route path='/*' element={<HomePage />} />
        <Route path='/userhomepage/:type' element={<UserHomePage handleSignOut={handleSignOut} handlePersonalInformation={handlePersonalInformation} />} />
        <Route path='/admin/:id' element={<Admin handle_login_signup={handle_login_signup} handleModal={handleModal} />} />
        <Route path='/assesment/:questionId' element={<Test handleSignOut={handleSignOut} handleTimeDown={handleTimeDown} handleFetchAssesment={handleFetchAssesment} handlePushStdGrade={handlePushStdGrade} />} />
        <Route path='/questions/:type' element={<AllQuestions handleAddAllQuestion={handleAddAllQuestion} />} />
        <Route path='/allAssesment/:type' element={<ModuleQuestions handleFetchQuestions={handleFetchQuestions} handleDisplay={handleDisplay} handleShowQuestion={handleShowQuestion} handleAllChanges={handleAllChanges} />} />
        <Route path='/announcement/:typeId' element={<AnnouncementsPage handleSignOut={handleSignOut} handleDisplay={handleDisplay} handle_Add_Information={handle_Add_Information} handleAllChanges={handleAllChanges} handleFetchInformations={handleFetchInformations} />} />
        <Route path='/grades/:typeId' element={<Results handleSignOut={handleSignOut} handleFetchResults={handleFetchResults} handleDisplay={handleDisplay} />} />
        <Route path='/PersonalInformation/:typeId' element={<PersonalInformation handleSignOut={handleSignOut} handlePersonalInformation={handlePersonalInformation} handleAllChanges={handleAllChanges} />} />
        <Route path='/modules/:type' element={<MyModules handleFetchMyModules={handleFetchMyModules} handleSelectMyModules={handleSelectMyModules} />} />
        <Route path='/moduleDetails/:moduleId' element={<ModuleDeets handleFetchModuleData={handleFetchModuleData} />} />
        <Route path='/guest' element={<GuestPage />} />
      </Routes>
    </>
  )
}

export default App;