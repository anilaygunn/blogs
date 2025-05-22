import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

let blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs: blogs });    
});

app.get("/blog/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    if (blogId >= 0 && blogId < blogs.length) {
        res.render("blog.ejs", { blog: blogs[blogId] });
    } else {
        res.redirect("/");
    }
});

app.post("/add", (req, res) => {    
    const author = req.body.author;
    const title = req.body.title;
    const content = req.body.content;
    blogs.push({title: title, author: author, content: content});
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});