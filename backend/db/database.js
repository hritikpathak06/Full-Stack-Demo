var mongoose = require("mongoose");

const uri = "mongodb+srv://phritik06:7gm24fc24ZNcv4SX@eccomerce-website.c0v11an.mongodb.net/Eccomerce-Website?retryWrites=true&w=majority"


mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(() => console.log("database connected successfully"))
// .catch((err) => console.log(err));
