import React from 'react';
import {blogs, url} from './Data';
import {navigate} from '@reach/router';

const getAuthor = (authorId)=>{
    navigate(`/author/${authorId}`)
}
class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state={
			id:props.id,
            authorBlogs:[],
        }
	}
    async componentDidMount(){
        const url1 = `${url}/authorblogs/${this.state.id}`;
        const authorBlogs =await fetch(url1).then(response=>response.json());
        this.setState({
            authorBlogs:authorBlogs
        })
    }
    render(){
        const {authorBlogs} = this.state;
        return(
            <div>
                <button type="submit" onClick={(e)=>getAuthor(props.id)}>go back to Author details</button>
                {
                    authorBlogs.map(blog=>(
                        <div className="blog">
                        <a href={`/blog/${blog._id}`} onClick={e=>{e.preventDefault();navigate(`/blog/${blog._id}`)}} >
                        <div >
                        <img src={blog.image} className="logo"></img>
                        <h1>{blog.title}</h1>
                        </div>
                        </a>
                        </div>
                    ))
                }
            </div>
            )
    }

}
export default Blog;