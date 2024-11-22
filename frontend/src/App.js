import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Users from './Users/pages/Users';
import NewPlace from './Places/pages/NewPlace';
import UserPlaces from './Places/pages/UserPlaces';
import MainNavigation from './Shared/components/Navigation/MainNavigation';
import UpdatePlace from './Places/pages/UpdatePlace';
import Auth from './Users/pages/Auth';
import { AuthContext } from './Shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/home" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/home" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <MainNavigation />
      <main>
        {routes}
      </main>
    </AuthContext.Provider>
  );
};

export default App;
