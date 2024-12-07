import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, phone, receiptNumber, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kurosen930@gmail.com', 
      pass: 'wviupaflyroxesfw',
    },
  });

  const mailOptions = {
    from: 'kurosen930@gmail.com', 
    to: 'kurosen930@gmail.com',  
    subject: 'New Contact Form Submission',
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
      error: (error as Error).message,
    });
  }
}
