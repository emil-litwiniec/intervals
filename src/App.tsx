import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from '@/views/mainView/MainView';
import './styles/App.scss';

function App() {
    return (
        <main className="main-wrapper">
            <Router>
                <Switch>
                    <Route exact={true} path="/" component={MainView} />
                    {/* <Route path="" component={EditWorkoutView} /> */}
                    {/* <Route path="/workout/:workoutId" component={WorkoutView}/> */}
                </Switch>
            </Router>
        </main>
    );
}

export default App;
