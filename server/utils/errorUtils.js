// Error handling utility function
const handleServerError = (res, message, error) => {
  console.error(message, error);
  return res.status(500).json({ error: message });
};

module.exports = { handleServerError };
