import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Account } from "./Accounts"
import { Header } from "./components/Header";
import { Sidenav } from "./components/Sidenav";
import './input.css';

import { AllCompanies } from "./pages/AllCompanies";
import { AllQuestions } from "./pages/AllQuestions";
import { AllTags } from "./pages/AllTags";
import { AllUsers } from "./pages/AllUsers";
import { LandingPage } from "./pages/LandingPage";

import { awsconfig } from "./aws-exports";
import { Amplify } from "aws-amplify"
import { CreateQuestion } from "./pages/CreateQuestion";
import { ddbCreateQuestion, ddbUpdateQuestion } from "./graphql";
import { EditQuestion } from "./pages/EditPost";
import ReadonlyPage from "./pages/ReadOnlyPage";
// import RequireAuth from "./RequireAuth";
Amplify.configure(awsconfig);


function App() {

  return (
    <Router>
      <div>
        <Account>
          <Header />
          <div className="flex flex-row h-screen">
            <Sidenav />
            <Routes>
              <Route path="/questions/:quesId/:author" element={<ReadonlyPage />} />
              <Route path="/edit/questions/:quesId/:author" element={<EditQuestion onSave={ddbUpdateQuestion}/>} />
              <Route path="/questions" element={<AllQuestions />} />
              {/* <RequireAuth> */}
                <Route path="/questions/create" element={<CreateQuestion onSave={ddbCreateQuestion}/>} />
              {/* </RequireAuth> */}
              {/* <Route path="/questions/:author/:quesId" element={<SingleQuestion />} /> */}
              <Route path="/tags" element={<AllTags />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/companies" element={<AllCompanies />} />
              <Route path="/" element={<LandingPage />} />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </div>
        </Account>
      </div>
    </Router>
  );
}

export default App;
