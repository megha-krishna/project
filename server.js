const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
const db=require("./config/dbconfig")
const Review = require("./models/Reviews"); 

const app = express();
app.use(cors())
app.use(express.json());

//connecting to the database
db.dbConnect()

//home route for displaying all reviews
app.get("/reviews/all", async (req,res)=>
{
    let allreviews=await Review.find({})
    res.send(allreviews)
})

//for displaying specific review using movieid
app.get("/reviews/:id", async (req,res)=>
    {
        let searchedreview=await Review.find({"movieid":req.params.id})
        res.send(searchedreview)
    })

//saving new review from body data
app.post("/reviews/add", async (req, res) => 
{
try 
    {
        //creating review object using content in body
        const newReview = new Review(req.body);
        //saving the object to db
        await newReview.save();
        console.log("successfully inserted");
        res.send("Review successfully inserted");
    } 
catch (error) 
    {
        res.send("Error inserting review: " + error.message);
    }
});
//deleting based on movieid
app.delete("/reviews/:id", async (req,res)=>
    {
        let delReview=await Review.findOneAndDelete({"movieid":req.params.id})
        console.log(delReview);
        if(delReview)
        {
            res.send(`Successfully deleted review of ${delReview.moviename}`)
        }
        else
        {
            res.send("Unable to delete")
        } 
    })
//starting the server on PORT 5000
app.listen(process.env.PORT,()=>console.log("server running successfully"))