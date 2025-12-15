class ApiHelper {
  constructor(query, queryStr) {
    this.query = query; //MongoDB Query
    this.queryStr = queryStr; //Query String from URL
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    this.query = this.query.find(queryCopy);
    return this;
  }
  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

/* 
db.products.find({}) //all Products
db.products.find({
      name:{
           $regex:"Samsung",
            $options:"i"
         }
})// search by name of the product

db.products.find({
      name:{
      $regex:"Samsung",
      $options:"i"
      },
      category:"Mobile",
}) //Search by Name and filter By Category


db.products.find({
category:"Mobile"
}) //filter By Category



*/
