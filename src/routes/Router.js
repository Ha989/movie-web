
import React from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Discovery from '../pages/Discovery';
import HomePage from '../pages/HomePage';
import PopularPage from '../pages/PopularPage';
import TopRated from '../pages/TopRated';
import TrendingMovieList from '../pages/TrendingMovieList';
import UpComing from '../pages/UpComing';
import DetailPage from '../pages/DetailPage';
import LoginPage from '../pages/LoginPage';
import FavoritePage from '../pages/Favorite';


function Router() {
     let location = useLocation();
     let state = location.state


     function RequireAuth({ children }) {
      let auth = useAuth();
      console.log("user status: ", auth.user);
      if(!auth.user) {
          return <Navigate to="/login" state={{ from: location }} replace/>
      }
      return children;
  }
  return (
    <>
    <Routes location={state?.backgroundLocation || location }>
        <Route path='/' element={<MainLayout />}></Route>
        <Route index element={<HomePage/>}/>
        <Route path='discovery/:pageId' element={<Discovery/>}/>
        <Route path='trending/:pageId' element={<TrendingMovieList/>}/>
        <Route path='popular/:pageId' element={<PopularPage/>}/>
        <Route path='top_rated/:pageId' element={<TopRated/>}/>
        <Route path='upcoming/:pageId' element={<UpComing/>}/>
        <Route path='movie/:movieId' element={<DetailPage />}/>
        <Route path='/favorite' element={<FavoritePage />}/>
        <Route path='/login' element={<LoginPage />}/>
    </Routes>
    {state?.backgroundLocation && (
      <Routes>
          <Route path='/login' element={<LoginPage />}/>
      </Routes>
     )}
     </>
  )
}

export default Router;