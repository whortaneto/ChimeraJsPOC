let express = require('express'),
    app = express(),
    fs = require('fs');

app.use(express.static(__dirname + '/ChimeraJs'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(process.env.PORT || 7000);
console.log("Server is running on port 7000");