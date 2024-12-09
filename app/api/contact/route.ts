import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let parsedBody;
  try {
    parsedBody = await request.json();
  } catch (error) {
    console.error('Invalid JSON in request:', error);
    return NextResponse.json({ success: false, error: 'Invalid JSON format in request body.' }, { status: 400 });
  }

  const { name, email, phone, receiptNumber, message } = parsedBody;

  if (!name || !email || !phone || !receiptNumber || !message) {
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!phone) missingFields.push('phone');
    if (!receiptNumber) missingFields.push('receiptNumber');
    if (!message) missingFields.push('message')

    return NextResponse.json({
      success: false,
      error: `Missing required fields: ${missingFields.join(', ')}`,
    }, { status: 400 });
  }

  let transporter;
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kurosen930@gmail.com',
        pass: 'wviupaflyroxesfw',
      },
    });

    await transporter.verify();
  } catch (error) {
    console.error('Error setting up email transporter: ', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to setup email transporter. Please try again later.',
    }, { status: 500 });
  }

  const mailOptions = {
    from: 'kurosen930@gmail.com',
    to: 'kurosen930@gmail.com',  
    subject: 'PROOFLY New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Receipt Number: ${receiptNumber}

      Message:
      ${message}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return NextResponse.json({ success: true, response: info.response });
  } catch (error) {
    console.error('Error sending email: ', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message || 'Unknown error sending email.',
    }, { status: 500 });
  }
}
