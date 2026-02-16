//xml to json(cli)
const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({ explicitArray: false })
fs.readFile("data.xml", (err, data)=>{
    if (err)
    {
        console.log("error in reading the file")
        return;
    }
    parser.parseString(data, (error, result) => {
        if (error)
        {
            console.log("error in loading the file")
            return;
        }
        console.log(JSON.stringify(result,null,2))
    })
}
)