const express = require("express");
const router = express.Router();
const cors = require("cors")
const { ensureAuthenticated } = require("../config/auth");
const sendCollectionMail = require("../utils/sendCollectionMail");
const idGenerator = require("../utils/idGenerator");
const { Harpert } = require("../utils/harpert");
const User = new Harpert("users", "user");
const Collection = new Harpert("users", "collection");

router.get("/view/:collectionID", ensureAuthenticated, (req, res) => {
  //

  let collectionID = req.params.collectionID;
  
  Collection.findOne({
    collectionID,
  }).then((collection) => {
  res.render("collection", {
    collection
  });
})
});

router.get("/create", ensureAuthenticated, (req, res) => {
  if (req.user.collections.length < 2) {
    let newCollection = true;

    let collectionID = idGenerator(6);

    Collection.findOne({
      collectionID,
    }).then((collection) => {
      if (!collection) {
        newCollection = false;
        req.user.collections.push(collectionID)
        let collectionData = {
          collectionID,
          userName: req.user.userName,
        };
        Collection.create(collectionData).then(collection=>{
          console.log("collection created");
          res.json({body: collection})
        }).catch(err=>{
          console.log(err);
        })
      }
    });
  } //ADD else statement
});

//Change the request type
router.get("/delete/:collectionID", ensureAuthenticated, (req, res) => {
  let collectionID = req.query.collectionID;
  Collection.deleteOne({ collectionID }).then((collection) => {
    console.log(`${collection} deleted successfully`);
  });
});

router.get("/settings/:collectionID", ensureAuthenticated, (req, res) => {
  let collectionID = req.params.collectionID;
  
  Collection.findOne({
    collectionID,
  }).then((collection) => {
  res.render("collection_settings", {
    collectionID,
    owner: collection.userName,
    useMail: collection.useMail
  });
})
});

router.post("/send/:collectionID", cors(), (req, res) => {
  //
  

  let collectionID = req.params.collectionID;
  let formData = { ...req.body };
  // Move auth to header
  
  if (true) {
    Collection.findOne({
      collectionID,
    })
      .then((collection) => {
        
        if (collection.messages.length < 100) {
          collection.messages.push({ formData });
          Collection.update(collection).then(() => {
            res.json({
              message: "Successful",
            });
          });
          if (collection.useMail == true) {
            sendCollectionMail(req, collection);
          }
        }else {
          res.json("Collection limit exceeded")
        }
      })
      .catch((err) => {
        res.send({
          message: "Unsuccessful",
          error: err,
        });
        return;
      });
  } 
  
});

module.exports = router;
