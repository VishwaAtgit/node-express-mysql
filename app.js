require('dotenv').config();
const express = require('express')
const userRouter = require('./api/users/user.router')

app = express()
app.use(express.json())
app.use('/api/users', userRouter)
app.listen(process.env.APP_PORT, () => { console.log('server running now at',process.env.APP_PORT )})

// app.get('/api', (req, res) => {
//     res.json({
//         success: 1,
//         message: 'This request api working'
//     })
// })

// mysql queries :
// db name : test
// table name : registration

// few of the sample queries (need to be used in mysql workbench): 
// show databases;
// use test;
// create table registration(firstName VARCHAR(20), lastName VARCHAR(20), gender VARCHAR(20), email VARCHAR(20) UNIQUE, passWord VARCHAR(100), number BIGINT, id INT AUTO_INCREMENT PRIMARY KEY)
// drop table registration;
// select * from registration;
// select * from registration where email ='test2@gmail.com'
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password@123';


//reference vidoes
// mysql : https://www.youtube.com/watch?v=g6w7KtbncxE
// express and mysql : https://www.youtube.com/watch?v=WfCJ3sHnLBM

// execute the below command in mysql workbench when you get error as : 
// client does not support authentication protocol requested by server; consider upgrading mysql client
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password@123';