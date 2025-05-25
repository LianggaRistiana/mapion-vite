import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import Login from './pages/login';
import { Toaster } from 'sonner';
import Register from './pages/register';
import Welcome from './pages/welcome';
import { RegionProvider } from './Context/RegionContext';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={
          <RegionProvider>
            <Home />
          </RegionProvider>
        } />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
