import { MongoClient } from "mongodb";

if(!process.env.MONGODB_URI){
    throw new Error('Invalid/missing Enviroment variable: "MONGODB_URI')
}

const uri = process.env.MONGODB_URI
const option ={}

let client
let clientPromise

if(process.env.NODE_ENV === "development"){
    // in development mode, use a global variable so that the value
    // is preserved accross module reload caused by HMR (Hot module replacement)
    if(!global._mongoClientPromise){
        client = new MongoClient(uri,option)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
}else{
    client = new MongoClient(uri,option)
    clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. by this doing this in a
// seprate module , the client can be shared across function.

export default clientPromise
