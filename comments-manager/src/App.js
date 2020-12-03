import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Posts, Post } from './components';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Nav>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/posts">Posts</NavLink>
          </NavItem>
        </Nav>

        <Switch>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/post/:id">
            <Post />
          </Route>
          <Route path="/">
            <h3>Comment Manager App</h3>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
