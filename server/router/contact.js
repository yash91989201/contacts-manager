const Contact = require("../models/contacts");
const multer = require("multer");
const express = require("express");

const router = express.Router();

const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "./images");
  },
  filename: function (req, file, callBack) {
    let ext = "";
    if (file.originalname.split(".").length > 1) {
      ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    }

    callBack(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: fileStorageEngine });

class ContactsData {
  async create(
    { userId },
    { contactName, contactNumber, contactEmail, contactType },
    image
  ) {
    try {
      const fxResponse = await this.read({ userId });
      const allContacts = fxResponse.data;
      const contactExists = allContacts.find((currentElement) => {
        return (
          currentElement.contactNumber == contactNumber ||
          currentElement.contactEmail === contactEmail
        );
      });
      if (typeof contactExists == "undefined") {
        if (typeof image !== "undefined") {
          const newContact = new Contact({
            userId,
            isStarred: false,
            contactName,
            contactNumber,
            contactEmail,
            contactType,
            contactImage: image.filename,
          });
          //Saving new user to the database
          await newContact.save();
          return {
            success: true,
            message: "New contact created with the following data",
            data: null,
          };
        } else {
          const newContact = new Contact({
            userId,
            isStarred: false,
            contactName,
            contactNumber,
            contactEmail,
            contactType,
            contactImage: "",
          });
          //Saving new user to the database
          await newContact.save();
          return {
            success: true,
            message: "New contact created with the following data",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "A contact already exists with the given details",
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `${error.type} , ${error.message}`,
        data: null,
      };
    }
  }

  async read({ userId }) {
    try {
      const contacts = await Contact.find({ userId }).sort({ contactName: 1 });
      return {
        success: true,
        message: `All contacts fetched for userId:${userId}`,
        data: contacts,
      };
    } catch (err) {
      return {
        success: false,
        message: `No contact exists for userId:${userId}`,
        data: null,
      };
    }
  }

  async update(
    { userId, id },
    { contactName, contactNumber, contactEmail, contactType },
    image
  ) {
    try {
      const oldContactData = await Contact.findOne({ userId, _id: id });
      if (typeof image !== "undefined") {
        const updatedContactData = {
          userId: oldContactData.userId,
          contactName: contactName || oldContactData.contactName,
          contactNumber: contactNumber || oldContactData.contactNumber,
          contactEmail: contactEmail || oldContactData.contactEmail,
          contactType: contactType || oldContactData.contactType,
          contactImage: image.filename,
        };

        const result = await Contact.updateOne(
          { userId, _id: id },
          { $set: updatedContactData }
        );
      } else {
        const updatedContactData = {
          userId: oldContactData.userId,
          contactName: contactName || oldContactData.contactName,
          contactNumber: contactNumber || oldContactData.contactNumber,
          contactEmail: contactEmail || oldContactData.contactEmail,
          contactType: contactType || oldContactData.contactType,
          contactImage: oldContactData.contactImage,
        };
        const result = await Contact.updateOne(
          { userId, _id: id },
          { $set: updatedContactData }
        );
      }

      return {
        success: true,
        message: "Contact Data updated",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: `${error.type} , ${error.message} + hello`,
      };
    }
  }

  async delete({ userId, id }) {
    try {
      const result = await Contact.deleteOne({ userId, _id: id });
      return {
        success: true,
        message: `Deleted contact`,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: `${error.type} , ${error.message}`,
        data: null,
      };
    }
  }

  async starContact({ userId, id, isStarred }) {
    try {
      await Contact.updateOne({ userId, _id: id }, { $set: { isStarred } });
      return {
        success: true,
        message: "the contact has been starred",
        data: null,
      };
    } catch (err) {
      return {
        success: false,
        message: `${err.type} ${err.message}`,
      };
    }
  }
}

// get all contacts related to passed userId
router.get("/allContacts/", async (req, res) => {
  const contactsData = new ContactsData();
  const allContacts = await contactsData.read(req.query);
  if (allContacts.success) res.status(200).json(allContacts);
  else res.status(404).json(allContacts);
});

// update contact status to star contact
router.get("/starContact/", async (req, res) => {
  const contact = new ContactsData();
  const starContact = await contact.starContact(req.query);
  if (starContact.success) res.status(200).json(starContact);
  else res.status(404).json(starContact);
});

// server images to the front end
router.get("/images/", async (req, res) => {
  res.sendFile(
    `C:/Users/LENOVO/Desktop/project1/server/images/${req.query.imgName}`
  );
});

// create a new contact for the user with the passed userId
// and the passed contact data
router.post(
  "/createContact/",
  upload.single("contactImage"),
  async (req, res) => {
    const contact = new ContactsData();
    const createContact = await contact.create(req.query, req.body, req.file);

    if (
      createContact.success ||
      createContact.message ===
        "A contact already exists with the given details"
    )
      res.status(200).json(createContact);
    else res.status(404).json(createContact);
  }
);

// update an existing contact  with the newly passed contact details
// for the user with the passed userId
router.patch(
  "/updateContact/",
  upload.single("contactImage"),
  async (req, res) => {
    const contact = new ContactsData();
    const updateContact = await contact.update(req.query, req.body, req.file);
    if (updateContact.success) res.status(200).json(updateContact);
    else res.status(404).json(updateContact);
  }
);

// delete one contact according to the passed contactGroup and emailId
// for the user with the passed userId
router.delete("/deleteContact/", async (req, res) => {
  const contact = new ContactsData();
  const deleteContact = await contact.delete(req.query);
  if (deleteContact.success) res.status(200).json(deleteContact);
  else res.status(404).json(deleteContact);
});

module.exports = router;
/* 

API End Points along with the required query parameters

1. http://localhost:3000/allContacts/?userId={valid user id}

2.

3. http://localhost:3000/newContact/?userId={valid user id}&

4. 

5. http://localhost:3000/updateContact/?userId={valid user id}&emailId={valid email id of the valid contact}

6. 

7. http://localhost:3000/deleteContact/?userId={valid user id}&emailId={valid email id of a valid contact}

8. 

9.

*/
