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
import Chat from "./pages/Chat";
import ChatLogin from "./pages/ChatLogin";

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
          <Route path="/sessions" element={<Session />} />
          <Route path="/pictures" element={<Pictures />} />
          <Route path="/category" element={<Category />} />
          <Route path="/event" element={<Event />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-form" element={<QuizForm />} />
          <Route path="/quiz-item" element={<QuizItem />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat-login" element={<ChatLogin />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
