import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';

dotenv.config();

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const sendOrderConfirmation = async (order, userEmail, userName) => {
  const params = {
    Source: process.env.SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [userEmail]
    },
    Message: {
      Subject: {
        Data: `Order Confirmation - ${order.order_number}`
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #FF9900;">Order Confirmed!</h2>
              <p>Hi ${userName},</p>
              <p>Thank you for your order. We've received your order and will process it shortly.</p>
              
              <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
                <h3>Order Details</h3>
                <p><strong>Order Number:</strong> ${order.order_number}</p>
                <p><strong>Total Amount:</strong> $${order.total_amount}</p>
                <p><strong>Status:</strong> ${order.status}</p>
              </div>
              
              <p>You can track your order status in your account dashboard.</p>
              <p>Thank you for shopping with ShopHub!</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 12px;">This is an automated email. Please do not reply.</p>
            </div>
          `
        }
      }
    }
  };

  try {
    const command = new SendEmailCommand(params);
    await sesClient.send(command);
    console.log('Order confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

export default sesClient;
