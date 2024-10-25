import UserDao from '../daos/userDao.js';
import bcrypt from 'bcryptjs';
import UserDto from '../dtos/userDto.js';
import jwt from 'jsonwebtoken';
//import { use } from 'passport';

const authController = {
  signup: async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
      const existingUser = await UserDao.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      const newUser = {
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
      };

      const createdUser = await UserDao.create(newUser);
      const userDto = new UserDto(createdUser);

      res.status(201).json({ message: 'User created successfully', user: userDto });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log('Request received for login:', email);
  
      // Verificar si el usuario existe
      const user = await UserDao.getByEmail(email);
      if (!user) {
        console.log('User not found:', email);
        return res.status(401).json({ message: 'Invalid credentials1' });
      }

      // Comparar la contraseña usando bcrypt.compare
      const isMatch = await bcrypt.compareSync('123456', user.password);
//bcrypt.compare(req.body.password, user.password);
      

console.log('Hash stored in the database:', user.password);

  
      if (!isMatch) {
        console.log('Password mismatch for user:', email);  // LOG cuando la comparación falla
        return res.status(401).json({ message: 'Invalid credentials2' });
      }
  
      console.log('Password matches, generating JWT');  // LOG cuando la contraseña coincide
  
      // Generar el token JWT
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Enviar el token en una cookie
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  
      console.log('Login successful, token sent');
  
      // Devolver los datos del usuario (sin contraseña)
      const userDto = new UserDto(user);
      res.json({ message: 'Login successful', user: userDto });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  },  
  

  currentUser: (req, res) => {
    const userDto = new UserDto(req.user);
    res.json(userDto);
  }
};

export default authController;
