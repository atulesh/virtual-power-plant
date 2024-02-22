import mongoose from "mongoose";

export const dbConnection = () =>{
    const mongoDBUrl = 'mongodb://localhost:27017/battery';
    mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', async () => {
      console.log('Connected to MongoDB');
    });
}