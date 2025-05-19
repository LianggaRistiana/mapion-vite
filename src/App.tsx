import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import Login from './pages/login';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
