import React from "react";
import {Route, Switch} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import LoginComponent from "./auth/LoginComponent";
import RegisterComponent from "./auth/RegisterComponent";
import ProfileComponent from "./auth/ProfileComponent";
import BlogListComponent from "./blogs/BlogListComponent";
import BlogItemComponent from "./blogs/BlogItemComponent";
import BlogFormComponent from "./blogs/BlogFormComponent";
import ContactsComponent from "./ContactsComponent";
import AboutMeComponent from "./AboutMeComponent";
import PageEditComponent from "./PageEditComponent";

export default function RoutesComponent() {
  return (
    <Switch>
      <Route exact path={'/'} component={HomeComponent} />
      <Route exact path={'/:lang'} component={HomeComponent} />
      <Route exact path="/:lang/login" component={LoginComponent} />
      <Route exact path="/:lang/register" component={RegisterComponent} />
      <Route exact path="/:lang/profile" component={ProfileComponent} />
      <Route exact path="/:lang/contacts" component={ContactsComponent} />
      <Route exact path="/:lang/about" component={AboutMeComponent} />
      <Route exact path="/:lang/blogs/edit/:slug" component={BlogFormComponent} />
      <Route exact path="/:lang/blogs/:slug" component={BlogItemComponent} />
      <Route exact path="/:lang/blogs" component={BlogListComponent} />
      <Route exact path="/:lang/pages/:slug/edit" component={PageEditComponent} />
    </Switch>
  );
}