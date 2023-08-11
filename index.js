
const express = require('express')
const app = express()
require('./helpers/global')
const db = require('./config/db.config');
const config = require('./config/config');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//.................route.............
const route = require('./routes/user/user.route');
app.use('/api/v1/', route)

//create server
let server
if (config.protocol == 'https') {
    console.log(config.protocol);
    const https = require('https')
    const options = {
        key: fs.readFileSync(config.sslCertificates.privkey),
        cert: fs.readFileSync(config.sslCertificates.fullchain)
    }
    server = https.createServer(options, app)
} else {
    const http = require('http')
    server = http.createServer(app)
}


server.listen(config.port, () => {
    console.log(`server running on port ${config.port}`);
})