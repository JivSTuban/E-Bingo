import { Routes, Route } from 'react-router-dom';
import App from './App';
import PlayerDashboard from './PlayerDashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/bingo/play/:gameCode" element={<PlayerDashboard />} />
    </Routes>
  );
}

export default AppRoutes;