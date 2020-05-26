//main();
main1();
async function main(){
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    
    const url = 'mongodb://rebel:rebel123@192.168.43.4:27017';
    const client = new MongoClient(url,{useNewUrlParser: true});
    db = await client.connect();

/*    await db.db('blogs').collection('Blog').insertMany([{id:1,title:"Continuous Delivery using kubernetes",author:"Brijesh Dhakar",aId:1,tags:["kubernetes","docker","software"],content:""},
	{id:2,title:"Hunger games",author:"Aman singh",aId:2,tags:["thriller","adventure"],content:""},
	{id:3,title:"harry potter",author:"Abhay pratap singh",aId:3,tags:["childern","comic","magic"],content:""},
	{id:4,title:"Kubernetes",author:"Prashant Sharma",aId:4,tags:["kubernetes","docker"],content:""}
    ]);
    
    await db.db('blogs').collection('Author').insertMany([{id:1,name:"Brijesh Dhakar",age:22,city:"Gwalior"},
	{id:2,name:"Prashant Sharma",age:22,city:"Agra"},
	{id:3,name:"Aman singh",age:27,city:"Bangalore"},
	{id:4,name:"Abhay pratap singh",age:15,city:"Morena"}
    ])
    
    await db.db('blogs').collection('Tag').insertMany([{tag:"kubernetes"},{tag:"docker"},{tag:"magic"},{tag:"thriller"},{tag:"childern"},{tag:"software"},{tag:"comic"}]);
*/
    await db.db('blogs').collection('Blog').find({}).toArray(function(err,result){
        if(err) throw console.err;
        console.log(result);
        
    });
    client.close(); 
}
async function main1(){
    const mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    mongoose.connect('mongodb://rebel:rebel123@127.0.0.1:27017/blogs',{useNewUrlParser: true});
    
    const Blog = mongoose.model('Blogs',new Schema({},{ collection : "Blog" }));

    console.log(await Blog.find());
    var db =mongoose.connection;
    mongoose.connection.close();

}









import React,{useEffect,useState} from 'react';
import {blogs} from './Data';

const BlogDetails = (props)=>{
	let blog=blogs.filter(e=>e.id==props.id);
	const [value,setValue] = useState("");
	console.log(content)
	useEffect(()=>{
		if(content!=null)
		document.getElementById('content').innerHTML =content.replace(/\n/g,'<br />');
	})
	if(blog.length==0)
		return(
				<div>
					<h1>Sorry... The blog is not available at this moment</h1>
				</div>
			)

	blog=blog[0];
	const {title,author,img,content} = blog;
	return (
			<div>
			<img src={img} className="logo"/>
			<h1>{title}</h1>
			<h2>written by- {author}</h2>
			<br></br>
			<div style={{backgroundColor:'white',marginLeft:150,marginRight:150}}>
				<h4 style={{marginLeft:40,marginRight:40}} id="content" value={content}></h4>
			</div>
			</div>
		)
}
export default BlogDetails;