import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './TheSchoolApp/HomePage';
import Admin from './TheSchoolApp/AuthenTicationComponent/Admin';
import Test from './TheSchoolApp/StudentComponent/Test';
import GuestPage from './TheSchoolApp/GuestPage';
import './App.css';
import { useDispatch } from 'react-redux';
import {
  addAssessment,
  addInformation,
  assessmentChanges,
  authenticationHandler,
  chooseModules,
  deleteAssessment,
  getAssesment,
  getAssessment,
  getModuleData,
  getModuleInfo,
  getModules,
  getStudentBioData,
  getStudentGrades,
  getStudentInformations,
  getStudentModules,
  getTutorBioData,
  getTutorGrades,
  getTutorInformations,
  informationChanges,
  pushGrade,
  sendAssessment,
  sendInformation,
  sendStatus,
  signOut,
  studentBioChanges,
  tutorBioChanges
} from './TheSchoolApp/redux/myActions';

import CreateAssessment from './TheSchoolApp/TutorComponent/CreateAssesment';
import ModuleAssessments from './TheSchoolApp/TutorComponent/ModuleAssesments';
import TutorInformation from './TheSchoolApp/TutorComponent/InformationsPage';
import ModulesPage from './TheSchoolApp/StudentComponent/Modules';
import TutorBioDataPage from './TheSchoolApp/TutorComponent/BioData';
import StdBioDataPage from './TheSchoolApp/StudentComponent/Biodata';
import TutorGradesPage from './TheSchoolApp/TutorComponent/GradesPage';
import StudGradesPage from './TheSchoolApp/StudentComponent/GradesPage';
import StudentInformation from './TheSchoolApp/StudentComponent/InformationPage';
import ModuleInformation from './TheSchoolApp/StudentComponent/ModuleInfoPage';
import TutorHomePage from './TheSchoolApp/TutorComponent/Homepage'
import StudentHomePage from './TheSchoolApp/StudentComponent/Homepage';


