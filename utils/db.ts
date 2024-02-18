import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose
        .connect(process.env.DB_URI as string)
        .then(() => console.log("Database Connected"))
        .catch(err => console.log(err))
}

export default connectDB