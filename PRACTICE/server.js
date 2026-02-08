const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray: false});
fs.readFile("data.xml", (err, data) => {
    if (err)
    {
        console.error("error in reading file" + err);
        return;
    }
    parser.parseString(data, (error, result) => {
        if (error)
        {
            console.error("error in parsing file" + error);
            return;
        }
        console.log(JSON.stringify(result, null, 2))
    })
})