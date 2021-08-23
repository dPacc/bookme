import mongoose from "mongoose";

// An interface that describes properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes properties that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes properties that user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

const usr = User.build({
  email: "test@gmail.com",
  password: "abvasdasd",
});

export { User };
