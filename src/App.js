import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { MenuBar } from './components';
import CovidState from './context/covid19API/covidState';
import { About, CoronaHelp, Home, NotFound } from './pages';
function App() {
  return (
    <CovidState>
      <div className="container">
        <BrowserRouter>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/corona-help" component={CoronaHelp} />
            <Route exact path="/corona-help-home" component={CoronaHelp} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </CovidState>
  );
}

export default App;
