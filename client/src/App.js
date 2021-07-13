import style from './App.module.css';

import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import PaisesBuscados from './components/SearchedCountry/PaisesBuscados';
import FiltradosContinente from './components/ContinentFilter/FiltradosContinente';
import FiltradosActividad from './components/ActivityFilter/FiltradosActividad';
import DetallePais from './components/CountryDetail/DetallePais';
import OrderFilter from './components/OrderFilter/OrderFilter';
import PostActivity from './components/PostActivity/PostActivity';
import Enter from './components/Enter';

function App() {
  return (
    <>
      <Route exact path="/" component={Enter} />
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
