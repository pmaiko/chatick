const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
const PORT  = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

if (dev) {
    app.use(cors({origin: 'http://localhost:3000'}));
}


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { check, validationResult } = require('express-validator');
const server = require('http').createServer(app);
const io  = require('socket.io').listen(server);
const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Users = require('./models/Users');
const GeneralMessages = require('./models/GeneralMessages');

const Key = "chatick";

async function start () {
   try {
       await mongoose.connect('mongodb+srv://Petya:Petya@cluster0-me7vh.mongodb.net/chatick?retryWrites=true&w=majority',
           {
               useNewUrlParser: true,
               useFindAndModify: false,
               useUnifiedTopology: true
           }
       );

       console.log('connected db')
       //mongoose.connection.db.dropCollection('users', function(err, result) {});
   } catch (e) {
       console.log(e);
   }
}

server.listen(PORT);
start();

app.get('/api/v1/', function (request, response) {
    checkToken(request, response, function () {
        response.json({id: 1});
    });
});

app.post('/api/v1/register-user/',
    [
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    async (request, response) => {
        const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    try {
        let query = await Users.find().select('email');
        if (query) {
            query.map(function (item) {
                if (item.email === request.body.email) {
                    throw new Error('Mail has already been created')
                }
            });
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const users = new Users({
            firstName: request.body.firstName ? request.body.firstName: '',
            lastName: request.body.lastName ? request.body.lastName: '',
            email: request.body.email ? request.body.email: '',
            //password: request.query.password ? Buffer.from(request.query.password).toString('base64'): '',
            password: hashedPassword ? hashedPassword: '',
        });

        await users.save();

        response.sendStatus(200);
    }
    catch (e) {
        response.sendStatus(500);
    }
});

app.post('/api/v1/login',
    [
        check('email').isEmail(),
        check('password').isLength({min: 6}),
    ],
async (request, response) => {
        const user = await Users.findOne({'email': request.body.email}).select();
        if (!user) {
            response.status(400).send('Can find user');
        }

    try {
        if (await bcrypt.compare(request.body.password, user.password)) {
            //response.status(200).send('Success');
            //let Header = Buffer.from(headerRequest, 'base64').toString('ascii');
            let Header = {
                "alg": "HS256",
                "typ": "JWT"
            };

            let Payload = {
                'userId': user._id,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
            };

            Header = Buffer.from(JSON.stringify(Header)).toString('base64');
            Payload = Buffer.from(JSON.stringify(Payload)).toString('base64');

            const Signature = generateSignature(`${Header}.${Payload}`, Key);
            const token = `Bearer ${Header}.${Payload}.${Signature}`;

            response.json(token);
        }
        else {
            response.status(401).send('Wrong password');
        }
    }
    catch {
        response.sendStatus(500);
    }

});


function generateSignature(str, key) {
    return crypto.createHmac('sha256', key)
        .update(str)
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function checkToken(request, response, callback) {
    let tokenRequest = request.headers.authorization;
    tokenRequest = tokenRequest.replace("Bearer ", "");
    tokenRequest = tokenRequest.split('.');

    let headerRequest = tokenRequest[0];
    let payloadRequest = tokenRequest[1];
    let signatureRequest = tokenRequest[2];

    let Signature = generateSignature(`${headerRequest}.${payloadRequest}`, Key);

    if (signatureRequest === Signature) {
        callback();
    }
    else {
        response.status(401).send();
    }

}

io.sockets.on('connection', function (socket) {
   console.log('connected socket');

   socket.on('disconnect', function (data) {
       console.log('disconnect socket');
   });

   socket.on('message', function (data) {
       io.sockets.emit('message', data);

       const generalMessages = new GeneralMessages({
           message: data.messageInput ? data.messageInput: '',
           userId: data.userId ? data.userId: '',
       });

       generalMessages.save();
   });

    socket.on('getUsers', function () {
        Users.find().select('firstName').select('lastName').select('email').then(function (data) {
            io.sockets.emit('getUsers', data);
        });

    });

    socket.on('getGeneralMessage', function () {
        async function generalMessage() {
            let generalMessage = await GeneralMessages.find().sort([['_id', -1]]).limit(15);
            generalMessage = generalMessage.reverse();

            let users = await Users.find().select();

            if (!Array.isArray(generalMessage)) {
                generalMessage = [generalMessage];
            }

            let newArray = [];
            generalMessage.map(messageObj =>{
                users.map(userObj =>{
                    if (messageObj.userId == userObj._id) {
                        newArray = [...newArray, {
                            message: messageObj.message,
                            userId: userObj._id,
                            firstName: userObj.firstName,
                            lastName: userObj.lastName,
                        }];
                    }
                });

            });
            return newArray;
        }

        generalMessage().then(function (data) {
            io.sockets.emit('getGeneralMessage', data);
        });
    });

});

if (!dev) {
    app.use(express.static(path.resolve(__dirname + '/client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname + '/client', 'build', 'index.html'));
    })
}


