exports.localFileUpload = async (req, res) => {
    try {
        console.log("req.files:", req.files);

        // Check if file exists
        if (!req.files || !req.files["file"]) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Fetch file from request
        const file = req.files.file;
        console.log("File received:", file);

        // Define file path
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);

        // Move file to the specified path
        file.mv(path, (err) => {
            if (err) {
                console.error("File move error:", err);
                return res.status(500).json({
                    success: false,
                    message: "File upload failed",
                    error: err.message,
                });
            }

            res.json({
                success: true,
                message: "Local file uploaded successfully",
            });
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({
            success: false,
            message: "Local file upload failed",
            error: error.message,
        });
    }
};