import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopMenu from './Components/TopMenu';
import IndexContainer from './Containers/IndexContainer';
import LoginContainer from './Containers/LoginContainer';
import RefereeContainer from './Containers/RefereeContainer';
// import { AuthContext } from './Context/AuthContext'

const App = () => {
  const [token, setToken] = useState('');

  return (
    // <AuthContext.Provider value={{ token, setToken }}>
    <BrowserRouter>
      <TopMenu />
      <Routes>
        <Route path='/' element={<IndexContainer />} />
        <Route path='/referee' element={<RefereeContainer />} />
        <Route path='/login' element={<LoginContainer />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There is nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
    // </AuthContext.Provider>
  );
};

export default App;
