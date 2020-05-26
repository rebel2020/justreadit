import React,{useState} from 'react';
import { url, authors } from './Data';
import { navigate } from '@reach/router';
import { ObjectID } from 'mongodb';
const axios = require('axios');

class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            props:props.location,
            content:""
        }
	}
    async componentDidMount(){
        await this.setState({
            title:this.state.props.state.title,
            authorName:this.state.props.state.name,
            tags:this.state.props.state.tags,
            email:this.state.props.state.email,
            image:this.state.props.state.image,
        })
    }

    async isNewAuthor(){
        const url1=`${url}/author_by_email/${this.state.email}`;
        const author = await fetch(url1).then(response=>response.json());
        return author;
    }

    async addNewAuthor(){
        const url1=`${url}/addauthor`;
        const {email,authorName}=this.state;
        const temp =await axios.post(url1,{author:{email:email,name:authorName}}).then(response=>response.data);
        return temp.status._id;    
    }

    async saveBlog(e){
        e.preventDefault();
        const aId =await this.addAuthor();
        const url1=`${url}/addblog`;
        const {tags,title,authorName,content,image}=this.state;
        const temp = await axios.post(url1,{blog:{title:title,tags:tags,author:authorName,aId:ObjectID(aId),content:content,image:image}}).then(response=>response.data);
        if(temp.status)
        navigate(`/blog/${temp._id}`);
        else{
            console.log("Could not save");
            document.getElementById("couldNotSave").innerHTML="Soory... could not save the blog please try again"
        }
        return temp.status;
    }

    async addAuthor(){
        const tempAuthor =await this.isNewAuthor();
        if(tempAuthor==null)
        {
            const aId = await this.addNewAuthor();
            return aId;
        }
        return tempAuthor._id;
    }

    render(){
        const {content} =this.state;
        return (
            <div className="textarea-container" >
                <h2 id="couldNotSave" style={{color:'red'}}></h2>
                <form onSubmit={e=>this.saveBlog(e)}>
                    <textarea id="area" placeholder="Start writing your blog" value={content} onChange={e=>{this.setState({content:e.target.value});document.getElementById('arsh').innerHTML=
                        document.getElementById("area").value.replace(/\n/g,'<br />')}}></textarea>
                <button type="submit" >Save blog</button>
                </form>
                <div className="writeBlog" id="arsh" ><h4>{content}</h4></div>
            </div>
        )    
    }
}
export default Blog;