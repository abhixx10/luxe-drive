import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const About = lazy(() => import('./pages/About.jsx'));
const Booking = lazy(() => import('./pages/Booking.jsx'));
const Cars = lazy(() => import('./pages/Cars.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Media = lazy(() => import('./pages/Media.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));

const PageLoader = () => (
  <main className="grid min-h-screen place-items-center bg-night px-6 text-chrome">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-champagne border-t-transparent" />
  </main>
);

function App() {
  return (
    <div className="min-h-screen bg-night text-white">
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route path="/media" element={<Media />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
