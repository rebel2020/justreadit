const graphql = require('graphql');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Tag = require('../models/Tag');
const Blog = require('../models/Blog');
const ObjectId = require('mongodb').ObjectID;

const {GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
  } = graphql;

  const TagType = new GraphQLObjectType({
      name:"Tag",
      fields:()=>({
          id:{type:GraphQLString},
          tag:{type:GraphQLString}
      })
  })

  const BlogType = new GraphQLObjectType({
      name:"Blog",
      fields:()=>({
        id:{type:GraphQLString},
        title:{type:GraphQLString},
        aId:{type:GraphQLString},
        content:{type:GraphQLString},
        image:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return Author.findById(parent.aId)
            }
        },
        tags:{
            type:GraphQLList(TagType),
            resolve(parent,args){
                return Tag.find({tag:{$in: parent.tags}})
            }
        }
        
      })
  });

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        city:{type:GraphQLString},
        age:{type:GraphQLString},
        email:{type:GraphQLString},
        blog:{
            type: GraphQLList(BlogType),
            resolve(parent,args){
                return Blog.find({aId:parent.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        blog:{
            type:BlogType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return Blog.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return Author.findById(args.id);
            }
        },
        blogs:{
            type:GraphQLList(BlogType),
            resolve(parent,args){
                return Blog.find({});
            }
        },
        authorBlogs:{
            type:GraphQLList(BlogType),
            args:{aId:{type:GraphQLString}},
            resolve(parent,args){
                return Blog.find({aId:args.aId});
            }
        },
        tag:{
            type:TagType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return Tag.findById(args.id);
            }
        },
        tags:{
            type:GraphQLList(TagType),
            resolve(parent,args){
                return Tag.find();
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find();
            }
        },
        authorByEmail:{
            type:AuthorType,
            args:{email:{type:GraphQLString}},
            resolve(parent,args){
                return Author.findOne({email:args.email});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLString},
                city:{type:GraphQLString},
                email:{type:GraphQLString}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age,
                    city:args.city,
                    email:args.email
                })
                return author.save();
            }
        },
        addBlog:{
            type:BlogType,
            args:{
                title:{type:GraphQLString},
                aId:{type:GraphQLString},
                tags:{type: new GraphQLList(GraphQLString)},
                content:{type:GraphQLString},
                image:{type:GraphQLString}
            },
            resolve(parent,args){
                let blog = new Blog({
                    title:args.title,
                    aId:args.aId,
                    tags:args.tags,
                    content:args.content,
                    image:args.image
                })
                return blog.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})