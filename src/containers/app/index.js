import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';

import Home from '../home';

const App = () => (
  <div>
    <header>
      <Navbar color="light" light>
        <Link to="/">Home</Link>
      </Navbar>
    </header>

    <main>
      <Route exact path="/" component={Home} />
    </main>
  </div>
);

export default App;
