import React,{useState,useEffect} from 'react';
import {tags,blogs,getUrl,url} from './Data';
import { navigate,Link} from '@reach/router';

const SearchBar = ()=>{
    let searchTags=[];
    const  [blogList,setBlogList]  = useState(blogs.filter(e=>check(e)));

    let tagList=tags.map((tag)=>{return ({'tag':tag,'state':false})});
    var list = tagList.map(tag=>{return useState(tag.tag)});



fetch(`${url}/tags`).then(response=>response.json().then(data=>{
    const temp =blogs;
    tagList=temp.map((tag)=>{return ({'tag':tag,'state':false})});
    
}))
console.log(tagList);
//list = tagList.map(tag=>{return useState(tag.tag)});



const search = ()=>{
//        const result= list.filter(e=>e[0].state).map(tag=>tag[0].tag);
//        navigate('/searchblogs',{state:{tags:result}});
        searchTags=list.filter(e=>e[0].state).map(tag=>tag[0].tag);
        setBlogList(blogs.filter(e=>check(e)));
    }

/*    useEffect(()=>{
        console.log(url);
        fetch(`${url}/tags`).then(response=>response.json().then(data=>{
            const temp =blogs;
            tagList=temp.map((tag)=>{return ({'tag':tag,'state':false})});
            list = tagList.map(tag=>{return useState(tag.tag)});
//            console.log(list);
        }))
    })*/

    function check(blog){
        let res=true;
        for(var i=0;i<searchTags.length;i++){
            res=blog.tags.find(e=>e==searchTags[i])!=null;
            if(res==false)
            return false;
        }
        return true;
    }


    return(
        <div>
            {
                list.map(tag=>(<button onClick={()=>{tag[1]({'tag':tag[0].tag,'state':!tag[0].state})}} className={tag[0].state?"buttonActive":"buttonInactive"}>{tag[0].tag}</button>))
            }
            <br/>
            <button className="submit" onClick={search}>Search</button>
            {
                blogList.map(blog=>(
                <div className="blog">
                    <Link to={`/blog/${blog.id}`}><h1>{blog.title}</h1></Link>
                    <h2>{blog.author}</h2>
                </div>
                ))
            }

        </div>
    )
}
export default SearchBar;