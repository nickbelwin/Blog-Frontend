import logo from './logo.svg';
import InsertBlog from './Blogs/InsertBlog';
import { Route, Routes, Link } from "react-router-dom";
import './App.css';
import AddNewBlog from './Blogs/AddNewBlog';
import Header from './Header/Header';
import Home from './Home/Home'
import BlogDetails from './Blogs/BlogDetails';
import BlogByCategory from './Blogs/BlogByCategory';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Header />} >
          <Route index element={<Home/>} />
          <Route path='/blog-details/:id' element={<BlogDetails/>} />
          <Route path='/blogs-category/:category' element={<BlogByCategory/>} />
        </Route>
        <Route path='/add-new-blog' element={<AddNewBlog />} />
      </Routes>
    </div>
  );
}

export default App;
