const express = require("express");
const router = express.Router();
const cors = require("cors")
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/user");
const Collection = require("../models/collection");
const sendCollectionMail = require("../utils/sendCollectionMail");
const idGenerator = require("../utils/idGenerator");

router.get("/view/:collectionID", ensureAuthenticated, (req, res) => {
  //
  let collectionID = req.params.collectionID;
  
  Collection.findOne({
    warpID,
  }).then((warp) => {
  res.render("warp", {
    warp
  });
})
});

router.get("/create", ensureAuthenticated, (req, res) => {
  if (req.user.warps.length < 2) {
    let newCollection = true;

    let warpID = idGenerator(6);

    Collection.findOne({
      warpID,
    }).then((warp) => {
      if (!warp) {
        newWarp = false;
        req.user.warps.push(warpID)
        let warpData = {
          warpID,
          userName: req.user.userName,
        };
        Warp.create(warpData).then(warp=>{
          console.log("warp created");
          res.json({body: warp})
        }).catch(err=>{
          console.log(err);
        })
      }
    });
  } //ADD else statement
});

//Change the request type
router.get("/delete/:warpID", ensureAuthenticated, (req, res) => {
  let warpID = req.query.warpID;
  Collection.deleteOne({ warpID }).then((warp) => {
    console.log(`${warp} deleted successfully`);
  });
});

router.get("/settings/:warpID", ensureAuthenticated, (req, res) => {
  let warpID = req.params.warpID;
  
  Collection.findOne({
    warpID,
  }).then((warp) => {
  res.render("warp_settings", {
    warpID,
    owner: warp.userName,
    useMail: warp.useMail
  });
})
});

router.post("/send/:warpID", cors(), (req, res) => {
  //
  

  let warpID = req.params.warpID;
  let formData = { ...req.body };
  // Move auth to header
  
  if (true) {
    Collection.findOne({
      warpID,
    })
      .then((warp) => {
        
        if (warp.messages.length < 100) {
          warp.messages.push({ formData });
          warp.save().then(() => {
            res.json({
              message: "Successful",
            });
          });
          if (warp.useMail == true) {
            sendWarpMail(req, warp);
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
