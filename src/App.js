import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import './App.css';
import Canvas from "./Canvas";

function App() {
  return (
    <Router>
        <div className="App">
                <div>
                    <Switch>
                        <Route path='/'>
                            <Canvas />
                        </Route>
                    </Switch>
                </div>
        </div>
    </Router>
  );
}

export default App;
