import './App.css';
import 'assets/styles/custom.scss';
import 'react-toastify/dist/ReactToastify.css';

import Routes from 'Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from 'AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    isAuthenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />;
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
