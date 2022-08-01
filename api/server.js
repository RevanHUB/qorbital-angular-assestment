const { employees } = require('./empleados.js');
const { tasks } = require('./tasks.js');
const express = require('express');
const cors = require('cors');
var http = require('http');
const app = express()
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    transport: ['polling'],
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});
port = 3001;


app.use(cors({
    origin: '*',
    methods: ['GET','POST'],
    transports: ['polling'],
}
));
usersOnChat = 0;
io.on('connection', (socket) => {
    console.log('a user connected with id ' + socket.id);
    usersOnChat++;
    console.log("Online Users: " + usersOnChat)
    socket.join("room")

    socket.on('test', () => {
        console.log("testing emitting")
    })

    socket.on('requestData', () => {
        console.log("sendingData");
    })
    socket.on('message', (value) => {
        console.log("Message received: " + value.msg)
        let current_time = new Date();
        const time = current_time.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          });

        // let time = withPmAm.getHours() + ':' + withPmAm.getMinutes();
        console.log(time)
        socket.in("room").emit("distribution", {
            value : value.msg,
            id: socket.id,
            userCreator: value.user.username,
            userAvatar: value.user.avatar,
            time: time
        });

        socket.emit("distribution", {
            value : value.msg,
            id: socket.id,
            userCreator: value.user.username,
            userAvatar: value.user.avatar,
            time: time
        });
    })

    socket.on("error", function (err) {
        console.log("Socket.IO Error happened");
        console.log(); 
    });

    socket.on('disconnect', () => {
        usersOnChat--;
    })
});

app.get('/', cors(), (req, res) => {
    res.send("Welcome to the employees api.");
});

app.get('/onlineInChat', cors(), (req, res) => {
    res.send(""+ usersOnChat);
})

/*login / logout */ 

app.get('/checklogin/:username&:password', cors(), (req, res) => {
    let username = req.params.username;
    let password =  req.params.password;
    let check = employees.find((users) => users.username === username && users.password === password);
    let onlineStatus = employees.findIndex((users) => users.username === username && users.password === password);
    
    (check === undefined)
    ? res.send(null) 
    : res.send(check); 
    (employees[onlineStatus]?.online != undefined)? employees[onlineStatus].online = true : null;
});

app.get('/offline/:username&:id', cors(), (req, res) => {
    let username = req.params.username;
    let id =  req.params.id;
    let check = employees.find((users) => users.username === username && users.id === id);
    (check === undefined)
    ? res.send(null) 
    : res.send("went to offline"); 
    (employees[id]?.online != undefined)? employees[id].online = false : null;
});

/* employees */ 
app.get('/employeeId/:id', cors(), (req, res) => {
    let id = req.params.id;
    let check = employees.find((user) => user.id === parseInt(id));
    
    (check === undefined)
    ? res.send("There are no results. ")
    : res.send(check);
});
app.get('/employeeUsername/:username', cors(), (req, res) => {
    let username = req.params.username;
    let check = employees.find((user) => user.username === username);
    
    (check === undefined)
    ? res.send("There are no results. ")
    : res.send(check);
});

app.get('/checklistU/', cors(), (req, res) => {
    let check = employees.map((user) => user.username != "admin" & user != undefined ? user : '' );

    (check === undefined)
    ? res.send("There are no results. ")
    : res.send(check);
});
app.get('/checklistA/', cors(), (req, res) => {
    let check = employees.map((user) => user );

    (check === undefined)
    ? res.send("There are no results. ")
    : res.send(check);
});

app.get('/createuser/:username&:password&:position&:group', cors(), (req, res) => {
    let username = req.params.username;
    let password =  req.params.password;
    let position = req.params.position;
    let group = req.params.group;
    console.log(position);
    if (position == 'Administrator') {
        console.log("Es igual");
        res.send("No se ha introducido el valor");
    } else {
        console.log("Es diferente")
            let check = employees.push({
            id: employees.length,
            avatar: 'https://neuroqualyfam.usal.es/wp-content/uploads/sites/51/2019/12/default-user-image.png',
            username: username,
            password: password,
            online: false,
            position: position,
            group: group
        });
        res.send("Introduced user");
    }
});

