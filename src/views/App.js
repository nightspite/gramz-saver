import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import GetPosts from './GetPosts';
import GetStories from './GetStories';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path={routes.home} component={Home} /> */}
        <Route exact path={routes.posts} component={GetPosts} />
        <Route exact path={routes.stories} component={GetStories} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
