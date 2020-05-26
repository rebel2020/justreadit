import React,{useEffect,useState} from 'react';
import {url,defaultImage} from './Data';

class BlogDetails extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id:props.id,
			blog:null,
			value:""
		}
	}

	async componentDidMount(props){
		const url1=`${url}/blog/${this.state.id}`;
		const blog =await  fetch(url1).then(response=>response.json());
		this.setState({
			blog:blog
		})
		if(blog.content!=null)
		document.getElementById('content').innerHTML =blog.content.replace(/\n/g,'<br />');	
		if(blog==null){
			document.getElementById('notLoaded').innerHTML ="Sorry... Blog can not be loaded at this moment"	
		}
	}
	render(){
		const {blog} = this.state;
		if(blog==null)
		return(
			<div>
				<h1 id="notLoaded">Loading... Please wait a moment</h1>
			</div>
		)
		const {title,author,image,content} = blog;
		return (
			<div>
			<img src={image!=null?image:defaultImage} className="logo"/>
			<h1>{title}</h1>
			<h2>written by- {author}</h2>
			<br></br>
			<div style={{backgroundColor:'white',marginLeft:150,marginRight:150}}>
				<h4 style={{marginLeft:40,marginRight:40}} id="content" value={content}></h4>
			</div>
			</div>
		)
	}

}
export default BlogDetails;