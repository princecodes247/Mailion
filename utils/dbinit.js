// router.get("/setupdb", (req, res) => {
    //   let user = {
    //     userName: "kyle",
    //     email: "kyley@gmail.com",
    //     password: "passy",
    //     plan: 0,
    //     level: 0,
    //     status: "active",
    //     collections: [],
    //   };
    //   User.insert(user)
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log(`${err} is an error`);
    //     });
    
    //   let code = {
    //     email: "kyley@gmail.com",
    //     code: "passy",
    //   };
    //   Code.insert(code)
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log(`${err} is an error`);
    //     });
    //   let collection = {
    //     title: "Space Forms",
    //     description: "This is the form I use to id",
    //     userName: "kyle",
    //     email: "kyley@gmail.com",
    //     active: true,
    //     useMail: false,
    //     settings: [],
    //     entries: [],
    //   };
    //   Collection.insert(collection)
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log(`${err} is an error`);
    //     });
    //   let review = {
    //     name: "John Coe",
    //     message: "really cool bruh",
    //     title: "Frontend Dev at Spamss",
    //     email: "kyley@gmail.com",
    //     rating: 3.5,
    //   };
    //   Review.insert(review)
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log(`${err} is an error`);
    //     });
    // });