export const isUrl = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return urlPattern.test(text);
};

// Function to detect if content is a phone number
export const isPhoneNumber = (text: string) => {
  const phonePattern = /(\+?\d{1,4}[-.\s]?(\d{1,4}[-.\s]?){1,14})/g;
  return phonePattern.test(text);
};

// Function to detect if content is an email
export const isEmail = (text: string) => {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return emailPattern.test(text);
};

// Function to detect if content is a location (basic check for now)
export const isLocation = (text: string) => {
  const locationPattern = /\d{1,5}\s\w+(\s\w+)*,\s*\w+,\s*\w+/g; // Basic location pattern
  return locationPattern.test(text);
};
