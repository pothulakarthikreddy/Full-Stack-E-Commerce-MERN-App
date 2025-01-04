const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
    if (!process.env.REACT_APP_CLOUD_NAME_CLOUDINARY) {
        throw new Error("Missing REACT_APP_CLOUD_NAME_CLOUDINARY environment variable");
    }

    if (!(image instanceof File || image instanceof Blob)) {
        throw new Error("Invalid image file provided");
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product");
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Cloudinary upload failed: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
