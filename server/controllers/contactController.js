const Message = require('../models/Message');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Name, Email, Message)',
      });
    }

    // Save to database
    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'Portfolio Contact Form Inquiry',
      message,
    });

    // Send email notification via Resend
    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's testing domain
        to: 'harshkumarpandit2004@gmail.com', // The email address to receive notifications
        subject: `New Portfolio Inquiry from ${name}: ${subject || 'No Subject'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        `
      });
    } catch (emailError) {
      console.error('Error sending email via Resend:', emailError);
      // We log the error but still return a success response to the user 
      // since the message was successfully saved to the database.
    }

    return res.status(201).json({
      success: true,
      message: 'Your message has been received! Thank you for contacting me.',
      data: newMessage,
    });
  } catch (error) {
    console.error(`Contact Form Submission Error: ${error.message}`);
    
    // Check for mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Server Error. Please try again later.',
    });
  }
};

module.exports = {
  submitContactForm,
};
