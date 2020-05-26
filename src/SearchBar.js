import React from 'react';
import {url} from './Data';
import {Link} from '@reach/router';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tags:[],
            tagstates:[],
            blogs:[],
            allBlogs:[],
            searchTags:[]
        }
    }
    async componentDidMount(){
        const tagList =await fetch(`${url}/tags`).then(response=>response.json());
        const blogList =await fetch(`${url}/blogs`).then(response=>response.json());
        this.setState({
            tags:tagList.map(tag=>tag.tag),
            tagstates:tagList.map(tag=>{return {tag:tag.tag,state:false}}),
            blogs:blogList,
            allBlogs:blogList,
        })
/*        console.log(this.state.tags);
        console.log(this.state.tagstates);
        console.log(this.state.blogs);
        console.log(this.state);*/
    }

    async search(e){
        e.preventDefault();
        const temp=this.state.tagstates.filter(e=>e.state).map(tag=>tag.tag);
        await this.setState({
            searchTags:temp
        })
        const temp1 =this.state.allBlogs.filter((e)=>this.check(e));
        this.setState({
            blogs:temp1
        })
    }
    check(blog){
        const {searchTags} = this.state;
        let res=true;
        for(var i=0;i<searchTags.length;i++){
            res=blog.tags.find(e=>e==searchTags[i])!=null;
            if(res==false)
            {
                return false;
            }
        }
        return true;
    }

    render(){
        const {tagstates} = this.state;
        return(
        <div>
            {
                
                tagstates.map(tag=>(<button onClick={(e)=>{
                    this.setState({tagstates:tagstates.map(e=>{
                        return {tag:e.tag,state:(tag.tag==e.tag?!e.state:e.state)}})
                    })
                }} className={tag.state?"buttonActive":"buttonInactive"}>{tag.tag}</button>))
            }

            <br/>
            <button className="submit" onClick={e=>this.search(e)}>Search</button>
            {
                this.state.blogs.map(blog=>{
                    return (
                        <div className="blog">
                            <Link to={`/blog/${blog.id}`}><h1>{blog.title}</h1></Link>
                            <h2>{blog.author}</h2>
                        </div>
                    )
                })
            }

        </div>
        )
    }
}
export default SearchBar;
