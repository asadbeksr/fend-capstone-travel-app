const app = require('./app.js')
// Spin up the server

app.listen(8081, function () {
    console.log("working")
    console.log(`Server is running on port 8081`);
})


