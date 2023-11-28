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

const routes = [
   { path: 'news', component: NewsPage, errorElement: <NotFound /> },
   { path: 'youtube', component: YoutubePage, errorElement: <NotFound /> },
   { path: 'report', component: ReportPage, errorElement: <NotFound /> },
];

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: routes.map(route => ({
         path: route.path,
         element: (
            <ProtectRoute>{React.createElement(route.component)}</ProtectRoute>
         ),
         errorElement: route.errorElement,
      })),
   },
   {
      path: '/login',
      element: <Login />,
      errorElement: <NotFound />,
   },
   {
      path: '/sign',
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
