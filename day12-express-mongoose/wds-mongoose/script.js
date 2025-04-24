const mongoose = require('mongoose');
const User = require('./user');

mongoose.connect('mongodb+srv://mongo:DB@cluster0.95tubn2.mongodb.net/cubecollection_nosql');

async function run() {
    const user = await User.create({ name: 'Kamal', age: 19, hobbies: ['weightlifting', 'music']});
    console.log(user);
}

run();