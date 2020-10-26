const Joi = require("@hapi/joi");

const signup = (data)=>{
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(8).required(),
    });
    return schema.validate(data);
};

const login = (data)=>{
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(8).required(),
    });
    return schema.validate(data);

};
module.exports.signup = signup;
module.exports.login = login;