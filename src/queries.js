import gql from "graphql-tag";
import { graphql } from 'react-apollo';

const getBlogsQuery = gql`
    {
        blogs{
            id,
            title,
            author{
                name,
                city
            },
            image,
            tags{
                tag
            }
        }
    }
`
const getAuthorsQuery = gql`
    {
        authors{
            id,
            name,
            age,
            city
        }
    }
`


const BlogDetailsQuery = gql`
	query($id:String){
		blog(id:$id){
            id,
            title,
            author{
                name
            },
            image,
            content
		}
	}
`

const AuthorDetailsQuery = gql`
    query($id:String){
        author(id:$id){
            id,
            name,
            age,
            city
        }
    }
`

const AuthorBlogsQuery = gql`
    query($aId:String){
        authorBlogs(aId:$aId){
            id,
            title,
            author{
                name
            },
            image
        }
    }
`
const tagsQuery = gql`
    {
        tags{
            id,
            tag
        }    
    }
`

const searchBarQuery = gql`
    {
        blogs{
            id,
            title,
            author{
                name
            },
            tags{
                tag
            }
        },
        tags{
            id,
            tag
        }
    }
`

const addBlogMutation = gql`
    mutation($title:String,$tags:[String],$aId:String,$content:String,$image:String){
        addBlog(title:$title,tags:$tags,aId:$aId,content:$content,image:$image){
            id,
            title,
            content,
            image
        }
    }
`
const addAuthorMutation = gql`
    mutation($name:String!,$age:String,$city:String,$email:String!){
        addAuthor(email:$email,name:$name,age:$age,city:$city){
            id,
            email,
        }
    }
`
const authorByEmailQuery = gql`
    query($email:String!){
        authorByEmail(email:$email){
            id,
            email
        }
    }
`

export {BlogDetailsQuery,AuthorDetailsQuery,AuthorBlogsQuery,tagsQuery,searchBarQuery,addBlogMutation,authorByEmailQuery,addAuthorMutation,getBlogsQuery,getAuthorsQuery};