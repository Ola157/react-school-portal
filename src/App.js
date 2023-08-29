import React, { useReducer } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
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
import { handleAddNewQuestion, handleAllAmendsAct, handleAllQuestions, handleAnnouncementChanges, handleDisplayInformation, handleFetchAllInformation, handleFetchAllResults, handleInformationPush, handleModalClear, handleMyAllModules, handlePersonalChanges, handlePersonalInfoFetch, handlePullAssesment, handlePullModuleData, handlePushStudentGrade, handleQuestionDisplay, handleRegistration, handleSelectModules, handleShowResults, handleSignOutAct, handleStdAttempt } from './TheSchoolApp/redux/myActions';

const App = () => {
  const dispatch = useDispatch()

  const handle_login_signup = (data) => {
    dispatch(handleRegistration(data))
  }

  const handleModal = () => {
    dispatch(handleModalClear())
  }

  const handleSignOut = () => {
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

  const handleShowInformation = (infoId) => {
    dispatch(handleDisplayInformation(infoId))
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

  const handlePushStdGrade = (modId, studentGrade) => {
    dispatch(handlePushStudentGrade(modId, studentGrade))
  }

  const handleDisplay = (type, id) => {
    dispatch(handleShowResults(type, id))
  }

  return (
    <>
      <Routes>
        <Route path='/*' element={<HomePage />} />
        <Route path='/userhomepage/:type' element={<UserHomePage handleSignOut={handleSignOut} handlePersonalInformation={handlePersonalInformation} />} />
        <Route path='/admin/:id' element={<Admin handle_login_signup={handle_login_signup} handleModal={handleModal} />} />
        <Route path='/assesment/:questionId' element={<Test handleFetchAssesment={handleFetchAssesment} handlePushStdGrade={handlePushStdGrade} />} />
        <Route path='/questions' element={<AllQuestions handleAddAllQuestion={handleAddAllQuestion} />} />
        <Route path='/allAssesment' element={<ModuleQuestions handleFetchQuestions={handleFetchQuestions} handleDisplay={handleDisplay} handleShowQuestion={handleShowQuestion} handleAllChanges={handleAllChanges} />} />
        <Route path='/announcement/:typeId' element={<AnnouncementsPage handleDisplay={handleDisplay} handleShowInformation={handleShowInformation} handle_Add_Information={handle_Add_Information} handleAllChanges={handleAllChanges} handleFetchInformations={handleFetchInformations} />} />
        <Route path='/grades/:typeId' element={<Results handleFetchResults={handleFetchResults} handleDisplay={handleDisplay} />} />
        <Route path='/PersonalInformation/:typeId' element={<PersonalInformation handlePersonalInformation={handlePersonalInformation} handleAllChanges={handleAllChanges} />} />
        <Route path='modules' element={<MyModules handleFetchMyModules={handleFetchMyModules} handleSelectMyModules={handleSelectMyModules} />} />
        <Route path='/moduleDetails/:moduleId' element={<ModuleDeets handleFetchModuleData={handleFetchModuleData} />} />
        <Route path='/guest' element={<GuestPage />} />
      </Routes>
    </>
  )
}

export default App;