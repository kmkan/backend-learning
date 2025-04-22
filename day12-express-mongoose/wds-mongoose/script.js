const mongoose = require('mongoose');
const User = require('./user');

mongoose.connect(INSERT URL);

async function run() {
    const user = await User.create({ name: 'Kamal', age: 19, hobbies: ['weightlifting', 'music']});
    console.log(user);
}

run();
