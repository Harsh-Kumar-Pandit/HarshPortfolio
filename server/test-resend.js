require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'harshkumarpandit2004@gmail.com',
      subject: 'Test Email from Resend',
      html: '<p>If you see this, Resend works!</p>'
    });
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testResend();
