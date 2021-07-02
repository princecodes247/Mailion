//Insert Method
const axios = require("axios");
class Harpert {
  constructor(schema, table) {
    this.method = "post";
    this.url = process.env.DB_HOST;
    this.auth = process.env.DB_AUTH;
    this.schema = schema;
    this.table = table;
  }
  async makeRequest(data) {
    let config = {
      method: this.method,
      url: this.url,
      headers: {
        Authorization: this.auth,
        "Content-Type": "application/json",
      },
      data,
    };
    let request = await axios(config).then(function (response) {
      return JSON.stringify(response.data);
    });
    return request;
  }
  async insert(item) {
    let data = JSON.stringify({
      operation: "insert",
      schema: this.schema,
      table: this.table,
      records: [item],
    });
    let req = await this.makeRequest(data);
    return JSON.parse(req);
  }
  async create(item) {
    let data = JSON.stringify({
      operation: "insert",
      schema: this.schema,
      table: this.table,
      records: [item],
    });
    let req1 = await this.makeRequest(data);
    let info = JSON.parse(req1);
    let hash = info.inserted_hashes[0];
    let req = await this.findById(hash);
    return JSON.parse(req);
  }
  async find(search_target = { id: "*" }, get_attributes = ["*"]) {
    let data = JSON.stringify({
      operation: "search_by_value",
      schema: this.schema,
      table: this.table,
      search_attribute: Object.keys(search_target)[0],
      search_value: Object.values(search_target)[0],
      get_attributes: get_attributes,
    });
    let req = await this.makeRequest(data);
    return JSON.parse(req);
  }
  async findOne(search_target = { id: "*" }, get_attributes = ["*"]) {
    let data = JSON.stringify({
      operation: "search_by_value",
      schema: this.schema,
      table: this.table,
      search_attribute: Object.keys(search_target)[0],
      search_value: Object.values(search_target)[0],
      get_attributes: get_attributes,
    });
    let req = await this.makeRequest(data);
    return JSON.parse(req)[0];
  }

  async conditionalSearch(
    conditions,
    operator,
    options = { skip, limit },
    get_attributes = ["*"]
  ) {
    let data = JSON.stringify({
      operation: "search_by_conditions",
      schema: this.schema,
      table: this.table,
      operator: operator,
      offset: skip,
      limit: limit,
      get_attributes: get_attributes,
      conditions: conditions,
    });

    let req = await this.makeRequest(data);
    return JSON.parse(req);
  }
  async findById(hash_value = "1", get_attributes = ["*"]) {
    let data = JSON.stringify({
      operation: "search_by_hash",
      schema: this.schema,
      table: this.table,
      hash_values: [hash_value],
      get_attributes: get_attributes,
    });

    let req = await this.makeRequest(data);
    req = JSON.parse(req);

    if (req.length === 1) {
      req = req[0];
      if (typeof req === String) {
        req = req.trim() === "" ? null : req;
      }
    }
    if (req.length === 0) {
      req = undefined;
    }
    return req;
  }

  //? I DON'T UNDERSTAND THIS ONE YET
  async update(id) {
    let data = JSON.stringify({
      operation: "update",
      schema: this.schema,
      table: this.table,
      records: [
        {
          id: id,
          dog_name: "Penny B",
        },
      ],
    });

    let req = await this.makeRequest(data);
    return JSON.parse(req);
  }
  //? I DON'T UNDERSTAND THIS ONE YET
  async upsert(id) {
    let data = JSON.stringify({
      operation: "upsert",
      schema: this.schema,
      table: this.table,
      records: [
        {
          id: id,
          weight_lbs: 155,
        },
        {
          name: "Bill",
          breed: "Pit Bull",
          id: id,
          age: 11,
          weight_lbs: 155,
        },
        {
          name: "Harper",
          breed: "Mutt",
          age: 5,
          weight_lbs: 155,
        },
      ],
    });

    let req = await this.makeRequest(data);
    return JSON.parse(req);
  }
  async delete(hash_value = "1") {
    //Enable multi delete later
    let data = JSON.stringify({
      operation: "delete",
      schema: this.schema,
      table: this.table,
      hash_values: hash_value,
    });

    let req = await this.makeRequest(data);
    if (JSON.parse(req).length === 1) {
      req = JSON.stringify(JSON.parse(req)[0]);
    }
  }
  async deleteOne(hash_value = "1") {
    //Enable multi delete later
    let data = JSON.stringify({
      operation: "delete",
      schema: this.schema,
      table: this.table,
      hash_values: hash_value,
    });

    let req = await this.makeRequest(data);
    if (JSON.parse(req).length === 1) {
      req = JSON.stringify(JSON.parse(req)[0]);
    }
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

//INSERT Working

// let user = {
//   username: "kyle",
//   email: "kyley@gmail.com",
//   password: "passy",
//   status: "active",
//   plan: 0,
//   level: 0,
//   collections: [],
// };
// User.insert()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(`${err} is an error`);
//   });

// req = JSON.parse(req)
// if (req.length === 1) {
//   req = req[0]
//   if(typeof req === String ){
//     req = req.trim() === "" ? null : req;
//   }
// }
// console.log(`${req} ${typeof req} from collection`);
// return req;
