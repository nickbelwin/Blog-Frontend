import logo from './logo.svg';
import InsertBlog from './Blogs/InsertBlog';
import { Route, Routes, Link } from "react-router-dom";
import './App.css';
import AddNewBlog from './Blogs/AddNewBlog';
import Header from './Header/Header';
import Home from './Home/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Header />} >
          <Route index element={<Home/>} />
          
        </Route>
        <Route path='/add-new-blog' element={<AddNewBlog />} />
      </Routes>
    </div>
  );
}

export default App;
