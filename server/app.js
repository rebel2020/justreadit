const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { concatAST } = require('graphql');
const Test = mongoose.model('Test',new mongoose.Schema({id:String},{ collection: 'Book' }));

const cors=require('cors');

app.use(cors());
mongoose.connect('mongodb+srv://rebel:rebel123@cluster0-x8mg3.mongodb.net/blogs?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
    console.log("connected to the online database");
})


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}
));
app.get('/book',async function(req,res){
    const data = await fun(); 
    console.log(data);
    res.json(data);
})
async function fun(){
//    await mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
//    await mongoose.connect('mongodb+srv://peesu:peesu@cluster0-cp70c.mongodb.net/graphql?retryWrites=true&w=majority');
    await mongoose.connect('mongodb+srv://rebel:rebel123@cluster0-x8mg3.mongodb.net/blogs?retryWrites=true&w=majority');
    const x =await Test.find();
    console.log(x);
    return x;
}
app.listen(4000,()=>{
    console.log("listening on port 4000...")
});