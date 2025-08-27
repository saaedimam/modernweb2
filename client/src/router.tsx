import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Manufacturing from './pages/Manufacturing';
import Sustainability from './pages/Sustainability';
import Gallery from './pages/Gallery';
import Stocks from './pages/Stocks';
import Contact from './pages/Contact';
import NotFound from './error/NotFound';

export default function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/manufacturing" component={Manufacturing} />
      <Route path="/sustainability" component={Sustainability} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/stocks" component={Stocks} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}
