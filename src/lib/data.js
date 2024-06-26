import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { unstable_noStore as noStore } from "next/cache";

// TEMPORARY DATA
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];

// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    console.log("posts-db");
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({
      slug,
    });
    console.log("post-db");

    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};

export const getUsers = async (id) => {
  try {
    connectToDb();
    const users = await User.find();
    console.log("users-db");
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

export const getUser = async (id) => {
  // DISABLES THE CACHING  MECHANISM FOR THIS REQUEST'S RESPONSE
  noStore();
  try {
    connectToDb();
    const user = await User.findById(id);
    console.log("user-db");
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user!");
  }
};
