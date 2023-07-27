import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Account } from "./Accounts"
import { Header } from "./components/Header";
import './input.css';

import { AllCompanies } from "./pages/AllCompanies";
import { AllQuestions } from "./pages/AllQuestions";
import { AllTags } from "./pages/AllTags";
import { AllUsers } from "./pages/AllUsers";
import { LandingPage } from "./pages/LandingPage";
import { Sidenav } from "./components/Sidenav";

function App() {

  return (
    <Router>
          <Header />
        <div className="flex flex-row h-screen">
        <Sidenav />
        <Account>
          <Routes>
            <Route path="/questions" element={<AllQuestions />} />
            <Route path="/tags" element={<AllTags />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/companies" element={<AllCompanies />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Account>
        </div>
    </Router>
  );
}

export default App;
