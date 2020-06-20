import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Moviepage from './js/moviepage.js';
import Detail from './js/detail.js';
import { ResetStyle, GlobalStyle } from './style/globalstyle';


const App = () => {
  return (
    <div>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter basename={ process.env.PUBLIC_URL }>
        <Switch>
          <Route path="/" component={Moviepage} />
          <Route path="/:index" component={Detail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
