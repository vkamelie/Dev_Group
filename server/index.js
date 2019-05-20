const { data } = require("./schools");
require("dotenv").config();
//Environment Variables
const { PORT, CONNECTION_STRING } = process.env;

//Dependencies
const express = require("express");
const app = express();
const massive = require("massive");

//Top level middlewares
app.use(express.json());

//Database
massive(CONNECTION_STRING)
  .then(db => {
    console.log("connected to db");
    app.set("db", db);
    db.init();
  })
  .catch(err => {
    console.log("Failed to connect to db");
  });

//Middlewares
const reviewsController = require("./Controllers/reviewsController");

//Endpoints
app.get("/schools/all", (req, res) => {
  res.status(200).send(data); //For getting all data yooo
});

app.get("/schools/:id/reviews", async (req, res) => {
  //We want the information about the school, as well as all of the reviews that go with the school
  const { id } = req.params;
  const db = req.app.get("db");
  const school = data.filter(school => school.id == id);
  const reviews = await db.get_reviews(id);
  //send all the school info PLUS all reviews associated with them
  res.status(200).send({
    school,
    reviews
  });
});

app.post("/schools/:id/reviews", async (req, res, next) => {
  //We will probably need to add LOGGED IN middleware here
  const { course, rating, post } = req.body; //We will need to talk about the data being sent up from the client, this is a rough draft
  //I imagine the user will fill in the course they took?
  const user_id = req.session.user.id; //This is assuming we are using sessions. This is the user id
  const { id } = req.params; //This is the school id
  const db = req.app.get("db");
  //Just send the updated reviews
  const newReviews = await db.add_review([user_id, id, course, rating, post]);
  res.status(200).send(newReviews);
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