app.get('/deleteUser/:id', cors(), (req, res) => {
    let id = req.params.id;
    employees.splice(id, 1)
    res.send("Changes done")
   
});

app.get('/changeUsername/:id&:username', cors(), (req, res) => {
    let id = req.params.id;
    let username = req.params.username;
    employees[id].username = username;
    res.send("Changes done ")
});
app.get('/changePassword/:id&:password', cors(), (req, res) => {
    let id = req.params.id;
    let password = req.params.password;
    employees[id].password = password;
    res.send("Changes done ")
});
app.get('/changeRole/:id&:role', cors(), (req, res) => {
    let id = req.params.id;
    let role = req.params.role;
    employees[id].role = role;
    res.send("Changes done ")
});
app.get('/changeAvatar/:id/*', cors(), (req, res) => {
    let id = req.params.id;
    let avatar = req.params[0];
    employees[id].avatar = avatar;
    res.send("Changes done ")
});

// tasks //

app.get('/tasks/', cors(), (req, res) => {
    let check = tasks.map((task) => task.group === "QOrbital" ? task : null );
    (check === undefined)
    ? res.send("There are no results. ")
    : res.send(check);
    // console.log("requesting data, done")
});

app.get('/createtask/:title&:desc&:creator&:date&:priority&:group', cors(), (req, res) => {
    let title = req.params.title;
    let desc =  req.params.desc;
    let creator =  req.params.creator;
    let date =  req.params.date;
    let priority = req.params.priority;
    let group = req.params.group;
    
    let check = tasks.push({
            id: tasks.length,
            main: title,
            description: desc,
            creator: creator,
            toFinish: date,
            status: 'In Progress',
            priority: parseInt(priority),
            group: 'QOrbital',
            assigned: creator
        });
        res.send("Introduced task");
});

app.get('/changeStatus/:id&:status', cors(), (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    tasks[id].status = status;
    res.send("Changes done ")
});
app.get('/changeDesc/:id&:desc', cors(), (req, res) => {
    let id = req.params.id;
    let desc = req.params.desc;
    tasks[id].description = desc;
    res.send("Changes done ")
});
app.get('/changePriority/:id&:priority', cors(), (req, res) => {
    let id = req.params.id;
    let priority = req.params.priority;
    tasks[id].priority = parseInt(priority);
    res.send("Changes done ")
});
app.get('/changeDate/:id&:date', cors(), (req, res) => {
    let id = req.params.id;
    let date = req.params.date;
    tasks[id].toFinish = date;
    res.send("Changes done ")
});

app.get('/getAvatar/*', cors(), (req, res) => {
    let avatar = req.params[0];
    console.log(avatar)
    res.send("Changes done ")
});

app.get('/assignToTask/:idTask&:username&:idUser/*', cors(), (req, res) => {
   
    let idTask = req.params.idTask;
    let idUser = req.params.idUser;
    let username =  req.params.username;
    let avatar =  req.params[0];
    console.log(avatar);
    let isIncluded;

    console.log(tasks[idTask].assigned);
    
    // let check = tasks[idTask].find(({asigned}) => asigned.username === username );
   
     tasks[idTask].assigned = {};
    //    let check = tasks[idTask].assigned.({
    //         id: idUser,
    //         username: username, 
    //         avatar: avatar,
    //     });
        tasks[idTask].assigned.id = idUser;
        tasks[idTask].assigned.username = username;
        tasks[idTask].assigned.avatar = avatar;
        console.log("added user to task")
        console.log(tasks[idTask].assigned);
        res.send("Assigned " + username + "");
  
    // console.log(check)
});

app.get('/clearAssignement/:idTask', cors(), (req, res) => {
   
    let idTask = req.params.idTask;

    console.log(tasks[idTask].assigned);
   
    tasks[idTask].assigned = {};
    
    console.log("cleared task")
    console.log(tasks[idTask].assigned);
});


app.get('/deleteTask/:id', cors(), (req, res) => {
    let id = req.params.id;
    tasks.splice(id, 1)
    res.send("Changes done ")
});

/* listen options */ 


app.listen(port, ()  => {
    console.log("App is running");
})
server.listen(3000, () => {
    console.log("Chat Server is listening too")
})