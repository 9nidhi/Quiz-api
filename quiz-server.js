const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// routes path

const addquestionRoutes = require('./Routes/addQuestion.routes');
const addcatquetionRoutes = require('./Routes/addCategory.routes');
const addsubcatquetionRoutes = require('./Routes/addSubCategory.routes');
const addcatwisequetionRoutes = require('./Routes/addCatwisequetion.routes');
const addamountRoutes = require('./Routes/EasyTworun.routes');

// mongodb+srv://nidhivarniinfoteach:udrO62qNlm8MVNdU@cluster0.8dc0a0c.mongodb.net/Bhade-gadi-partner
const Database_Url = process.env.Database_Url || 'mongodb+srv://nidhivarniinfoteach:DgAiuHGgyz1251bC@cluster0.ehztjvf.mongodb.net/Quiz-App';

const PORT = 4800;

mongoose.connect(Database_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Quize database is connected."))
    .catch((err) => console.log(err.message));

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// Serve static files from the "uploads" directory
app.use("/public", express.static(__dirname + "/public"))
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use('/api/v1/uploads', express.static('uploads'));

// deploy routes path
app.use('/api/v1', addquestionRoutes);
app.use('/api/v1', addcatquetionRoutes);
app.use('/api/v1', addsubcatquetionRoutes);
app.use('/api/v1', addcatwisequetionRoutes);
app.use('/api/v1', addamountRoutes);

// app.use(cors({
//     withCredentials: true,
//     origin: ['*', 'http://localhost:3000']
// }));

// Configure CORS
app.use(cors({
    origin: ['*', 'http://localhost:3000','http://localhost:3001'], 
    withCredentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.all('*', (req, res) => {
    res.json({
        status: 'fail',
        message: `No route matches with ${req.url}.`,
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});



