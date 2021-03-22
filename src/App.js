import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth, createUserProfileDocument }  from './firebase/firebase.util';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';

//class component example
class App extends React.Component{

  constructor(){
    super();
    this.state = {
      currentUser:  null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser = { this.state.currentUser }/>
        <Switch>
          <Route exact path='/' component={Homepage} />
        </Switch>
      </div>
    );
  };
}

export default App;
