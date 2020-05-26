import React from 'react';
import {url,defaultImage} from './Data';
import {navigate} from '@reach/router';


const getAuthor = (authorId)=>{
    navigate(`/author/${authorId}`)
}
class Blog extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            blogs:[],
        }
    }
    async componentDidMount(){
        const url1=`${url}/blogs`;
        const blogs = await fetch(url1).then(response=>response.json());
        this.setState({
            blogs:blogs
        })
    }

    render(){
        const {blogs} =this.state;
        return(
        <div>
            {
                blogs.map(blog=>(
                    <div className="blog">
                    <a href="#" onClick={(e)=>{e.preventDefault();navigate(`/blog/${blog._id}`)}}>
                    <div >
                    <img src={blog.image!=null?blog.image:defaultImage} className="logo"></img>
                    <h1>{blog.title}</h1>
                    <h2>{blog.author}</h2>
                    </div>
                    </a>
                    <button type="submit" onClick={(e)=>getAuthor(blog._id)}>Know about Author</button>
                    </div>
                ))
            }
        </div>
        )
    }
}
export default Blog;