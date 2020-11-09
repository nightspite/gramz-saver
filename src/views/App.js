import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import { routes } from 'routes';
import Home from 'views/Home';
// import GetPosts from 'views/GetPosts';
import GetPost from 'views/GetPost';
import GetProfile from 'views/GetProfile';
import GetStories from 'views/GetStories';
import NotFound from 'components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          {/*
          <Route exact path={routes.posts}>
            <Redirect to="/" />
          </Route>
          <Route path={routes.posts} component={GetPosts} /> */}

          <Route exact path={routes.post}>
            <Redirect to="/" />
          </Route>
          <Route path={routes.post} component={GetPost} />

          <Route exact path={routes.profile}>
            <Redirect to="/" />
          </Route>
          <Route path={routes.profile} component={GetProfile} />

          <Route exact path={routes.stories}>
            <Redirect to="/" />
          </Route>
          <Route path={routes.stories} component={GetStories} />

          <Route component={NotFound} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
}

export default App;
