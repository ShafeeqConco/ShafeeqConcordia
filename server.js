const app= require('express')();
const PORT = 8080;
app.listen(
PORT,
()=> console.log('Server running on ${PORT}')
);

app.get('/fruits',(req, res) =>{
res.send("Mango and Apple")
});