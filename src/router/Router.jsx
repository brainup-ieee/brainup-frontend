// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// components
import { Navbar } from "../components/Navbar";

// context provider
import { RegisterProvider } from "../contexts/register";
import { PasswordProvider } from "../contexts/resetPassword";

// pages
import { HomePage } from "../pages/home/Index";
import { AboutPage } from "../pages/about/Index";
import { ContactPage } from "../pages/contact/Index";
import { PricingPage } from "../pages/pricing/Index";
import { RegisterPage } from "../pages/register/Index";
import { SigninPage } from "../pages/signin/Index";
import { VarificationPage } from "../pages/varify/Index";
import { TeacherDashboard } from "../pages/dashboard/teacher/index";
import { StudentDashboard } from "../pages/dashboard/student";
import { CreateClassroom } from "../pages/classroom/createClass";
import { CreateLesson } from "../pages/lesson/createLesson";
import { CreateQuiz } from "../pages/quiz/createQuiz";
import { ViewLesson } from "../pages/lesson/viewLesson";
import { ViewQuiz } from "../pages/quiz/viewQuiz";
import { AuthAlertContextProvider } from "../contexts/authAlert";
import { Classroom } from "../pages/classroom";
import { ProcessSuccess } from "../pages/varify/ProcessSuccess";
import { CreateModel } from "../pages/quiz/createModel";

const Layout = ({ children }) => {
  return (
    <div className="xs:px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
      <Navbar />
      <Outlet />
    </div>
  );
};

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="classrooms/create" element={<CreateClassroom />} />
          <Route
            path=":classroom/:id/lesson/create"
            element={<CreateLesson />}
          />
          <Route path=":classroom/:id/quiz/create" element={<CreateQuiz />} />
          <Route
            path=":classroom/:id/quiz/model/create"
            element={<CreateModel />}
          />
          <Route path="teacher/classroom/:id" element={<Classroom />} />
          <Route
            path=":classroom/:classroom_id/lesson/:id"
            element={<ViewLesson />}
          />
          <Route
            path=":classroom/:classroom_id/quiz/:id"
            element={<ViewQuiz />}
          />
        </Route>
        <Route
          path="register"
          element={
            <RegisterProvider>
              <AuthAlertContextProvider>
                <RegisterPage />
              </AuthAlertContextProvider>
            </RegisterProvider>
          }
        />
        <Route
          path="signin"
          element={
            <AuthAlertContextProvider>
              <SigninPage />
            </AuthAlertContextProvider>
          }
        />
        <Route
          path="forgot-password"
          element={
            <PasswordProvider>
              <VarificationPage />
            </PasswordProvider>
          }
        />
        <Route path="email-confirm" element={<VarificationPage />} />
        <Route path="password-success" element={<ProcessSuccess />} />
        <Route path="email-success" element={<ProcessSuccess />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};
