import "dotenv/config"
import express from 'express';
import massagesRouter from './Modules/massages/Services/messages.router.js';
import usersRouter from './Modules/Users/Services/users.router.js';
import dbConnection from './DB/db.connection.js';

const app = express();



app.use(express.json());


dbConnection()


app.use("/api/users", usersRouter )
app.use("/api/messages", massagesRouter )





app.use((err , req , res , next)=>{

    console.error(err.stack)
    res.status(500).json({massage : "something broke!"});

})


app.use((req , res)=>{

    res.status(404).json({massage : "Page is Not Found!"})
    

})

































app.listen(process.env.PORT , ()=> {
    console.log("server is running port 3000");
})