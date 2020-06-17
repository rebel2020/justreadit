import React from 'react';
import {blogs, url} from './Data';
import {navigate} from '@reach/router';
import {graphql} from 'react-apollo';
import {AuthorBlogsQuery} from './queries'

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
/*    async componentDidMount(){
        const url1 = `${url}/authorblogs/${this.state.id}`;
        const authorBlogs =await fetch(url1).then(response=>response.json());
        this.setState({
            authorBlogs:authorBlogs
        })
    }
*/
    render(){
        const data = this.props.data;
        if(data.loading){
            return (<div>
                <h1>Loading blogs...</h1>
            </div>)
        }
        const {authorBlogs} = data;
        return(
            <div>
                <button type="submit" onClick={(e)=>getAuthor(props.id)}>go back to Author details</button>
                {
                    authorBlogs.map(blog=>(
                        <div className="blog">
                        <a href={`/blog/${blog.id}`} onClick={e=>{e.preventDefault();navigate(`/blog/${blog.id}`)}} >
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
export default graphql(AuthorBlogsQuery,{
    options:(props)=>{
        return {
            variables:{
                aId:props.id
            }
        }
    }
})(Blog);