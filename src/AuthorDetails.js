import React from 'react';
import {url, authors} from './Data';
import {navigate} from '@reach/router';
import {AuthorDetailsQuery} from './queries'
import { graphql } from 'react-apollo';

class AuthorDetails extends React.Component{
	constructor(props){
        super(props);
        this.state={
			id:props.id,
            author:null,
        }
	}
	
/*    async componentDidMount(){
        const url1=`${url}/author/${this.state.id}`;
		const author = await fetch(url1).then(response=>response.json());
        this.setState({
			author:author,
		})
		if(author==null){
			document.getElementById('notLoaded').innerHTML ="Sorry... Author detailes can not be loaded at this moment"	
		}
    }
*/
	render(){
		const data = this.props.data;
		if(data.loading||data.author==null)
			return(
				<div>				
					<h1 id="notLoaded">Loading... Please wait a moment</h1>
				</div>
			)
			const {author} = data;
			const {name,age,city,id} = author;
		return (
			<div>
			<h1>{name}</h1>
			<h2>{`${age} year old`}</h2>
			<h2>from beautiful city of {city}</h2>
			{<a href={`/authorblogs/${id}`} onClick={e=>{e.preventDefault();navigate(`/authorblogs/${id}`)}}>See all blogs</a>}
			</div>
		)
	}
}
export default graphql(AuthorDetailsQuery,{
	options:(props)=>{
		return {
			variables:{
				id:props.id
			}
		}
	}
})(AuthorDetails);
