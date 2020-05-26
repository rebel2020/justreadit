import React from 'react';
import Blog from './Blog';
const axios = require('axios');
const ip = '52.15.221.201';
const defaultImage = "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6";
const url=`https://cors-anywhere.herokuapp.com/http://${ip}:3000`;

var blogs=[];
let tags=[];
let authors=[];

const Data=()=>{
/*	blogs=[{id:1,title:"Continuous Delivery using kubernetes",author:"Brijesh Dhakar",img:require("./static/1.png"),aId:1,tags:["kubernetes","docker","software"],content:""},
	{id:2,title:"Hunger games",author:"Aman singh",img:require("./static/2.jpeg"),aId:2,tags:["thriller","adventure"],content:""},
	{id:3,title:"harry potter",author:"Abhay pratap singh",img:require("./static/3.jpg"),aId:3,tags:["childern","comic","magic"],content:""},
	{id:4,title:"Kubernetes",author:"Prashant Sharma",img:require("./static/4.png"),aId:4,tags:["kubernetes","docker"],content:""}
	];
	authors = [{id:1,name:"Brijesh Dhakar",age:22,city:"Gwalior"},
	{id:2,name:"Prashant Sharma",age:22,city:"Agra"},
	{id:3,name:"Aman singh",age:27,city:"Bangalore"},
	{id:4,name:"Abhay pratap singh",age:15,city:"Morena"}
	];
	tags = ["kubernetes","docker","magic","thriller","childern","software","comic"];*/

/*
	fetch(`https://cors-anywhere.herokuapp.com/http://${ip}:3000/blogs`).then(response=>response.json().then(data1=>{
		blogs=data1;
		console.log(data1);
	}),console.error);

	fetch(`https://cors-anywhere.herokuapp.com/http://${ip}:3000/authors`).then(response=>response.json().then(data1=>{
		authors=data1;
		console.log(data1);
	}),console.error);

	fetch(`https://cors-anywhere.herokuapp.com/http://${ip}:3000/tags`).then(response=>response.json().then(data1=>{
		tags=data1;
		console.log(data1);
	}),console.error);
*/

	return(
		<div>
		</div>
	)
}
const getUrl=()=>{return url=`https://cors-anywhere.herokuapp.com/http://${ip}:3000`};
const newUser={
	name:"",
	email:"this.state.email",
	password:"this.state.password",
	password2:"this.state.password2"
  }
async function postBlog(Blog){
	axios.post(`https://cors-anywhere.herokuapp.com/http://${ip}:3000/blog`,{Blog});
}

export {blogs,authors,tags,Data,postBlog,getUrl,url,defaultImage};