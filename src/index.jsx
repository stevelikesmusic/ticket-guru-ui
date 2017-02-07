require('./styles/app.scss');
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './features/App.jsx';
import SearchBox from './components/SearchBox.jsx';
import Order from './features/Order.jsx';

render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SearchBox}/>
        <Route path="/order/venue/:venueId/artist/:artistId/show/:showId" components={Order}/>
      </Route>
    </Router>,
    document.getElementById('app')
);
