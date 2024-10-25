import User from '../models/User.js';

class UserDao {
  async getAll() {
    return await User.find();
  }

  async getById(id) {
    return await User.findById(id);
  }

  async getByEmail(email) {
    return await User.findOne({ email });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserDao();
