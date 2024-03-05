import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import { UserContext } from './UserContext';

const App = () => {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
        <Route path="*" element={<SignIn />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
