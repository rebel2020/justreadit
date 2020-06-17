import React,{useState} from 'react';
import { url, authors } from './Data';
import { navigate } from '@reach/router';
import { ObjectID } from 'mongodb';
import { graphql } from 'react-apollo';
const axios = require('axios');
import {addBlogMutation, authorByEmailQuery, addAuthorMutation} from './queries';
import {flowRight as compose } from 'lodash';

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
        const author = this.props.authorByEmailQuery.authorByEmail;
        return author;
/*        const url1=`${url}/author_by_email/${this.state.email}`;
        const author = await fetch(url1).then(response=>response.json());
        return author;*/
    }

    async addNewAuthor(){
        const data=await this.props.addAuthorMutation({
                    variables:{
                        name:this.state.authorName,
                        email:this.state.email
                    }
        });
        if(data==null||data.data==null)
        return -1;
        return data.data.addAuthor.id;
    }

    async saveBlog(e){
        e.preventDefault();



        const aId =await this.addAuthor();
        const data=await this.props.addBlogMutation({
            variables:{
                title:this.state.title,
                tags:this.state.tags,
                aId:aId,
                content:this.state.content,
                image:this.state.image
            }
        })
        if(data==null||data.data==null){
            document.getElementById("couldNotSave").innerHTML="Soory... could not save the blog please try again";
        }
        else
        {
            navigate(`/blog/${data.data.addBlog.id}`);
        }
        return;
/*        const url1=`${url}/addblog`;
        const {tags,title,authorName,content,image}=this.state;
        const temp = await axios.post(url1,{blog:{title:title,tags:tags,author:authorName,aId:ObjectID(aId),content:content,image:image}}).then(response=>response.data);
        if(temp.status)
        navigate(`/blog/${temp._id}`);
        else{
            console.log("Could not save");
            document.getElementById("couldNotSave").innerHTML="Soory... could not save the blog please try again"
        }
        return temp.status;*/
    }

    async addAuthor(){
        const tempAuthor =await this.isNewAuthor();
        if(tempAuthor==null)
        {
            const aId = await this.addNewAuthor();
            return aId;
        }
        return tempAuthor.id;
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
export default compose(
    graphql(addBlogMutation,{name:"addBlogMutation"}),
    graphql(authorByEmailQuery,{name:"authorByEmailQuery",
    options:(props)=>{
        return {
            variables:{
                email:props.location.state.email
            }
        }
    }
    }),
    graphql(addAuthorMutation,{name:"addAuthorMutation"})
)(Blog);