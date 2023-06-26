exports.GenerateMessage = ({ message, from }) => {
  return {
    from,
    message,
    createdAt: Date.now(),
  };
};
