import React from 'react';
import {render} from 'react-dom';
import Blog from './Blog';
import Author from './Author';
import {Router, Link} from "@reach/router";
import BlogDetails from './BlogDetails';
import AuthorDetails from './AuthorDetails';
import AuthorBlogs from './AuthorBlogs';
import SearchBlogs from './SearchBlogs';
import SearchBar from './SearchBar';
import AddBlog from './AddBlog';
import WriteBlog from './WriteBlog';
import {Data} from './Data';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";



const client = new ApolloClient({
    uri:'http://localhost:4000/graphql'
});


const App = ()=>{
    return (
        <ApolloProvider client={client}>
        <div>
        <ul >
        <li>
        <Link to='/'>
            <div className="header">Just read it</div>
        </Link>
        </li>
        <li>
        <Link to='/blogs'>
            <div className="navbar">Blogs</div>
        </Link>
        </li>
        <li>
        <Link to='/authors'>
            <div className="navbar">Authors</div>
        </Link>
        </li>
        <li>
        <Link to='/search'>
            <div className="navbar">Search</div>
        </Link>
        </li>
        <li>
        <Link to='/add'>
            <div className="navbar">Write a blog</div>
        </Link>
        </li>
        </ul>
        <Router>
        <WriteBlog path='/write'/>
        <AddBlog path="/add"/>
        <SearchBar path="/search"></SearchBar>
        <SearchBlogs path="/searchblogs"></SearchBlogs>
        <AuthorBlogs path='/authorblogs/:id'/>
        <AuthorDetails path='/author/:id'/>
        <BlogDetails path='/blog/:id'/>
        <Blog path="/blogs"/>
        <Author path="/authors"/>
        </Router>
        </div>
        </ApolloProvider>
    );
}
render(<App/>,document.getElementById("root"));