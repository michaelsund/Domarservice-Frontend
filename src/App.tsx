import { BrowserRouter, Route, Routes } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/sv';
import IndexContainer from './Containers/IndexContainer';
import LoginContainer from './Containers/LoginContainer';
import RefereeContainer from './Containers/RefereeContainer';
import CompanyContainer from './Containers/CompanyContainer';
import { ThemeProvider } from './Context/ThemeContext';
import { Nav } from './Components/Nav';
import AllEventsContainer from './Containers/AllEventsContainer';
import { Footer } from './Components/Footer';
import MyProfileContainer from './Containers/MyProfileContainer';
import RegisterContainer from './Containers/RegisterContainer';
import { DomarserviceContextProvider } from './Context/DomarserviceContext';
import VerifyEmailContainer from './Containers/VerifyEmailContainer';
import UserForbiddenContainer from './Containers/UserForbidden';
import AllRefereeScheduleContainer from './Containers/AllRefereeScheduleContainer';
import CompanyEventContainer from './Containers/CompanyEventConatiner';

const App = () => {
  moment.locale('sv');
  return (
    <div className="flex flex-col h-screen justify-between break-words">
      <ThemeProvider>
        <DomarserviceContextProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<IndexContainer />} />
              <Route path="/matcher" element={<AllEventsContainer />} />
              <Route path="/match/:id" element={<CompanyEventContainer />} />
              <Route path="/domare" element={<AllRefereeScheduleContainer />} />
              <Route path="/inte-behorig" element={<UserForbiddenContainer />} />
              <Route path="/domare/:id" element={<RefereeContainer />} />
              <Route path="/verifiera-epost" element={<VerifyEmailContainer />} />
              <Route path="/forening/:id" element={<CompanyContainer />} />
              <Route path="/min-profil" element={<MyProfileContainer />} />
              <Route path="/login" element={<LoginContainer />} />
              <Route path="/registrera" element={<RegisterContainer />} />
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
        </DomarserviceContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
