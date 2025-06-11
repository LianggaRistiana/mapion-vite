import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import Login from './pages/login';
import { Toaster } from 'sonner';
import Register from './pages/register';
import Welcome from './pages/welcome';
import { RegionProvider } from './Context/RegionContext';
import AddRoad from './pages/add-road';
import { RoadStatProvider } from './Context/RoadStatsContext';
import Road from './pages/road';
import EditRoad from './pages/edit-road';
import PrivateRoute from './lib/PrivateRoute';

export default function App() {
  return (
    <RegionProvider>
      <RoadStatProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<PrivateRoute />} >
              <Route path="home" element={<Home />} />
              <Route path="add-road" element={<AddRoad />} />
              <Route path="edit-road/:id" element={<EditRoad />} />
              <Route path="road" element={<Road />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </RoadStatProvider>
    </RegionProvider>
  );
}
