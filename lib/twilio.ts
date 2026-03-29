import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

function getClient() {
  if (!accountSid || !authToken) {
    throw new Error('Twilio credentials not configured');
  }
  return twilio(accountSid, authToken);
}

export async function sendSMS(to: string, message: string): Promise<void> {
  if (!to || !fromNumber) {
    console.warn('SMS not sent: missing phone number');
    return;
  }

  const client = getClient();
  await client.messages.create({
    body: message,
    from: fromNumber,
    to,
  });
}
