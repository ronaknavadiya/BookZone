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
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    return res.status(200).send("Favourite genre has been saved...");
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error.message);
  }
};

const LikeBooks = async (req, res) => {
  try {
    const { userId, selfLink } = req.body;

    const currentUser = await Users.findById(userId);
    if (!currentUser) {
      return res.status(400).send("Not able to find user");
    }
    // console.log("user:", currentUser);
    currentUser.likedBooks = currentUser.likedBooks;
    // console.log(currentUser.likedBooks);
    let msg = "";
    if (currentUser.likedBooks.includes(selfLink)) {
      let newArray = currentUser.likedBooks.filter((val) => val !== selfLink);
      currentUser.likedBooks = newArray;
      msg = "Book has been Unliked...";
    } else {
      currentUser.likedBooks.push(selfLink);
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

const getSpecificUser = async (req, res) => {
  const { userId } = req.body;
  // console.log(req.body);
  try {
    const curreentuser = await Users.findById(userId);
    if (curreentuser) {
      delete curreentuser.password;
    }
    return res.status(200).json(curreentuser);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error.message);
  }
};

const postFeedback = async (req, res) => {
  const { userId, book, comment } = req.body;
  try {
    const curreentuser = await Users.findById(userId);

    if (curreentuser) {
      const comObj = {
        book: book,
        comment: comment,
      };

      curreentuser.feedbacks.push(comObj);

      await Users.findByIdAndUpdate(
        userId,
        { feedbacks: curreentuser.feedbacks },
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

      res.status(200).json(curreentuser);
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error.message);
  }
};

module.exports = { AddFavGenre, LikeBooks, getSpecificUser, postFeedback };
