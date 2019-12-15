var client = require('./database');
var http = require('http');
const { parse } = require('querystring');
//create a server object:

http.createServer(function (req, response) {
    // console.log(req);
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    // response.writeHead(200, {'Content-Type': 'application/json'}); // http header
    response.setHeader('Content-Type', 'application/json');

    

    var url = req.url;
    if(url ==='/getproducts'){
        /*client.connect()
        client.query('SELECT * FROM mx_products').then(result => {

            const data = result.rows;
            console.log(data)
            response.write(JSON.stringify(data)); //write a response
            response.end();
        }).catch(err => {
            console.log(err.stack);
        }).finally(() => {
            // client.end()
        })*/
         if (req.method === 'POST') {
            collectRequestData(req, result => {
                console.log(result);
                response.write(JSON.stringify(result)); //write a response
                response.end();
            });
        }

    }else if(url ==='/getbrands'){
        client.connect()
        client.query('SELECT * FROM mx_brands').then(result => {

            const data = result.rows;
            console.log(data)
            response.write(JSON.stringify(data)); //write a response
            response.end();
        
        }).catch(err => {
            console.log(err.stack);
        }).finally(() => {
            // client.end()
        })
    }else{
        // var pdata = [
        //     {name:"P1",price:"110",size:"XL"},
        //     {name:"P2",price:"210",size:"L"},
        //     {name:"P3",price:"210",size:"L"},
        //     {name:"P4",price:"210",size:"L"},
        //     {name:"P1",price:"110",size:"XL"},
        //     {name:"P2",price:"210",size:"L"},
        //     {name:"P3",price:"210",size:"L"},
        //     {name:"P4",price:"210",size:"L"}
        // ];
        response.write(JSON.stringify("Nothing")); //write a response
        response.end(); //end the response
    }
}).listen(3000, function(){
 console.log("server start at port 3000"); //the server object listens on port 3000
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    // const FORM_URLENCODED = 'multipart/form-data';
    console.log(request.headers['content-type']);
    // if(request.headers['content-type'] === FORM_URLENCODED || request.headers['content-type'] === 'multipart/form-data') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    // }
    // else {
    //     callback(null);
    // }
}