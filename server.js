const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')

const server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip_address = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(express.static(path.join(__dirname, 'node_modules')));

// Tell express to use the body-parser 
//middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => displayForm(res));

app.post('/message', (req, res) => {
    console.log('POST Message/');    
  	const message = req.body.message;
  	console.log(`POST request: Message received which is "${message}"`);  	
    res.writeHead(200, {'Content-Type': 'text/html'});  
    res.end(`Your message is received, Thanks !!`);  
});

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

app.listen(server_port, server_ip_address, () => console.log(`Example app listening on port ${server_ip_address}:${server_port}`))