
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom"
import Videogames from './pages/Videogames';
import VideogamesDetails from './pages/VideogamesDetails';
import Profile from './pages/user/Profile';
import Collections from './pages/user/Collections';
import ProfileEdit from './pages/user/ProfileEdit';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Error from './pages/error/Error';
import NotFound from './pages/error/NotFound';

// Componentes

import IsPrivate from './components/IsPrivate';
import MyNavbar from './components/MyNavbar';
import VideogamesPlatform from './pages/VideogamesPlatforms';

function App() {
  return (
    <div className="App">

    <MyNavbar/> 

    <Routes>
      <Route path={"/"} element={ <Home/> } />
      <Route path={"/videogames"} element={ <Videogames/> } />
      <Route path={"/videogames/:id/details"} element={ <VideogamesDetails/> } />
      <Route path={"/videogames/platform"} element={ <VideogamesPlatform/> } />
      <Route path={"/profile"} element={ <IsPrivate> <Profile/> </IsPrivate> } />
      <Route path={"/profile/:id/edit"} element={ <IsPrivate> <ProfileEdit/> </IsPrivate> } />
      <Route path={"/profile/collections"} element={ <IsPrivate> <Collections/> </IsPrivate>} />
      <Route path={"/signup"} element={ <Signup/> } />
      <Route path={"/login"} element={ <Login/> } />

      {/* ---------- */}

      <Route path={"/error"} element={ <Error/> } />
      <Route path={"*"} element={ <NotFound/> } />

    </Routes>
      
    </div>
  );
}

export default App;
