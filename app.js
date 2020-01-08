let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let methodOverride = require("method-override");
let expressSanitizer = require("express-sanitizer");

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set("view engine", "ejs");
app.use(express.static("public")); // to serve custom stylesheets
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // has to come after bodyParser
app.use(methodOverride("_method")); //looks for '_method=' in a query string

// MONGOOSE/MODEL CONFIG 
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);

// RESTful ROUTES
app.get("/", (request, response) => {
    response.redirect("/blogs");
});

// INDEX
app.get("/blogs", (request, response) => {
    Blog.find({}, function(error, blogs){
        if(error){
            console.log(error);
        }
        else {
            // Data passed back from 'Blog' to 'blogs' is sent to index.ejs
            response.render("index", {blogs: blogs});
        }
    });
});

// NEW
app.get("/blogs/new", (request, response) => {
    response.render("new");
});

// CREATE
app.post("/blogs", (request, response) => {
    // create blog
    request.body.blog.body = request.sanitize(request.body.blog.body);
    Blog.create(request.body.blog, function(error, newBlog){
        if(error){
            response.render("new");
        }
        else {
            // redirect to index
            response.redirect("/blogs");
        }
    });
});

// SHOW
app.get("/blogs/:id", (request, response) => {
    Blog.findById(request.params.id, function(error, foundBlog){
        if(error){
            response.redirect("/blogs");
        }
        else {
            response.render("show", {blog: foundBlog});
        }
    });
});

// EDIT
app.get("/blogs/:id/edit", (request, response) => {
    Blog.findById(request.params.id, function(error, foundBlog){
        if(error){
            response.redirect("/blogs");
        }
        else {
            response.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE
app.put("/blogs/:id", (request, response) => {
    request.body.blog.body = request.sanitize(request.body.blog.body);
    // Takes three params. id, newData, callback
    Blog.findByIdAndUpdate(request.params.id, request.body.blog, function(error, updatedBlog){
        if(error){
            response.redirect("/blogs");
        }
        else {
            response.redirect("/blogs/" + request.params.id);
        }
    });
});

// DELETE
app.delete("/blogs/:id", (request, response) => {
    // destroy blog
    Blog.findByIdAndRemove(request.params.id, function(error){
        // redirect somewhere
        if(error){
            response.redirect("/blogs");
        }
        else {
            response.redirect("/blogs");
        }
    });
});

app.listen(3000, (request, response) => {
   console.log("Blog Server Started"); 
});