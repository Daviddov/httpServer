const http = require('http')
const fs = require('fs')
const factorial = require('./files/factorial')
const prime = require('./files/prime')

const hendelRequset = (path, type, req, res) => {
    fs.readFile(path, function (err, data) {
        res.writeHead(200, { 'Content-Type': type });
        res.write(data);
        return res.end();
    });
}

const server = http.createServer(async (req, res) => {
    const { url } = req;
    const urlSplit = url.split('/')
    if (urlSplit) {
        switch (urlSplit[1]) {
            case 'pages':
                switch (urlSplit[2]) {
                    case 'sports':
                        hendelRequset('./files/sports.html', 'text/html', req, res)
                        break;
                    case 'about':
                        hendelRequset('./files/about.html', 'text/html', req, res)
                        break;
                    default:
                        hendelRequset('./files/pages.html', 'text/html', req, res)
                }
                break;

            case 'files':
                switch (urlSplit[2]) {
                    case 'shops':
                        hendelRequset('./files/shops.txt', 'text/txt', req, res)
                        break;
                    case 'people':
                        hendelRequset('./files/people.txt', 'text/txt', req, res)
                        break;
                    default:
                        hendelRequset('./files/files.html', 'text/html', req, res)
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
                    hendelRequset('./files/contacts.json', 'text/json', req, res)
                }
                break;
            case 'comps':
                console.log('compos');
                if (urlSplit[2] === 'factorial') {
                    console.log('factorial');

                    const data = factorial(urlSplit[3]);
                    console.log(data);
                    res.write(`<h1>${data.toString()}</h1>`);
                    return res.end();
                }

                else if (urlSplit[2] === 'prime') {
                    console.log('prime');
                    const data = prime(urlSplit[3])

                    res.write(`<h1>${data.toString()}</h1>`);
                    return res.end();
                }
                break;
            default:
                console.log(url, urlSplit);
                hendelRequset('./files/error.html', 'text/html', req, res)
                break;
        }
    }

})



server.listen(3000)