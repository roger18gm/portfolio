import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './App.css';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import { Box } from '@mui/material';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage /> 
      },
      {
        path: 'work',
        element: <WorkPage />
      },
      {
        path: 'projects',
        element: <ProjectsPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      }
    ]
  }
]

const router = createBrowserRouter(routes);

function App() {
  return (
    <Box 
    sx={{
      margin: "0px 20px"
    }}>
      <RouterProvider router={router}/>
    </Box>
  );
}

export default App;