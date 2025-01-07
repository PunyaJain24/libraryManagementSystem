const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const rootRoutes = require('./routes/index');
const cors = require('cors');

const setUpAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    app.use('/', rootRoutes);
    
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });

};
setUpAndStartServer();