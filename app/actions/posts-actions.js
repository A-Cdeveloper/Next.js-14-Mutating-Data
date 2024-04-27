"use server";

import { uploadImage } from "@/lib/cloudinary";
import { redirect } from "next/navigation";

const { storePost } = require("@/lib/posts");

export async function createPost(prevFormData, formData) {
  const data = Object.fromEntries(formData.entries());
  const { title, content, image } = data;

  // const title = formData.get('title');
  // const image = formData.get('image');
  // const content = formData.get('content');

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed.Post was not created");
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });
  redirect("/feed");
}
