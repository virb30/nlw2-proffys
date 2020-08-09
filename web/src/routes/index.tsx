import React from "react";
import { BrowserRouter } from "react-router-dom";

import Route from "./Route";

import Landing from "../pages/Landing";
import TeacherList from "../pages/TeacherList";
import TeacherForm from "../pages/TeacherForm";
import Login from "../pages/Login";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Landing} isPrivate />
      <Route path="/study" component={TeacherList} isPrivate />
      <Route path="/give-classes" component={TeacherForm} isPrivate />
    </BrowserRouter>
  );
}

export default Routes;
