import cors from 'cors';
import shelljs from 'shelljs';
import express from 'express';

import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

const db = lowdb(new FileSync('public/db.json'));

db.defaults({ })
    .set('ts', Date.now())
    .write();

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

shelljs.mkdir('-p', 'public/res');

app.get('/api/:kind', (req, res) => {
    const { params, body } = req;
    res.json({code: 0, payload: { 
        hello: 'murph', params, body 
    }});
});

app.listen(port, () => {
    console.log(`> API - seve on ${port}\n`);
});