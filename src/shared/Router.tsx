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
import Layout from '../components/layout/Layout';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Layout>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          </Routes>
          </Layout>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Router;
