import express from "express";
import {
  getContacts,
  saveContactMessage,
} from "../controllers/contact.controller";

const router = express.Router();

// Define the POST route for the contact form submission
router.post("/", saveContactMessage);
router.get("/", getContacts);

export default router;
