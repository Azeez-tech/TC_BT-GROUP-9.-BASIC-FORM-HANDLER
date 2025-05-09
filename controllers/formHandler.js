import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, "../data/form.txt");

const formHandler = (req, res, next) => {
  try {
    const { firstName, lastName, age, userName, email, password } = req.body;

    if (!firstName || !lastName || !age || !userName || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Read existing users
    fs.readFile(filePath, "utf-8", (error, data) => {
      let users = [];

      if (!error && data) {
        try {
          users = JSON.parse(data);
        } catch (err) {
          return res.status(500).json({
            status: false,
            message: "Error parsing users data",
          });
        }
      }

      // Check if user already exists
      const userExist = users.find((user) => user.email === email);
      if (userExist) {
        return res.status(400).json({
          status: false,
          message: "User already exists",
        });
      }

      // Add new user
      users.push({ firstName, lastName, age, userName, email, password });

      // Write updated users array back to the file
      fs.writeFile(filePath, JSON.stringify(users), (error) => {
        if (error) {
          return res.status(500).json({
            status: false,
            message: "Failed to write to file",
          });
        }

        res.status(201).json({
          status: "Success",
          message: "User form accepted",
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export default formHandler;
