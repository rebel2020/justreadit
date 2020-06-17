import React from 'react';
import {url} from './Data';
import {navigate} from '@reach/router'
import { graphql } from 'react-apollo';
import {getAuthorsQuery} from './queries';

class Author extends React.Component{
    constructor(props){
        super(props);
        this.state={
            authors:[],
        }
    }
/*    async componentDidMount(){
        const url1=`${url}/authors`;
        const authors = await fetch(url1).then(response=>response.json());
        this.setState({
            authors:authors
        })
    }
*/
    render(){
        const data = this.props.data;
        if(data.loading||data.authors==null){
            return(
                <div>
                    Loading authors...
                </div>
            )
        }
        const {authors} = data;
        return (
            <div>
                {
                    authors.map(author=>(
                        <a href="#" onClick={(e)=>{e.preventDefault();navigate(`/author/${author.id}`)}}>
                        <div className="blog">
                        <h1>{author.name}</h1>
                        <h2>{author.age}</h2>
                        </div>
                        </a>
                    ))
                }
            </div>
            )
    }
}
export default graphql(getAuthorsQuery)(Author);