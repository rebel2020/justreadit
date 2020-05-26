import React,{useState} from 'react';
import {navigate} from '@reach/router';

const Blog=()=>{
    const [author,setAuthor]=useState("");
    const [title,setTitle]=useState("");
    const [tags,setTags] = useState([]);
    const [tag,setTag] = useState("");
    const [email,setEmail] = useState("");
    const [image,setImage] = useState("");

    const formSubmit = (e)=>{
        e.preventDefault();
        navigate('/write',{state:{title:title,name:author,tags:tags,email:email,image:image}});
    }

    const addTag = (e)=>{
        e.preventDefault();
        let temp=tags;
        temp.push(tag.toLowerCase());
        setTags(temp);
        setTag("");
    }

    const removeTag=(e)=>{
        e.preventDefault();
        let temp=tags;
        temp.push("A");
        setTags(temp);
        console.log("A");
    }
    return (
        <div>
            <h2 style={{color:'darkblue'}}>welcome to justreadit. Please enter the relevent information before writing the blog.</h2>
            <form onSubmit={formSubmit}>
                <table>
                <tr>
                    <td>
                    <label>Title</label>
                    </td>
                    <td>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>Author</label>
                    </td>
                    <td>
                    <input type="text" value={author} onChange={e=>setAuthor(e.target.value)}></input>
                    </td>
                </tr>

                <tr>
                    <td>
                    <label>Email</label>
                    </td>
                    <td>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>Image URL</label>
                    </td>
                    <td>
                    <input type="text" value={image} onChange={e=>setImage(e.target.value)}></input>
                    </td>
                </tr>
                <tr><br></br></tr>
                <tr>
                    <td>
                    <button className="submit" style={{padding:'5px 30px',marginLeft:'60px'}}>Go to write blog</button>
                    </td>
                    <td></td>
                </tr>
                </table>
            </form>
            {
                tags.map(tag=>(<button className="buttonActive" onClick={e=>e.preventDefault()}>{tag}</button>))
            }
            <button className="submit" onClick={e=>setTags([])} style={{'marginLeft':30, 'backgroundColor':'blue'}}>Reset Tags</button>            
            <form onSubmit={addTag} style={{'marginTop':10}}>
                <label>Add tags</label>
                <input type="text" value={tag} onChange={e=>setTag(e.target.value)} placeholder="Enter your tag here"></input>
            </form>
        </div>
    )
}
export default Blog;