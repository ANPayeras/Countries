import { Route } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import DetallePais from './components/CountryDetail/DetallePais';
import PostActivity from './components/PostActivity/PostActivity';
import Enter from './components/Enter';

function App() {
  return (
    <>
      <Route exact path="/" component={Enter} />
      <Route path="/home" component={Home} />
      <Route path="/detallepais/:id" render={({ match }) => <DetallePais match={match} />} />
      <Route exact path="/postactivity" component={PostActivity} />
    </>
  );
}

export default App;
