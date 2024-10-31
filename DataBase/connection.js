import mongoose from "mongoose";


export function dbConnection(uri){mongoose
  .connect(uri)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));
}