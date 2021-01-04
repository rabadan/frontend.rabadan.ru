import React from "react";
import {Route, Switch} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import LoginComponent from "./auth/LoginComponent";
import RegisterComponent from "./auth/RegisterComponent";
import ProfileComponent from "./ProfileComponent";
import BlogListComponent from "./blogs/BlogListComponent";
import BlogItemComponent from "./blogs/BlogItemComponent";
import BlogFormComponent from "./blogs/BlogFormComponent";

export default function RoutesComponent() {
  return (
    <div className="container mt-3">
      <Switch>
        <Route exact path={'/'} component={HomeComponent} />
        <Route exact path="/login" component={LoginComponent} />
        <Route exact path="/register" component={RegisterComponent} />
        <Route exact path="/profile" component={ProfileComponent} />
        <Route exact path="/blogs" component={BlogListComponent} />
        <Route exact path="/blogs/edit/:slug" component={BlogFormComponent} />
        <Route exact path="/blogs/:slug" component={BlogItemComponent} />
      </Switch>
    </div>
  );
}