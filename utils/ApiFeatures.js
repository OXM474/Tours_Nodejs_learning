class ApiFeatures {
  constructor(currentQuery, queryStr) {
    (this.currentQuery = currentQuery), (this.queryStr = queryStr);
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludeObj = ["page", "sort", "limit", "fields"];
    excludeObj.forEach((el) => delete queryObj[el]);
    var queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.currentQuery = this.currentQuery.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.currentQuery = this.currentQuery.sort(sortBy);
    } else {
      this.currentQuery = this.currentQuery.sort("-createdAt");
    }

    return this;
  }

  fields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.currentQuery = this.currentQuery.select(fields);
    } else {
      this.currentQuery = this.currentQuery.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.currentQuery = this.currentQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
