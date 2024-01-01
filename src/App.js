import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';
import Error from './screens/Error';
import Login from './screens/Login';
import Register from './screens/Register';
import Blog from './screens/Blog';
import Compose from './screens/Compose';
import Update from './screens/Update';
import MyBlogs from './screens/Myblogs';
import Control from './screens/Control';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/*' element={<Error/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/blog/:id' element={<Blog/>} />
          <Route path='/control/:id' element={<Control/>} />
          <Route path='/myblog' element={<MyBlogs/>} />
          <Route path='/compose' element={<Compose/>} />
          <Route path='/update/:id' element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
