const express = require("express")
const app = express()
require('./models/_DB')
const core = require('cors')
const User = require("./models/User")
const Product = require("./models/product")

const Jwt = require('jsonwebtoken');
const JwtKey = "e-com"

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(core());

app.post("/register", async (req, res)=>{

    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    
    Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong, try again" })
        }
        res.send({ result, auth: token });
    })
});

app.post("/login", async(req, res)=>{
    if (req.body.email && req.body.password) {

        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, JwtKey,{expiresIn : "2h"}, (err, token)=>{
                if (err) {
                    res.send({result:"Something went wrong, try again"})
                }
                res.send({user, auth : token});
            })
            
        } else {
            res.send({ result: "No user found" });
        }
    }else{
        res.send({ result: "No user found" });
    }
    
});

app.post("/add-product", verifyToken, async(req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
});

app.get("/products", verifyToken, async(req, res)=>{
    let products = await Product.find();
    if (products.length>0) {
        res.send(products)
    }else{
        res.send({result : "No products Found"});
    }
});

app.delete("/product/:id", verifyToken, async(req, res)=>{
    let result = await Product.deleteOne({ _id:req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "Failed to delete record" });
    }
});

app.get("/product/:id", verifyToken, async(req, res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result : "No record found"});
    }
});

app.put("/product/:id", verifyToken, async(req,res)=>{
    let result = await Product.updateOne({_id:req.params.id}, {$set : req.body})
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "Failed to update data" });
    }

});

app.get("/search/:key", verifyToken, async(req, res)=>{
    let result = await Product.find({
        "$or" : [
            {name : {$regex:req.params.key}},
            {category : {$regex:req.params.key}},
            {company : {$regex:req.params.key}}
        ]
    });
    res.send(result)
})

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.warn(token);
    if (token) {
        // token = token.split(' ')[1];
        Jwt.verify(token, JwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "please provide valid token" });
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({result:"please add token"});
    }
}

app.listen(PORT, ()=>{
    console.log(`listening at port no ${PORT}`);
})