//OFFLINE USE

dbPassword = "mongodb://127.0.0.1/mailion";
if (process.env.APP_ENV == "production") {
  dbPassword = process.env.DB_KEY;
}
// process.env.DB_KEY ||
module.exports = {
  mongoURI: dbPassword,
};

//+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true'
