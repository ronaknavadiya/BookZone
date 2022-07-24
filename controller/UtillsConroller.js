const Users = require("../models/Users");

const AddFavGenre = async (req, res) => {
  try {
    const { genre, userId } = req.body;
    if (!genre) {
      genre = ["Art"];
    }

    const currentUser = await Users.findById(userId);
    if (!currentUser) {
      return res.status(400).send("Not able to find user");
    }

    await Users.findByIdAndUpdate(userId, { genre: genre }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err.message);
      }
    });
    return res.status(200).send("Favourite genre has been saved...");
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error.message);
  }
};

const LikeBooks = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    console.log(userId, bookId);
    const currentUser = await Users.findById(userId);
    if (!currentUser) {
      return res.status(400).send("Not able to find user");
    }
    console.log("user:", currentUser);
    currentUser.likedBooks = currentUser.likedBooks;
    console.log(currentUser.likedBooks);
    let msg = "";
    if (currentUser.likedBooks.includes(bookId)) {
      let newArray = currentUser.likedBooks.filter((val) => val !== bookId);
      currentUser.likedBooks = newArray;
      msg = "Book has been Unliked...";
    } else {
      currentUser.likedBooks.push(bookId);
      msg = "Book has been liked...";
    }
    await Users.findByIdAndUpdate(
      userId,
      { likedBooks: currentUser.likedBooks },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err.message);
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    return res.status(200).send(msg);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error.message);
  }
};


module.exports = { AddFavGenre, LikeBooks };
