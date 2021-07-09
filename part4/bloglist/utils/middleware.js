const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:", request.path);
  logger.info("Body:", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorisation = request.get("authorization");
  if (authorisation && authorisation.toLowerCase().startsWith("bearer")) {
    request.token = authorisation.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!(request.token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  // only call next(error) if the error is not handled by if conditions, thus, we need to return with the response
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).send({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
