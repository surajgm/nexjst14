"use server";

import { Post } from "./models";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";

export const addPost = async (formData) => {
  "use server";
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);
  console.log(title, desc, slug, userId, formData);
  try {
    connectToDb();
    console.log("Connected");
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });
    console.log("newPost", newPost);
    await newPost.save();
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Failed to connect to DB!" };
  }
};

export const deletePost = async (formData) => {
  // FOR INDIVIDUAL SERVER ACTION DEFINING WITHIN SERVER METHOD IF ALL THE METHODS ARE SERVER ACTIONS IN THIS FILE THAN WE CAN USE IT ON TOP OF THE FILE
  //   "use server";

  const { id } = Object.fromEntries(formData);
  console.log("id", id);
  try {
    connectToDb();
    console.log("Connected");
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Failed to connect to DB!" };
  }
};
