import { Route } from 'react-router-dom';
import './App.css';
import CartDetail from './components/CartDetail';
import CategoryPage from './components/CategoryPage';
import NavBar from './components/NavBar';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <div className="App">
      <Route path={'/'} component={NavBar}/>
      <Route exact path={'/resume/cart'}>
        <CartDetail/>
      </Route>
      <Route exact path={'/home/:category'} component={CategoryPage}/>
      <Route exact path={'/home/:category/:id'} component={ProductDetail}/>      
    </div>
  );
}

export default App;
