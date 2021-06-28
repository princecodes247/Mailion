
//Insert
var axios = require('axios');
var data = JSON.stringify({
  "operation": "insert",
  "schema": "dev",
  "table": "dog",
  "records": [
    {
      "id": 1,
      "dog_name": "Penny",
      "owner_name": "Kyle",
      "breed_id": 154,
      "age": 7,
      "weight_lbs": 38
    }
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:9925',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


//Update
var axios = require('axios');
var data = JSON.stringify({
  "operation": "update",
  "schema": "dev",
  "table": "dog",
  "records": [
    {
      "id": 1,
      "dog_name": "Penny B"
    }
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:9925',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


//Upsert (which is to insert if it doesnt exists 
//but update if it does)
var axios = require('axios');
var data = JSON.stringify({
  "operation": "upsert",
  "schema": "dev",
  "table": "dog",
  "records": [
    {
      "id": 8,
      "weight_lbs": 155
    },
    {
      "name": "Bill",
      "breed": "Pit Bull",
      "id": 10,
      "age": 11,
      "weight_lbs": 155
    },
    {
      "name": "Harper",
      "breed": "Mutt",
      "age": 5,
      "weight_lbs": 155
    }
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:9925',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


//Get by ID 
var axios = require('axios');
var data = JSON.stringify({
  "operation": "search_by_hash",
  "schema": "dev",
  "table": "dog",
  "hash_values": [
    1,
    2
  ],
  "get_attributes": [
    "dog_name",
    "breed_id"
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:9925',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

//Search by value (Returns an array)
var axios = require('axios');
var data = JSON.stringify({
  "operation": "search_by_value",
  "schema": "dev",
  "table": "dog",
  "search_attribute": "owner_name",
  "search_value": "Ky*",
  "get_attributes": [
    "dog_name"
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:9925',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

//Search by conditions
var axios = require('axios');
var data = JSON.stringify({
  "operation": "search_by_conditions",
  "schema": "dev",
  "table": "dog",
  "operator": "and",
  "offset": 0,
  "limit": 10,
  "get_attributes": [
    "*"
  ],
  "conditions": [
    {
      "search_attribute": "age",
      "search_type": "between",
      "search_value": [
        5,
        8
      ]
    },
    {
      "search_attribute": "weight_lbs",
      "search_type": "greater_than",
      "search_value": 40
    },
    {
      "search_attribute": "adorable",
      "search_type": "equals",
      "search_value": true
    }
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:9925',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

//

//Delete by ID
var axios = require('axios');
var data = JSON.stringify({
  "operation": "delete",
  "table": "dog",
  "schema": "dev",
  "hash_values": [
    1,
    2
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:9925',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

