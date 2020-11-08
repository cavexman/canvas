import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import './App.css';
import Images from './Images'
import Settings from './Settings'
import Canvas from "./Canvas";

import {AssetProvider} from './context/AssetContext';
import FixedHeader from "./FixedHeader";

function App() {
  return (
    <Router>
        <div className="App">
            <AssetProvider>
                <div>
                    <Switch>
                        <Route path='/'>
                            <Canvas />
                        </Route>
                    </Switch>
                </div>
            </AssetProvider>
        </div>
    </Router>
  );
}

export default App;
