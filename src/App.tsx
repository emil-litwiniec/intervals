import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from '@/views/mainView/MainView';

function App() {
    return (
        <main>
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
