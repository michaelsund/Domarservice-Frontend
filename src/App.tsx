import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopMenu from './Components/TopMenu';
import IndexContainer from './Containers/IndexContainer';
import LoginContainer from './Containers/LoginContainer';
import RefereeContainer from './Containers/RefereeContainer';
import { ThemeProvider } from './Context/ThemeContext';

const App = () => {
  return (
    <main className="container md:px-0 max-w-10xl mx-auto overflow-hidden">
      <ThemeProvider>
        <BrowserRouter>
          <TopMenu />
          <Routes>
            <Route path="/" element={<IndexContainer />} />
            <Route path="/referee" element={<RefereeContainer />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There is nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </main>
  );
};

export default App;
