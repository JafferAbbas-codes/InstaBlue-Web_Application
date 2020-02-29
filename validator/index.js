const { check, validationResult } = require("express-validator");

exports.createPostValidator = (req, res, next) => {
  //title
  check("title", "Write a title").notEmpty();
  check("title", "Length must be between 4 to 158").isLength({
    min: 4,
    max: 158
  });

  //body
  check("body", "Write a body").notEmpty();
  check("body", "Body must be between 4 to 150 characters").isLength({
    min: 4,
    max: 2000
  });
  // check for errors
  const errors = validationResult(req);
  // if error show the first one as they happen
  if (!errors.isEmpty()) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.userSignValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000
    });
  // check for password
  check("password", "Password is required").notEmpty();
  check("password")
    .isLength({ min: 6 })
    .withMessage("Passwword must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  // check for errors
  const errors = validationResult(req);
  // if error show the first one as they happen
  if (!errors.isEmpty()) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
