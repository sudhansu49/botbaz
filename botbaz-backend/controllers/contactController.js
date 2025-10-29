const Contact = require('../models/Contact');

// Get all contacts for user
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Check if user is authorized to view this contact
    if (contact.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create contact
const createContact = async (req, res) => {
  try {
    const { name, phone, email, tags } = req.body;
    
    const contact = new Contact({
      name,
      phone,
      email,
      tags,
      userId: req.user.id
    });
    
    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Check if user is authorized to update this contact
    if (contact.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { name, phone, email, tags, lastContacted, optIn } = req.body;
    
    contact.name = name || contact.name;
    contact.phone = phone || contact.phone;
    contact.email = email || contact.email;
    contact.tags = tags || contact.tags;
    contact.lastContacted = lastContacted || contact.lastContacted;
    contact.optIn = (optIn !== undefined) ? optIn : contact.optIn;
    
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Check if user is authorized to delete this contact
    if (contact.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await contact.remove();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};