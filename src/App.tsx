import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { MainView, EditView, WorkoutView } from '@/views';
import handleFocusOutline from '@/utils/handleFocusOutline';
import './styles/App.scss';
import Logotype from './misc/Logotype';

function App() {
    useEffect(() => {
        handleFocusOutline();
    }, []);

    const LogotypeLink: React.FC = () => (
        <div className="logotype__wrapper">
            <Link to="/">
                <Logotype />
            </Link>
        </div>
    );

    return (
        <main className="main-wrapper">
            <Router>
                <LogotypeLink />
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
