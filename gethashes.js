const Https = require('https');
const Cheerio = require('cheerio');
const nThen = require('nthen');

const MAINURL = 'https://nodejs.org/dist/';

const getPage = (url, cb) => {
    console.error('Request: ' + url);
    Https.get(url, (res) => {
        if (res.statusCode !== 200) {
            throw new Error("Request [" + url + "] Failed.\nStatus Code: " + statusCode);
        }
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            cb(rawData);
        });
    });
}

getPage(MAINURL, (res) => {
    const $ = Cheerio.load(res);
    const shasums = [];
    let nt = nThen;
    $('a').each((i, a) => {
        a = $(a);
        if (!/^v[0-9]+\.[0-9]+\.[0-9]+\/$/.test(a.attr('href'))) { return; }
        nt = nt((waitFor) => {
            const path = MAINURL + a.attr('href');
            getPage(path + 'SHASUMS256.txt', waitFor((res) => {
                res.split('\n').forEach((line) => {
                    if (line === '') { return; }
                    const ret = line.replace(/([a-f0-9]{64})  ([^ ]+)$/, (all, hash, file) => {
                        shasums.push([path + file, hash]);
                    });
                    if (ret !== 'undefined') { console.error("unparsible line: " + line); }
                });
            }));
        }).nThen;
    });
    nt((waitFor) => {
        shasums.forEach((line) => {
            // Versions of tar we want to support will only do gzip.
            if (!/\.tar\.gz$/.test(line[0])) { return; }

            // We cannot rely on working https on the system.
            const url = line[0].replace('https://', 'http://');

            console.log('[ "$NODEURL" = "' + url + '" ] && NODEHASH="' + line[1] + '"');
        })
    });
})
