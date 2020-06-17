import React from 'react';
import {url,defaultImage} from './Data';
import {navigate} from '@reach/router';
import { graphql } from 'react-apollo';
import {getBlogsQuery} from './queries';


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
/*    async componentDidMount(){
        const url1=`${url}/blogs`;
        const blogs = await fetch(url1).then(response=>response.json());
        this.setState({
            blogs:blogs
        })
    }
*/
    render(){
        const data = this.props.data;
        if(data.loading||data.blogs==null){
            return(
                <div>
                    Loading blogs...
                </div>
            )
        }
        const {blogs} =data;
        return(
        <div>
            {
                blogs.map(blog=>(
                    <div className="blog">
                    <a href="#" onClick={(e)=>{e.preventDefault();navigate(`/blog/${blog.id}`)}}>
                    <div >
                    <img src={blog.image!=null?blog.image:defaultImage} className="logo"></img>
                    <h1>{blog.title}</h1>
                    <h2>{blog.author.name}</h2>
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
export default graphql(getBlogsQuery)(Blog);