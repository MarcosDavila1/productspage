import { Route } from 'react-router-dom';
import './App.css';
import CategoryPage from './components/CategoryPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Route path={'/home'} component={NavBar}/>
      <Route exact path={'/home/:category'} component={CategoryPage}/>
    </div>
  );
}

export default App;
