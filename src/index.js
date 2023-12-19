import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './page/NotFound';
import NewsPage from './page/NewsPage';
import YoutubePage from './page/YoutubePage';
import ReportPage from './page/ReportPage';
import Login from './page/Login';
import ProtectRoute from './component/ProtectRoute';
import SignUp from "./page/SignUp";
import Home from "./page/Home";

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children:[
         { index: true, element: <Home /> },
         {
            path: 'news', // 기본 뉴스 페이지
            element: (
               <ProtectRoute>
                  <NewsPage />
               </ProtectRoute>
            ),
            children: [
               { path: ':id', element: <NewsPage /> }, // 동적 라우트
               { path: ':category/:keyword', element: <NewsPage /> }
            ],
            errorElement: <NotFound />,
         },
         {
            path: 'youtube',
            element: (
               <ProtectRoute>
                  <YoutubePage />
               </ProtectRoute>
            ),
            errorElement: <NotFound />,
         },
         {
            path: 'report',
            element: (
               <ProtectRoute>
                  <ReportPage />
               </ProtectRoute>
            ),
            errorElement: <NotFound />,
         },
      ]
   },
   {
      path: 'login',
      element: <Login />,
      errorElement: <NotFound />,
   },
   {
      path: 'sign',
      element: <SignUp />,
      errorElement: <NotFound />,
   },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>,
);
