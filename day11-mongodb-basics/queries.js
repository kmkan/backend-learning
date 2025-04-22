const client = require('./db');

async function getCubes() {
    try {
        await client.connect();
        const db = client.db("cubecollection_nosql");
        const cubes = await db.collections("cubes").find().toArray();
        console.log("Cubes: ", cubes);
    } finally {
        await client.close();
    }
}

async function getCubesId(id) {
    try {
        await client.connect();
        const db = client.db("cubecollection_nosql");
        const query = { _id: new ObjectId(id) };
        const cube = await db.collections("cubes").findOne(query);
        console.log(`Cube with _id ${id}: `, cube);
    } finally {
        await client.close();
    }
}

async function insertCube(brand, name, size_mm, stickerless) {
    try {
        await client.connect();
        const db = client.db("cubecollection_nosql");
        const query = { brand, name, size_mm, stickerless };
        const result = await db.collections("cubes").insertOne(query);
        console.log(result);
    } finally {
        await client.close();
    }
}

async function deleteCube(id) {
    try {
        await client.connect();
        const db = client.db("cubecollection_nosql");
        const query = { _id: new ObjectId(id) };
        const result = await db.collections("cubes").deleteOne(query);
        console.log(result);
    } finally {
        await client.close();
    }
}