import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from '../components/HomePage/HomePage.jsx';
import EditableContainer from '../components/Editable/EditableContainer.jsx';

const App = () => {
    return (
      <Router>
          <Switch>
            <Route path="/Editable">
              <EditableContainer />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
      </Router>
    );
  }

export default App;
