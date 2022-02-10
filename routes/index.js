//Import module
const router = require('express').Router();
const fs = require('fs');

//root folder
router.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.php').pipe(res)
})

module.exports = router;