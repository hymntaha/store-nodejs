const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('../../Downloads/03-configuring-cookies/controllers/error');
const User = require('../../Downloads/03-configuring-cookies/models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('../../Downloads/03-configuring-cookies/routes/admin');
const shopRoutes = require('../../Downloads/03-configuring-cookies/routes/shop');
const authRoutes = require('../../Downloads/03-configuring-cookies/routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://tahauygun:tacoNy1985@cluster0-v8atw.mongodb.net/shop?retryWrites=true',
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Taha',
          email: 'tuygunny@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
