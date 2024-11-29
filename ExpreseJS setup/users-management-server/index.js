
const express= require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const users =[
    {
        id: 1,
        name: 'John Doe',
        email: 'Jhonedoe@ gmail.com'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'Janedoe@ gmail.com'
    },
    {
        id: 3,
        name: 'Jim Doe',
        email: 'Jimdoe@ gmail.com'
    },
    {
        id: 4,
        name: 'Jill Doe',
        email: 'Jilldoe@ gmail.com'
    },
    {
        id: 5,
        name: 'Jack Doe',
        email: 'Jackdoe@ gmail.com'
    }   
]

app.get('/', (req, res) => {
    res.send('Users management server is running..');
});

// json data api te pathabe
app.get('/users', (req, res) => {
    res.json(users);
});

// post api create korlam
app.post('/users', (req, res) => {
    console.log('post api calling');
    console.log(req.body);
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send(newUser);
});

app.get('/users')




app.listen(port, () => { 
    console.log(`Server is running on PORT: ${port}`);
});  

