import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000; 
const topicList = []; 
let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        topics : topicList,
        posts: posts
    });
  });

app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});


// Route to display the edit form
app.get('/posts/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id == postId);
    if (post) {
        res.render('edit.ejs', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Handle form submission
app.post('/posts', (req, res) => {
    const newPost = {
      id: Date.now().toString(),
      title: req.body.title,
      content: req.body.content
    };
    posts.push(newPost);
    return res.redirect('/');
  });

// Route to handle the edit form submission
app.post('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex(p => p.id == postId);
    if (postIndex !== -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

// Route to handle deleting a post
app.post('/posts/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

app.listen(port, () => {
console.log(`Listening on port ${port}`);
});