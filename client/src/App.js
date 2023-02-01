import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AttendeeItem from "./pages/AttendeeItem";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Session from "./pages/Session";
import Pictures from "./pages/Pictures";
import Category from "./pages/Category";
import Event from "./pages/Event";
import Vote from "./pages/Vote";
import Calendar from "./pages/Calendar";
import Quiz from "./pages/Quiz";
import QuizForm from "./components/quiz/QuizForm";
import QuizItem from "./components/quiz/QuizItem";
import Qr from "./pages/Qr";
import Room from "./pages/Room";
import ChatLogin from "./pages/ChatLogin";
import Customers from "./pages/Customers";
import DashCalendar from "./pages/DashCalendar";
import Profile from "./pages/Profile";
import Reset from "./pages/Reset";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/attendees" element={<AttendeeItem />} />
          {/* <Route path="/sessions" element={<Session />} /> */}

          <Route path="/pictures" element={<Pictures />} />
          <Route path="/category" element={<Category />} />

          <Route path="/event" element={<Event />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-form" element={<QuizForm />} />
          <Route path="/quiz-item" element={<QuizItem />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/room" element={<Room />} />
          <Route path="/chat-login" element={<ChatLogin />} />
          <Route path="/dash-calendar" element={<DashCalendar />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sessions" element={<Session />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/reset-password/:token"
            loader={async ({ params }) => {
              console.log(params);
            }}
            element={<ResetPassword />}
          />
        </Routes>
        {/* <Footer /> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
