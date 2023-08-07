import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import BoardPage from '../pages/BoardPage';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import SignUpPage from '../pages/SignUpPage';
import PostPage from '../pages/PostPage';
import ReportPage from '../pages/ReportPage';
import UserPage from '../pages/UserPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
      <Footer />
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
