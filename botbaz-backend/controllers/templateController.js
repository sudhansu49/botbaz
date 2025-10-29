const Template = require('../models/Template');

// Get all templates for user
const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ userId: req.user.id });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get template by ID
const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    // Check if user is authorized to view this template
    if (template.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create template
const createTemplate = async (req, res) => {
  try {
    const { name, content, category, language, variables } = req.body;
    
    const template = new Template({
      name,
      userId: req.user.id,
      content,
      category,
      language,
      variables
    });
    
    const createdTemplate = await template.save();
    res.status(201).json(createdTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update template
const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    // Check if user is authorized to update this template
    if (template.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { name, content, category, language, variables, status } = req.body;
    
    template.name = name || template.name;
    template.content = content || template.content;
    template.category = category || template.category;
    template.language = language || template.language;
    template.variables = variables || template.variables;
    template.status = status || template.status;
    
    const updatedTemplate = await template.save();
    res.json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete template
const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    // Check if user is authorized to delete this template
    if (template.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await template.remove();
    res.json({ message: 'Template removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate
};