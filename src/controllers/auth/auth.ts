import { validate } from 'class-validator';

import { User } from '../../entities/user/User';

class AuthController {
  public async doRegister({ email, username, password }: { email: string; username: string; password: string }) {
    try {
      //check if user with this email or username already exist
      const existingUser = await User.findOne({ where: [{ username }, { email }] });

      if (existingUser) {
        if (existingUser.email === email) {
          return {
            status: false,
            message: 'User with this email already exist.',
          };
        }

        if (existingUser.username === username) {
          return {
            status: false,
            message: 'User with this username already exist.',
          };
        }
      }

      //save to db
      const user = new User({ email, username, password });

      //if any validation error return error

      let validationErrors = await validate(user);

      if (validationErrors.length) {
        return {
          status: false,
          message: validationErrors[0].constraints[Object.keys(validationErrors[0].constraints)[0]],
        };
      }

      await user.save();

      return {
        status: true,
        message: 'Account successfully created.',
        data: {
          user,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthController;
