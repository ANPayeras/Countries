import './App.css';

import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PaisesBuscados from './components/PaisesBuscados';
import FiltradosContinente from './components/FiltradosContinente';
import FiltradosActividad from './components/FiltradosActividad';
import DetallePais from './components/DetallePais';
import OrderFilter from './components/OrderFilter';
import PostActivity from './components/PostActivity';

// Estado UseContext
// import UserState from './context/UserState';


function App() {
  return (
    <>

      <Route exact path="/">
        <Link to='/home'> INGRESAR </Link>
      </Route>
      <Route path="/home" component={Home} />
      <Route path="/paisesbuscados" component={PaisesBuscados} />
      <Route path="/filtradoscontinente" component={FiltradosContinente} />
      <Route path="/filtradosactividad" component={FiltradosActividad} />
      <Route path="/OrderFilter" component={OrderFilter} />
      <Route path="/detallepais/:id" render={({ match }) => <DetallePais match={match} />} />
      <Route exact path="/postactivity" component={PostActivity} />

    </>
  );
}

export default App;
