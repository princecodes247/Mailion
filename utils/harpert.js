//Insert Method
const axios = require("axios");
class Harpert {
  constructor(schema, table) {
    this.method = "post";
    this.url = "https://veldora-princecodes.harperdbcloud.com";
    this.auth = "Basic YWRtaW46dmVsZG9yYWFkbWlu";
    this.schema = schema;
    this.table = table;
  }
  async makeRequest(data){
    let config = {
      method: this.method,
      url: this.url,
      headers: {
        Authorization: this.auth,
        "Content-Type": "application/json",
      },
      data,
    };
    let request = await axios(config)
    return request.json()
  }
  insert() {
    let item = {
      id: 1,
      email: "Penny",
      owner_name: "Kyle",
      breed_id: 154,
      age: 7,
      weight_lbs: 38,
    };
    let data = JSON.stringify({
      operation: "insert",
      schema: "users",
      table: "user",
      records: [item],
    });

   return this.makeRequest(data);
  }
  find(search_attribute = "id", search_value = ["*"], get_attributes = ["*"]) {
    let data = JSON.stringify({
      "operation": "search_by_value",
      "schema": this.schema,
      "table": this.table,
      "search_attribute": search_attribute,
      "search_value": search_value,
      "get_attributes": get_attributes
    });
    
    return this.makeRequest(data);
  }


  conditionSearch(get_attributes = ["*"], conditions) {
    let data = JSON.stringify({
      "operation": "search_by_conditions",
      "schema": this.schema,
      "table": this.table,
      "operator": operator,
      "offset": skip,
      "limit": limit,
      "get_attributes": get_attributes,
      "conditions": conditions
    });
    
    return this.makeRequest(data);
    
  }
  findById(hash_values = ["*"], get_attributes = ["*"]) {
    let data = JSON.stringify({
      "operation": "search_by_hash",
      "schema": this.schema,
      "table": this.table,
      "hash_values": hash_values,
      "get_attributes": get_attributes
    });
    
    
    return this.makeRequest(data);
  }

  //? I DON'T UNDERSTAND THIS ONE YET
  update() {
    let data = JSON.stringify({
      "operation": "update",
      "schema": this.schema,
      "table": this.table,
      "records": [
        {
          "id": 1,
          "dog_name": "Penny B"
        }
      ]
    });
    
    return this.makeRequest(data);
    
  }
  //? I DON'T UNDERSTAND THIS ONE YET
  upsert() {
    let data = JSON.stringify({
      "operation": "upsert",
      "schema": this.schema,
      "table": this.table,
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
    
    return this.makeRequest(data);
  }
  delete(hash_values) {
    let data = JSON.stringify({
      "operation": "delete",
      "schema": this.schema,
      "table": this.table,
      "hash_values": hash_values
    });
    
    return this.makeRequest(data);
    
    
  }
}
//TEST
// conditionSearch() {
//   let data = JSON.stringify({
//     "operation": "search_by_conditions",
//     "schema": this.schema,
//     "table": this.table,
//     "operator": operator,
//     "offset": skip,
//     "limit": limit,
//     "get_attributes": [
//       "*"
//     ],
//     "conditions": [
//       {
//         "search_attribute": "age",
//         "search_type": "between",
//         "search_value": [
//           5,
//           8
//         ]
//       },
//       {
//         "search_attribute": "weight_lbs",
//         "search_type": "greater_than",
//         "search_value": 40
//       },
//       {
//         "search_attribute": "adorable",
//         "search_type": "equals",
//         "search_value": true
//       }
//     ]
//   });
  
//   return this.makeRequest(data);
//}

module.exports = { Harpert };

//FROM AXIOS
// .then(function (response) {
//   let data = JSON.stringify(response.data);
//   console.log(data);
//   return data;
// })
// .catch(err=>{
//   console.log(err)
//   return err;
// })

//EXAMPLES OF CONDITIONS
// [
//   {
//     "search_attribute": "age",
//     "search_type": "between",
//     "search_value": [
//       5,
//       8
//     ]
//   },
//   {
//     "search_attribute": "weight_lbs",
//     "search_type": "greater_than",
//     "search_value": 40
//   },
//   {
//     "search_attribute": "adorable",
//     "search_type": "equals",
//     "search_value": true
//   }
// ]