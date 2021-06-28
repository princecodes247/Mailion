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
  
  Collection.findById(collectionID).then((collection) => {
    let keys = Object.keys(Object.assign({}, ...collection.entries))
    let locals = {
      layout: "layouts/layout",
      title: `${collection.title} Collection - ${process.env.APP_NAME}`,
      collection,
      keys
    };
    res.render("collection", locals);
})
});

router.post("/create", ensureAuthenticated, (req, res) => {
  if (req.user.collections.length < 10) {
    let { title, desc } = req.body;
    title = title.toString().trim();
    desc = desc.toString().trim();
    let newCollection = true;
//Replace with uuid
    let collectionID = `${idGenerator(6)}${title[0]}${title[1]}${title[2]}`;

    Collection.findById(
      collectionID,
    ).then((collection) => {
      if (!collection) {
        newCollection = false;
        req.user.collections.push(collectionID)
        let collectionData = {
          collectionID,
          userName: req.user.userName,
          title,
          desc
        };
        Collection.insert(collectionData).then(collection=>{
          console.log("collection created");

          res.json(collectionData)
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
  Collection.delete(collectionID).then((collection) => {
    console.log(`${collection} deleted successfully`);
  });
});

router.get("/settings/:collectionID", ensureAuthenticated, (req, res) => {
  let collectionID = req.params.collectionID;
  
  Collection.findById(collectionID).then((collection) => {

if (!collection || collection === null) {
  res.redirect("/login")
}
let locals = {
  layout: "layouts/static",
  title: `Home - ${process.env.APP_NAME}`,
  collectionID,
  owner: collection.userName,
  useMail: collection.useMail
};
res.render("collection_settings", locals);
})
});

router.post("/send/:collectionID", cors(), (req, res) => {
  //
  

  let collectionID = req.params.collectionID;
  let formData = { ...req.body };
  // Move auth to header
  
  if (true) {
    Collection.findById(collectionID)
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
