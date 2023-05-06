const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config();

const userRoute = require("./routes/userRoute")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// [SECTION] I USE MY PERSONAL DATABASE FROM MY PREVIOUS PROJECTS
mongoose.connect(`mongodb+srv://virgodosal:admin123@zuitt-bootcamp.izbumtb.mongodb.net/courseBookingAPI?retryWrites=true&w=majority`, 
	{ 
		useNewUrlParser : true,  
		useUnifiedTopology : true
	}
);

mongoose.connection.once("open", () => console.log('Connected to my Database'));

app.use("/users", userRoute);
app.listen(process.env.PORT || 4000, () => console.log(`Now connected to port ${process.env.PORT || 4000}`));





