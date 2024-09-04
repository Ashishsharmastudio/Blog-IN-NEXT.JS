import mongoose from "mongoose"

export async function mongooseconnect() {
    if (mongoose.connection.readyState === 1) {
        // console.log("MongoDB is already connected");
        return mongoose.connection;
    } else {
        const uri = process.env.MONGODB_URI;
        try {
            await mongoose.connect(uri);
            // console.log("MongoDB connected successfully");
            return mongoose.connection;
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    }
}
