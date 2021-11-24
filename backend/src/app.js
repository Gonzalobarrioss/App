import  Express  from 'express';

import sequelize from './database.js';

import router from './routes/routes.js'

const app = Express();

app.use(Express.urlencoded({ extended: true }));

app.use(Express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync(); 

export default app