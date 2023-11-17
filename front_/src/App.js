import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import User from './views/user/user';
import SingleStart from './views/SingleStart';
import MoviePage from './views/MoviePage';
import DocPage from './views/DocPage';
import QuizzPage from './views/QuizzPage';
import CongratPage from './views/CongratPage';
import UserPage from './views/UserPage';
import NotFoundPage from './views/404Page';
import { getUser, getResults, getStatus } from './API/users';
import CreateModule from './views/CreateModule';
import ModifyModule from './views/ModifyModule';
import CreateStep from './views/CreateStep';
import ModifyStep from './views/ModifyStep';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

function App() {
  const currentUserID = localStorage.getItem('currentUserID');
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [moduleResults, setModuleResults] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const currentUserID = localStorage.getItem('currentUserID');
    const fetchResults = async () => {
      try {
        const data = await getResults(currentUserID);
        setModuleResults(data);
        // console.log(data)
      } catch (error) {
        console.log('Error fetching modules:', error);
      }
    };

    fetchResults();
  }, [location]);

  const setCurrentUser = (userID, userName, userEmail, userRole) => {
    setCurrentUserName(userName);
    setCurrentUserEmail(userEmail);
    setCurrentUserRole(userRole);
    setModuleResults(moduleResults);
  };

  useEffect(() => {
    if (currentUserID) {
      const fetchUser = async () => {
        const user = await getUser(currentUserID);
        if (user) {
          setCurrentUserName(user.display_name);
          setCurrentUserEmail(user.user_email);
          setCurrentUserRole(user.user_status);
          
        }
      };

      fetchUser();
    }
  }, [currentUserID]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isConnected = await getStatus(currentUserID);
      if (isConnected?.status[0]?.action === 'loginOK') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [currentUserID]);



  return (
    <div className="App">
      <UserContext.Provider
        value={{
          currentUserID,
          currentUserName,
          currentUserEmail,
          setCurrentUser,
          moduleResults,
          currentUserRole,
          isLoggedIn,
        }}
      >
        <Routes>
  <Route path="/" element={<User />} />
  {isLoggedIn && (
    <>
      <Route path="/user/:id" element={<HomePage />} />
      <Route path="/singleStart/:id" element={<SingleStart />} />
      <Route path="/moviePage/:id/:stepId" element={<MoviePage />} />
      <Route path="/docPage/:id/:stepId" element={<DocPage />} />
      <Route path="/quizzPage/:id/:stepId" element={<QuizzPage />} />
      <Route path="/congratPage/:id/:stepId" element={<CongratPage />} />
      <Route path="/userPage/:id/" element={<UserPage />} />
      {currentUserRole === 1 && (
      <>
      <Route path="/createModule/:id" element={<CreateModule />} />
      <Route path="/modifyModule/:id" element={<ModifyModule />} />
      <Route path="/createStep/:id" element={<CreateStep />} />
      <Route path="/modifyStep/:id/:stepId" element={<ModifyStep />} />
      </>
      )}
    </>
  )}
  <Route path="*" element={<NotFoundPage />} />
</Routes>

</UserContext.Provider>
    </div>
  );

}
export default App;