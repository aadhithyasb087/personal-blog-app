import mongoose, { Schema } from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    status: { type: String },

    // img: { type: String },
    // cat: { type: String },
    // views: [{ type: Schema.Types.ObjectId, ref: "Views" }],
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blogs", BlogSchema);

export default Blog;
