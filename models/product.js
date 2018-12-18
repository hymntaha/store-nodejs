const fs = require('fs');
const path = require('path');

const getProductsFromFile = (callback) =>{
  const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );

  fs.readFile(p, (err, fileContent)=>{
    if(err){
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(t){
    this.title = t;
  }

  save(){
    getProductsFromFile( products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err)=>{
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
