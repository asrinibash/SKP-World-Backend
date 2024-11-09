import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Business logic for creating a contact entry
export const createContact = async (contactData: {
  name: string;
  email: string;
  mobile: string;
  message: string;
}) => {
  try {
    // Save the contact data to the database
    const contact = await prisma.contact.create({
      data: {
        name: contactData.name,
        email: contactData.email,
        mobile: contactData.mobile,
        message: contactData.message,
      },
    });

    return contact; // Return the saved contact
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new Error("Failed to save contact");
  }
};

// Business logic for getting all contact entries
export const getAllContacts = async () => {
  try {
    // Fetch all contact data from the database
    const contacts = await prisma.contact.findMany();
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }
};
