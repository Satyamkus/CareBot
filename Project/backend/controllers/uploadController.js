import { cloudinary } from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "carebot",
    });

    res.json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};