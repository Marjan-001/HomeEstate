import { BrowserRouter, Routes , Route} from "react-router-dom";
import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Register from "./pages/Register";
import Header from "./components/Header";
function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>
  </BrowserRouter>

 
}

export default App;
