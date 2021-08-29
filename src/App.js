import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import ProfilePage from "./components/profile";
import LoginPage from "./components/login";
import SignupPage from './components/signup';
import PrivateRoute from './components/privateRoute';
import AdDetail from './components/adDetail';
import HomePage from "./components/home";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import {login, checkAuthState} from "./store/actions/auth";

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(checkAuthState());
    }, [!auth.user,dispatch]);

  return (
    <div className="App">
        <Router>
          <Switch>
          <PrivateRoute exact path = "/" component={HomePage}/>
            <PrivateRoute exact path= "/profile" component={ProfilePage}/>
            <Route path= "/login" component={LoginPage} />
            <Route path= "/signup" component={SignupPage} />
            <PrivateRoute path="/ads/:adId" component={AdDetail} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
