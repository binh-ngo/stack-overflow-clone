import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Account } from "./Accounts"
import { Header } from "./components/Header";
import { Sidenav } from "./components/Sidenav";
import './input.css';

import { AllQuestions } from "./pages/AllQuestions";
import { AllTags } from "./pages/AllTags";
import { AllAuthors } from "./pages/AllAuthors";
import { LandingPage } from "./pages/LandingPage";

import { awsconfig } from "./aws-exports";
import { Amplify } from "aws-amplify"
import { CreateQuestion } from "./pages/CreateQuestion";
import { EditQuestion } from "./pages/EditPost";
import ReadonlyPage from "./pages/ReadOnlyPage";
import { AllQuestionsFromOneAuthor } from "./pages/AllQuestionsFromOneAuthor";
import { SingleTag } from "./pages/SingleTag";
import { ddbUpdateQuestion } from "./graphql/questions";
import { ddbCreateAnswer } from "./graphql/answers";
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
              <Route path="/question" element={<ReadonlyPage onSave={ddbCreateAnswer} />} />
              <Route path="/edit/question" element={<EditQuestion onSave={ddbUpdateQuestion}/>} />
              <Route path="/questions" element={<AllQuestions />} />
              {/* <RequireAuth> */}
                <Route path="/questions/create" element={<CreateQuestion />} />
              {/* </RequireAuth> */}
              {/* <Route path="/questions/:author/:quesId" element={<SingleQuestion />} /> */}
              <Route path="/tag" element={<SingleTag />} />
              <Route path="/tags" element={<AllTags />} />
              <Route path="/authors" element={<AllAuthors />} />
              <Route path="/author" element={<AllQuestionsFromOneAuthor />} />
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
