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
import { TeacherDashboard } from "../pages/dashboard/teacher";
import { StudentDashboard } from "../pages/dashboard/student";
import { CreateClassroom } from "../pages/classroom/createClass";
import { CreateLesson } from "../pages/lesson/createLesson";
import { CreateQuiz } from "../pages/quiz/createQuiz";
import { ViewClassroom } from "../pages/classroom/viewClass";
import { ViewLesson } from "../pages/lesson/viewLesson";
import { ViewQuiz } from "../pages/quiz/viewQuiz";

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
          <Route path="classrooms/create" element={<CreateClassroom /> } />
          <Route path="lessons/create" element={<CreateLesson /> } />
          <Route path="quizzes/create" element={<CreateQuiz /> } />
          <Route path="classrooms/:id" element={<ViewClassroom /> } />
          <Route path="lessons/:id" element={<ViewLesson /> } />
          <Route path="quizzes/:id" element={<ViewQuiz /> } />
        </Route>
        <Route
          path="register"
          element={
            <RegisterProvider>
              <RegisterPage />
            </RegisterProvider>
          }
        />
        <Route path="signin" element={<SigninPage />} />
        <Route
          path="forgot-password"
          element={
            <PasswordProvider>
              <VarificationPage />
            </PasswordProvider>
          }
        />
        <Route path="email-confirm" element={<VarificationPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};
