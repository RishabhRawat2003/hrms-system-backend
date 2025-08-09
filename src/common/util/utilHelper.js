import replaceall from "replaceall";
import _ from "lodash";
import configVariables from "../../server/config";
import nodemailer from "nodemailer";
import otpHelper from "../helpers/otp.helper";

export function sanitizeCountryCode(text) {
  if (text) {
    return replaceall("+", "", text); // text.replace('+', '')
  }
  return "";
}

export function getUserInfo(user) {
  return {
    _id: user._id,
    email: user.email,
    phone: user.phone,
    name: user.name,
    address: user.address,
  };
}

export function getAdminInfo(user) {
  return {
    _id: user._id,
    email: user.email,
    phone: user.phone,
    name: user.name,
    role: user.role,
  };
}

export function generateOtp(range) {
  var add = 1,
    max = 12 - add;
  if (range > max) {
    return generate(max) + generate(n - max);
  }
  max = Math.pow(10, range + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return ("" + number).substring(add);
}

export function generateOtpExpireDate() {
  var date = new Date();
  var otpExpiry = new Date(date);
  otpExpiry.setMinutes(date.getMinutes() + 40);
  return otpExpiry;
}

export function getDateMinutesDifference(date) {
  var countDownDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  var diff = Math.abs(currentDate - countDownDate);
  var minutes = Math.floor(diff / 1000 / 60);
  return minutes;
}


export async function sendVerificationEmail(email, subject) {
  try {
    // Generate OTP
    const otp = generateOtp(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await otpHelper.updateOneAndUpdate({
      query: { email },
      updateQuery: {
        otp,
        expiresAt,
        created_at: new Date(),
        updated_at: new Date(),
      },
      options: { upsert: true, new: true },
    });

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configVariables.EMAIL_USER,
        pass: configVariables.EMAIL_PASS,
      },
    });

    // HTML Email Template
    const htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - HRMS System</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; color: #333333;">
      
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(77, 0, 125, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4D007D 0%, #6B1F7B 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
            HRMS System
          </h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px; font-weight: 400;">
            Human Resource Management System
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Greeting -->
          <h2 style="color: #4D007D; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
            Email Verification Required
          </h2>
          
          <p style="color: #4b5563; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            Hi there! 👋<br><br>
            Thank you for joining <strong style="color: #4D007D;">HRMS System</strong>! To complete your registration and secure your account, please verify your email address using the OTP below.
          </p>

          <!-- OTP Box -->
          <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border: 2px solid #4D007D; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
            <p style="color: #4D007D; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
              Your Verification Code
            </p>
            <div style="background: #ffffff; border: 2px dashed #4D007D; border-radius: 8px; padding: 20px; margin: 15px 0;">
              <span style="color: #4D007D; font-size: 36px; font-weight: 800; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </span>
            </div>
            <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 14px;">
              ⏰ <strong>Valid for 10 minutes only</strong>
            </p>
          </div>

          <!-- Instructions -->
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; margin: 30px 0;">
            <h3 style="color: #d97706; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
              📋 How to use this code:
            </h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
              <li>Copy the 6-digit code above</li>
              <li>Return to the HRMS System verification page</li>
              <li>Enter the code to activate your account</li>
            </ul>
          </div>

          <!-- Security Note -->
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="color: #dc2626; margin: 0; font-size: 14px; font-weight: 500;">
              🔒 <strong>Security Note:</strong>
            </p>
            <p style="color: #7f1d1d; margin: 10px 0 0 0; font-size: 14px; line-height: 1.4;">
              Never share this code with anyone. HRMS System will never ask for your verification code via phone or email.
            </p>
          </div>

          <!-- Support -->
          <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; text-align: center;">
            Need help? We're here for you! <br>
            Contact our support team or visit our help center.
          </p>

        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">
            © 2025 HRMS System. All rights reserved.
          </p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            This email was sent to ${email}. If you didn't request this verification, please ignore this email.
          </p>
        </div>

      </div>

      <!-- Mobile Responsiveness -->
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
          .padding { padding: 20px !important; }
          .otp-code { font-size: 28px !important; letter-spacing: 4px !important; }
        }
      </style>

    </body>
    </html>
    `;

    const textMessage = `
    🎯 HRMS SYSTEM - Email Verification
    
    Hi there! 👋
    
    Welcome to HRMS System! To complete your registration, please verify your email address.
    
    Your Verification Code: ${otp}
    
    ⏰ This code expires in 10 minutes.
    
    Instructions:
    1. Copy the code above
    2. Return to the HRMS System verification page  
    3. Enter the code to activate your account
    
    🔒 Security Note: Never share this code with anyone.
    
    Need help? Contact our support team.
    
    © 2025 HRMS System. All rights reserved.
    `;

    const mailOptions = {
      from: `"HRMS System" <${configVariables.EMAIL_USER}>`,
      to: email,
      subject,
      text: textMessage,
      html: htmlMessage,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}



export async function verifyEmailOTP(email, otp) {
  try {
    const otpRecord = await otpHelper.getObjectByQuery({
      query: { email, otp },
    });

    if (!otpRecord) {
      throw "Invalid OTP";
    }

    if (new Date() > otpRecord.expiresAt) {
      await otpHelper.deleteObjectByQuery({ email, otp });
      throw "OTP has expired";
    }

    await otpHelper.deleteObjectByQuery({ email });

    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
}


