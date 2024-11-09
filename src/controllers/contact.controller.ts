import { Request, Response } from "express";
import {
  createContact,
  getAllContacts,
} from "../business.logic/contact.business.logic";

// Controller for handling the contact form submission
export const saveContactMessage = async (req: Request, res: Response) => {
  const { name, email, mobile, message } = req.body;

  // Basic validation
  if (!name || !email || !mobile || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Save the contact data to the database
    const contact = await createContact({ name, email, mobile, message });

    // Send success response
    res.status(201).json({
      message: "Message saved successfully!",
      contact, // Send the saved contact back to the client
    });
  } catch (error) {
    console.error("Error handling contact message:", error);
    res.status(500).json({ message: "Failed to save message." });
  }
};

// Controller for getting all contacts
export const getContacts = async (req: Request, res: Response) => {
  try {
    // Get all contacts from the database
    const contacts = await getAllContacts();

    // Send success response
    res.status(200).json({
      message: "Contacts retrieved successfully!",
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to retrieve contacts." });
  }
};
