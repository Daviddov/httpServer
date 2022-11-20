const http = require('http')
const fs = require('fs')
const factorial = require('./files/factorial')
const prime = require('./files/prime')

const server = http.createServer((req, res) => {
    const { url } = req;
    const urlSplit = url.split('/')
    if (urlSplit) {
        switch (urlSplit[1]) {
            case 'pages':
                switch (urlSplit[2]) {
                    case 'sports':
                        fs.readFile('./files/sports.html', function (err, data) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(data);
                            return res.end();
                        });
                        break;
                    case 'about':
                        fs.readFile('./files/about.html', function (err, data) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(data);
                            return res.end();
                        });
                        break;
                        fs.readFile('./files/pages.html', function (err, data) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(data);
                            return res.end();
                        });
                    default:
                        break;
                }
                break;

            case 'files':
                switch (urlSplit[2]) {
                    case 'shops':
                        fs.readFile('./files/shops.txt', function (err, data) {
                            res.writeHead(200, { 'Content-Type': 'text/txt' });
                            res.write(data);
                            return res.end();
                        });
                        break;
                    case 'people':
                        fs.readFile('./files/people.txt', function (err, data) {
                            res.writeHead(200, { 'Content-Type': 'text/txt' });
                            res.write(data);
                            return res.end();
                        });
                        break;
                    default:
                        fs.readFile('./files/files.html', function (err, data) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(data);
                            return res.end();
                        });
                        break;
                }
                break;

            case 'contacts':
                if (urlSplit[2]) {
                    fs.readFile('./files/contacts.json', function (err, data) {
                        const dataParse = JSON.parse(data)
                        const dataStringify = JSON.stringify(dataParse[urlSplit[2]])

                        if (urlSplit[2] >= dataParse.length) {
                            console.log('data not Exists');
                            return res.end();

                        } res.writeHead(200, { 'Content-Type': 'text/json' });
                        res.write(dataStringify);
                        return res.end();
                    });
                } else {
                    fs.readFile('./files/contacts.json', function (err, data) {
                        res.writeHead(200, { 'Content-Type': 'text/json' });
                        res.write(data);
                        return res.end();
                    });
                }
                break;
            case 'comps':
                console.log('compos');
                if (urlSplit[2] === 'factorial') {
                    console.log('factorial');

                    console.log(factorial(urlSplit[3]));
                    return res.end();
                }
                // else if (urlSplit[2] === prime) {
                //     fs.readFile('./files/comps.html', function (err, data) {
                //         res.writeHead(200, { 'Content-Type': 'text/html' });
                //         res.write(data);
                //         return res.end();
                //     })
                // }
                break;
            default:
                console.log(url, urlSplit);
                fs.readFile('./files/error.html', function (err, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end();
                });
                break;
        }
    }

})

server.listen(3000)