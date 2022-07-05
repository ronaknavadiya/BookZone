const Users = require("../models/Users");

const AddFavGenre = async (req, res) => {
  try {
    const { genre, userId } = req.body;
    if (!genre) {
      genre = ["Art"];
    }

    const currentUser = Users.findById(userId);
    if (!currentUser) {
      return res.status(400).send("Not able to find user");
    }

    Users.findByIdAndUpdate(userId, { genre: genre }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err.message);
      }
    });
    return res.status(200).send("Favourite genre has been saved...");
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error.message);
  }
};

module.exports = { AddFavGenre };
