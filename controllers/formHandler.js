import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, "../data/form.txt");

// Simple email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const formHandler = (req, res, next) => {
  const { firstName, lastName, age, userName, email, password } = req.body;

  if (!firstName || !lastName || !age || !userName || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: false,
      message: "Invalid email format",
    });
  }

  // Read existing users
  fs.readFile(filePath, "utf-8", (readErr, data) => {
    let users = [];

    if (!readErr && data) {
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
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
    const newUser = users.push({
      firstName,
      lastName,
      age,
      userName,
      email,
      password,
    });

    // Write updated users array back to the file
    fs.writeFile(filePath, JSON.stringify(newUser, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({
          status: false,
          message: "Failed to write to file",
        });
      }

      res.status(201).json({
        status: "Success",
        message: "User form accepted",
        newUser,
      });
    });
  });
};

export default formHandler;
