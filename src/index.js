import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import Contact, { loader as contactLoader, action as contactAction } from './routes/Contact';
import Root, { loader as rootLoader, action as rootAction } from "./routes/Root";
import Error from './routes/Error';
import Edit, { action as editAction } from "./routes/Edit";
import { action as destroyAction } from "./routes/Destroy";
import About from './routes/About';
import Profile from './routes/Profile';

// TagManager.initialize(tagManagerArgs);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<Error />}
    >
      <Route errorElement={<Error />}>
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<Edit />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
