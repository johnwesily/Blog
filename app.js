const express =require("express");
const bodyParse=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");

const app=express();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// const posts=[];
app.set("view engine",'ejs');

app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://john:Test-1234@cluster0.kacofmo.mongodb.net/Blog?retryWrites=true&w=majority');

const BlogSchema={
     title:String,
     post:String
};

const Blog=mongoose.model("Blog",BlogSchema);



app.listen(3500,function(){
  console.log("server is running at port 3500");

})


app.get("/",function(req,res){

  Blog.find({}).then(function(posts){
    res.render("home",{paragraph:homeStartingContent,blogs:posts});

  })



})

app.get("/posts/:blogid",function(req,res){
  //console.log(req.params.test);
  // const reqtitle=_.lowerCase(req.params.test)
  const requestPostid=req.params.blogid;

 Blog.findOne({_id:requestPostid}).then(function(post){
   res.render("post",{title:post.title,blog:post.post});
 });

  // posts.forEach(function(post){
  //   if(_.lowerCase(post.title) === reqtitle){
  //     res.render("post",{
  //     title:post.title,
  //     blog:post.post
  //   });
  //   }

  // });
});


app.get("/about",function(req,res){
  res.render("about",{paragraph:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{paragraph:contactContent});

})


app.get("/compose",function(req,res){
  res.render("compose");
})



app.post("/compose",function(req,res){
    const blog=new Blog({
      title:req.body.title,
      post:req.body.post
    });
     blog.save()
     res.redirect("/");

    // posts.push(blog);


})

app.post("/",function(req,res){
  res.redirect("/compose");
})
