import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import * as serviceWorker from './serviceWorker';
import Moviepage from './js/moviepage.js';
import Detail from './js/detail.js';
import { ResetStyle, GlobalStyle } from './style/globalstyle';


const App = () => {
  return (
    <div>
      <ResetStyle />
      <GlobalStyle />
      <Router history={browserHistory}>
        <Route path="/" component={Moviepage} />
        <Route path="/:index" component={Detail} />
      </Router>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
