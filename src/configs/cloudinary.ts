import { v2 as cloudinary } from "cloudinary";
import { env } from "./config.js";

cloudinary.config(env.cloudinary);

export default cloudinary;
