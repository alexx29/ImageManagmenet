import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from '../components/HomePage/HomePage.jsx';
import Editable from '../components/Editable/Editable.jsx';

const App = () => {
    return (
      <Router>
          <Switch>
            <Route path="/Editable">
              <Editable />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
      </Router>
    );
  }

export default App;