const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNavigation = (page) => {
    navigate(page)
  }

  const handleAuthentication = (data) => {
    dispatch(authenticationHandler(data))
  }

  const handleModuleInformation = () => {
    dispatch(getModuleInfo())
  }

  const handleAddAssessment = (data) => {
    dispatch(addAssessment(data))
  }

  const handleGetAssessments = () => {
    dispatch(getAssessment())
  }

  const handleAssessmentChanges = (getdata) => {
    dispatch(assessmentChanges(getdata))
    setTimeout(() => {
      handleGetAssessments()
    }, 1000)
  }

  const handleSendAssesment = (type, assessmentId) => {
    dispatch(sendAssessment(type, assessmentId))
    setTimeout(() => {
      handleGetAssessments()
    }, 500)
  }

  const handleDeleteAssesment = (assessmentId) => {
    dispatch(deleteAssessment(assessmentId))
    setTimeout(() => {
      handleGetAssessments()
    }, 1000)
  }


  const handleAddInformation = (data) => {
    dispatch(addInformation(data))
    setTimeout(() => { handleGetInformations('tutor') }, 300)
  }

  const handleGetInformations = (user) => {
    switch (user) {
      case 'tutor':
        dispatch(getTutorInformations());
        break;
      case 'student':
        dispatch(getStudentInformations());
        break;
    }
  }

  const handleInformationChanges = (data) => {
    dispatch(informationChanges(data))
    setTimeout(() => { handleGetInformations('tutor') }, 300)
  }

  const handleSendInformation = (type, infoId) => {
    dispatch(sendInformation(type, infoId))
    setTimeout(() => { handleGetInformations('tutor') }, 300)
  }

  const handleTutorGrades = () => {
    dispatch(getTutorGrades())
  }

  const handleSendGrade = (type, id) => {
    dispatch(sendStatus(type, id))
    setTimeout(() => { handleTutorGrades() }, 300)
  }

  const handleBioData = (page) => {
    switch (page) {
      case 'tutor':
        dispatch(getTutorBioData());
        break;
      case 'student':
        dispatch(getStudentBioData());
        break;
    }
  }

  const handleBiodataChanges = (getData) => {
    const { type, data, page } = getData
    switch (page) {
      case "tutor":
        dispatch(tutorBioChanges(type, data))
        setTimeout(() => { handleBioData('tutor') }, 1500)
        break;
      case "student":
        dispatch(studentBioChanges(type, data))
        setTimeout(() => { handleBioData('student') }, 1500)
        break;
    }
  }

  const handleGetModules = () => {
    dispatch(getModules())
  }

  const handleSelectModules = (data) => {
    dispatch(chooseModules(data))
  }

  const handleStudentModules = () => {
    dispatch(getStudentModules())
  }

  const handleModuleData = (moduleId) => {
    dispatch(getModuleData(moduleId))
  }

  const handleGetAssessment = (assessmentId) => {
    dispatch(getAssesment(assessmentId))
  }

  const handleGetGrades = () => {
    dispatch(getStudentGrades())
  }

  const handlePushGrade = (studentGrade) => {
    dispatch(pushGrade(studentGrade))
  }

  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    handleNavigation('/')
    dispatch(signOut())
  }


  return (
    <>
      <Routes>
        <Route path='/*' element={<HomePage />} />

        <Route path='/tutorhomepage' element={<TutorHomePage
          handleSignOut={handleSignOut}
          handleModuleInformation={handleModuleInformation}
          handleNavigation={handleNavigation} />} />

        <Route path='/admin/:id' element={<Admin
          handleAuthentication={handleAuthentication}
          handleNavigation={handleNavigation}
        />} />

        <Route path='/CreateAssessment'
          element={<CreateAssessment
            handleAddAssessment={handleAddAssessment}
            handleNavigation={handleNavigation} />} />

        <Route path='/assessments' element={<ModuleAssessments
          handleGetAssessments={handleGetAssessments}
          handleSendAssesment={handleSendAssesment}
          handleDeleteAssesment={handleDeleteAssesment}
          handleAssessmentChanges={handleAssessmentChanges}
          handleNavigation={handleNavigation}
        />} />

        <Route path='/tutorinformation' element={<TutorInformation
          handleAddInformation={handleAddInformation}
          handleSendInformation={handleSendInformation}
          handleInformationChanges={handleInformationChanges}
          handleGetInformations={handleGetInformations}
          handleNavigation={handleNavigation} />} />

        <Route path='/tutorgrades' element={<TutorGradesPage
          handleTutorGrades={handleTutorGrades}
          handleSendGrade={handleSendGrade}
          handleNavigation={handleNavigation} />} />

        <Route path='/tutorbiodata' element={<TutorBioDataPage
          handleBioData={handleBioData}
          handleBiodataChanges={handleBiodataChanges}
          handleNavigation={handleNavigation} />} />


        <Route path='/studenthomepage' element={<StudentHomePage
          handleSignOut={handleSignOut}
          handleBioData={handleBioData}
          handleNavigation={handleNavigation} />} />

        <Route path='/modules' element={<ModulesPage
          handleGetModules={handleGetModules}
          handleStudentModules={handleStudentModules}
          handleSelectModules={handleSelectModules}
          handleNavigation={handleNavigation} />} />

        <Route path='/moduleDetails/:moduleId'
          element={<ModuleInformation handleModuleData={handleModuleData}
            handleNavigation={handleNavigation} />} />

        <Route path='/studentinformation' element={<StudentInformation
          handleGetInformations={handleGetInformations}
          handleNavigation={handleNavigation} />} />

        <Route path='/studentgrades' element={<StudGradesPage
          handleTutorGrades={handleTutorGrades}
          handleGetGrades={handleGetGrades}
          handleNavigation={handleNavigation} />} />

        <Route path='/studentbio' element={<StdBioDataPage
          handleBioData={handleBioData}
          handleBiodataChanges={handleBiodataChanges}
          handleNavigation={handleNavigation} />} />

        <Route path='/test/:assessmentId' element={<Test
          handleGetAssessment={handleGetAssessment}
          handlePushGrade={handlePushGrade}
          handleNavigation={handleNavigation} />} />

        <Route path='/guest' element={<GuestPage />} />
      </Routes>
    </>
  )
}

export default App;