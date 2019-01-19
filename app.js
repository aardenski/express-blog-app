var express     = require('express'),
app             = express(),
bodyParser      = require('body-parser'),
mongoose        = require('mongoose'),
methodOverride  = require('method-override'),
expressSanitizer = require('express-sanitizer');

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer); //must go after bodyparser use
app.use(methodOverride("_method")); // !!!!!
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    //'created' should be a Date and gets default current date
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // create blog
    req.body.blog.body = res.sanitize(req.body.blog.body) //excludes <script> tags
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            console.log(err);
        } else {
            //redirects to the index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("SERVER IS RUNNING!");
})