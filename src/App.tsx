import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainView, EditView, WorkoutView } from '@/views';
import handleFocusOutline from '@/utils/handleFocusOutline';

import './styles/App.scss';

function App() {
    useEffect(() => {
        handleFocusOutline();
    }, []);

    return (
        <main className="main-wrapper">
            <Router>
                <Switch>
                    <Route exact={true} path="/" component={MainView} />

                    <Route path="/edit/:workoutId" component={EditView} />
                    <Route path="/create" component={EditView} />

                    <Route path="/workout/:workoutId" component={WorkoutView} />
                </Switch>
            </Router>
        </main>
    );
}

export default App;
