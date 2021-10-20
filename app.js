const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
const checkPasswordStrong = require('./loginAuth');
const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://admin-rahul:Rahul@111@cluster0.aei71.mongodb.net/myblog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = require('./model/user');
const Post = require('./model/post');



const {
    request
} = require('http');

const homeStartingContent = "So, in your case, if the footer resides in the same directory as the file you want to include it in, you would simply add <% include footer %> to your file. include is a function Includes are relative to the template with the include call. (This requires the 'filename' option.) For example if you have ";

const middleContent = "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.";

const contactPage = " Wikipedia (/ˌwɪkɪˈpiːdiə/ (About this soundlisten) wik-ih-PEE-dee-ə or /ˌwɪki-/ (About this soundlisten) wik-ee-) is a free, multilingual open-collaborative online encyclopedia created and maintained by a community of volunteer contributors using a wiki-based editing system. Wikipedia is the largest general reference work on the Internet,[3] and one of the 15 most popular websites as ranked by Alexa; in 2021, it was ranked as the 13th most visited.[4][note 3] The project carries no advertisements and is hosted by the Wikimedia Foundation, an American non-profit organization funded mainly through donations, 80% of which are small donations from individual users.[6]Wikipedia was launched on January 15, 2001, by Jimmy Wales and Larry Sanger; Sanger coined its name as a portmanteau of wiki and encyclopedia.[7][8] Initially available only in English, versions in other languages were quickly developed. The English Wikipedia, with 6.3 million articles as of March 2021, is the largest of the 319 language editions. Combined, Wikipedia's editions comprise more than 55 million articles, and attract more than 17 million edits and more than 1.7 billion unique visitors per month.[9][10]Wikipedia has been criticized for its uneven accuracy and for exhibiting systemic bias, particularly gender bias, with the majority of editors being male.[11] In 2006, Time magazine stated that the open-door policy of allowing anyone to edit had made Wikipedia the biggest and perhaps the best encyclopedia in the world, and a testament to the vision of Jimmy Wales.[12] The project's reputation improved further in the 2010s, as it received praise for its unique structure, culture, and absence of commercial bias.[3][11] In 2018, Facebook and YouTube announced that they would help users detect fake news by suggesting links to related Wikipedia articles.[13 Mumbai reported 1,051 fresh COVID-19 cases and five new deaths due to the virus on Sunday, taking the total number of positive cases in the city to 3,25,915. Maharashtra, on the other hand, reported 8,293 new cases and the total positive cases in the state ";

const aboutPage = "The power outage in Mumbai on October 12 could be a cyber sabotage, said home minister Anil Deshmukh. He said that the report submitted by the inquiry committee of experts who analysed the SCADA system of MSEB shows that some blacklisted IP addresses tried to log in to the system, 12 Trojan horse were in service in the system and 8GB of unaccounted data was transferred in the system. ";
const JWT_SECRET = "shdufmsiufhow98edfuew98732e2374328e3ihiuewfhalisu9wudfjiacfjwe9ufd"

// let blogs = []


app.get('/', async function (req, res) {

    let blogs = await Post.find().sort({
        timeCreated: 'desc'
    });

    // response.render('index', { blogs: blogs });
    // console.log(blogs);
    res.render("index", {
        page1: "Home",
        homeStartingContent: homeStartingContent,
        middleContent: middleContent,
        blogs: blogs
    });
    // console.log(posts);r
})
app.get('/login', function (req, res) {
    res.render('login', {
        ErrorMessage: ""
    })
})

app.get('/posts/:pageNum', async function (req, res) {

    console.log(req.params.pageNum)
    let blogs = await Post.find({
        title: req.params.pageNum
    });
    console.log(blogs);

    // res.render('post', {
    //     title : blogs.title,
    //     briefIntroduction : blogs.briefIntroduction,
    //     content : blogs.content
    // })

    blogs.forEach(function (p) {
        if (_.lowerCase(p.title) == _.lowerCase(req.params.pageNum)) {

            /*
                title : String,
                briefIntroduction : String,
                content : String
            */
            console.log("Match found")
            // var blog = {
            //     postTitle: p.postTitle,
            //     postBody: p.postBody
            // }
            res.render('post', {
                title: p.title,
                briefIntroduction: p.briefIntroduction,
                content: p.content
            })
        }
    })

})


app.get('/about', function (req, res) {
    res.render('about', {
        page: "About",
        aboutPage: aboutPage
    })
})

app.get('/contact', function (req, res) {
    res.render('contact', {
        contactPage: contactPage
    })
})

app.get('/compose', function (req, res) {
    res.render('compose')
})

app.get('/signup', function (req, res) {
    res.render('signup')
})

app.get('/user', function (req, res) {
    res.render('user');
});
app.post('/compose', async function (req, res) {
    // var str = req.body.post;
    var obj = new Post({
        title: req.body.title,
        briefIntroduction: req.body.briefIntroduction,
        content: req.body.content
    })

    //console.log(obj);
    obj = await obj.save();
    res.redirect('/');

})

app.post('/signup', async function (req, res) {
    // console.log(req.body.name + " " + req.body.email + " " + req.body.password)
    var result = checkPasswordStrong(req.body.password);
    console.log(result);
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword)

    var user = new User({

        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    })

    // user.save()
    res.redirect('/login')
})


app.post('/login', async function (req, res) {

    username = req.body.username
    password = req.body.password

    console.log(username + " " + password);
    const user = await User.findOne({
        username: username
    });

    console.log(user);

    if (!user) {
        res.render('login', {
            ErrorMessage: "didn't find the user"
        })
        return res.json({
            status: 'error',
            error: "didn't find the user"
        })
    }

    if (bcrypt.compareSync(password, user.password)) {

        console.log("Im the matched");
        const token = jwt.sign({
            id: User._id,
            username: username
        }, JWT_SECRET)

        console.log("Im the matched");
        console.log(user.email);
        res.render('user', {
            userName: user.name,
            userEmail: user.username
        });
        // return res.json({status : 'ok', data : ''})
    }

    //  res.json({status: 'ok'});
    // res.redirect('/');
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running at port 3000')
})