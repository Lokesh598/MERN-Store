class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword?{
            name: {
                $regex: this.queryStr.keyword,// $regex is mongodb operator
                $options: 'i'// $options is mongodb operator
            },
        }:{};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr};

        //Removing some fields for category
        const removeFields = ['page', 'keyword', 'limit'];
        
        removeFields.forEach((key) => delete queryCopy[key]);
        //  "/\ " => regular expression
        // console.log(queryCopy);
        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryStr));

        // console.log(queryStr);

        // this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page)|| 1;
        
        const skip = resultPerPage*(currentPage - 1);

        this.query = this.query.skip(skip).limit(resultPerPage);
        // query is nothing but find product
        return this;
    }

}


module.exports = ApiFeatures;