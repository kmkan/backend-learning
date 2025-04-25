const fetch = require('node-fetch');

const BASE = 'https://secure-rubiks-cube-crud-api.onrender.com';
const credentials = { username: 'kamal', password: 'password' };

async function run() {
    const res = await (fetch.default || fetch)(`${BASE}/api/cubes/login`, { 
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    const data = await res.json();
    console.log('Token:', data.accessToken); 
};
run();