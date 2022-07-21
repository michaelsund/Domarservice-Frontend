import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexContainer from './Containers/IndexContainer';
import LoginContainer from './Containers/LoginContainer';
import RefereeContainer from './Containers/RefereeContainer';
import CompanyContainer from './Containers/CompanyContainer';
import { ThemeProvider } from './Context/ThemeContext';
import { Nav } from './Components/Nav';
import AllEventsContainer from './Containers/AllEventsContainer';
import { Footer } from './Components/Footer';
import MyProfileContainer from './Containers/MyProfileContainer';

const App = () => {
  return (
    <div className="flex flex-col h-screen justify-between break-words">
      <ThemeProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<IndexContainer />} />
            <Route path="/matcher" element={<AllEventsContainer />} />
            <Route path="/referee/:id" element={<RefereeContainer />} />
            <Route path="/company/:id" element={<CompanyContainer />} />
            <Route path="/minprofil" element={<MyProfileContainer />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route
              path="*"
              element={
                <div style={{ padding: '1rem' }}>
                  <p>Sidan kunde inte hittas.</p>
                </div>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
