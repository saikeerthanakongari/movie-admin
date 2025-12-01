import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// Fixed imports to match Capital 'P' in folder name
import Dashboard from './Pages/Dashboard';
import Movies from './Pages/Movies';
import Calendar from './Pages/Calendar';
import Kanban from './Pages/Kanban';

function App() {
  return (
    // Fixed typo: BrowserRouler -> BrowserRouter
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<Movies />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="kanban" element={<Kanban />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;