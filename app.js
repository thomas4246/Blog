//Imports
const express = require('express');
const ejs = require('ejs');

const homeStartingContent =
  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const port = process.env.PORT || 3000;
const app = express();

let newBlogs = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET Home
app.get('/', (req, res) => {
  res.render('home', {
    homeStartingContent: homeStartingContent,
    newBlogs: newBlogs,
  });
});

//Get About
app.get('/about', (req, res) => {
  res.render('about', {
    aboutContent: aboutContent,
  });
});

//GET Contact
app.get('/contact', (req, res) => {
  res.render('contact', {
    contactContent: contactContent,
  });
});

//GET Compose
app.get('/compose', (req, res) => {
  res.render('compose');
});

//POST Compose
app.post('/compose', (req, res) => {
  const post = {
    title: req.body.newTitle,
    content: req.body.newPost,
  };

  newBlogs.push(post);

  res.redirect('/');
});

app.get('/posts/:postName', (req, res) => {
  const newPost = req.params.postName;

  newBlogs.forEach((newBlog) => {
    const storeTitle = newBlog.title;

    if (newPost === storeTitle) {
      console.log('Match!');
    }
  });
});

//Listen
app.listen(port, () => console.log(`The server is online on the port ${port}`));
