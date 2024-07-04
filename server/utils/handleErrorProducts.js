const chalk = require("chalk");

const handleErrorProducts = (res, status, message = "") => {
  console.error(chalk.redBright(`Error: ${message}`));
  return res.status(status).json({ error: message });
};
const handleErrorCategories = (res, status, message = "") => {
  console.error(chalk.redBright(`Error: ${message}`));
  return res.status(status).json({ error: message });
};
const handleErrorSubCategories = (res, status, message = "") => {
  console.error(chalk.redBright(`Error: ${message}`));
  return res.status(status).json({ error: message });
};

const handleErrorUser = (res, status, message = "") => {
  console.error(chalk.redBright(`Error: ${message}`));
  return res.status(status).json({ error: message });
};
const handleErrorCartItem = (res, status, message = "") => {
  console.error(chalk.redBright(`Error: ${message}`));
  return res.status(status).json({ error: message });
};

const handleErrorOrder = (res, status, message = "") => {
  console.error(chalk.redBright(`Error: ${message}`));
  return res.status(status).json({ error: message });
};


const handleError = (res, status, message = "") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};



const handleBadRequest = async (validator, error) => {
  const errorMessage = `${validator} Error: ${error.message}`;
  error.message = errorMessage;
  error.status = error.status || 400;
  return Promise.reject(error);
};


exports.handleBadRequest=handleBadRequest
exports.handleErrorProducts=handleErrorProducts
exports.handleErrorCategories=handleErrorCategories
exports.handleErrorSubCategories=handleErrorSubCategories
exports.handleErrorUser=handleErrorUser
exports.handleError=handleError
exports.handleErrorCartItem=handleErrorCartItem
exports.handleErrorOrder=handleErrorOrder