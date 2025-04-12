export default class APIFeatures {
    constructor(mongooseQuery,queryString){
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    pagination(){
        let page = this.queryString.page*1 || 1 
        if(this.queryString.page <= 0) page= 1
        let skip = (page-1)*4
        this.page = page
         this.mongooseQuery.skip(skip).limit(4)
         return this;
    }

    filter(){
        let filterObj = {...this.queryString}
        let excludedQuery = ["page" , "sort" , "keyword" , "fields"]
        excludedQuery.forEach((e) =>{
            delete filterObj[e]
        })

        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g,match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        
        this.mongooseQuery.find(filterObj)
        return this ;
    }

    sort(){
        if(this.queryString.sort){
            let sortBy = this.queryString.sort.split(",").join(" ")
            this.mongooseQuery.sort(sortBy)
            }
        return this ;
    }

    search(){
        if(this.queryStringkeyword){
            this.mongooseQuery.find({$or:[{name: {$regex:req.query.keyword,$options:"i"}} ,
                 {description: {$regex:req.query.keyword,$options:"i"}}]})
            }
        return this ;
    }

    fields(){
        if(this.queryString.fields){
            let field = this.queryString.fields.split(",").join(" ")
            this.mongooseQuery.select(field)
            }
        return this ;
    }
}