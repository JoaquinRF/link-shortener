import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Redirect from './pages/Redirect';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/:shortUrl" element={<Redirect />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
