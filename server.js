const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//connect mongoose
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/new-social-media', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`We're Connected on PORT: ${PORT}`));