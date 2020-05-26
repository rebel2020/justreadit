import React from 'react';
import {blogs} from './Data';
import { Link } from '@reach/router';
import SearchBar from './SearchBar';

const SearchBlogs = ({props,location})=>{
    const tags=location.state.tags;
    const blogList  = blogs.filter(e=>check(e));

    function check(blog){
        let res=true;
        for(var i=0;i<tags.length;i++){
            res=blog.tags.find(e=>e==tags[i])!=null;
            if(res==false)
            return false;
        }
        return true;
    }
    return (
        <div>
            <SearchBar></SearchBar>
            {
                blogList.map(blog=>(
                <div className="blog">
                    <Link to={`/blog/${blog.id}`}><h1>{blog.title}</h1></Link>
                    <h2>{blog.author}</h2>
                </div>
                ))
            }
        </div>
    )
}
export default SearchBlogs;