const User = require('../models/userModels');

exports.getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
};

exports.createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
};

exports.updateUser = async (req, res) => {
    const updated = await User.update(req.body, {
        where: { id: req.params.id }
    });
    res.json(updated);
};

exports.deleteUser = async (req, res) => {
    await User.destroy({
        where: { id: req.params.id }
    });
    res.json({ message: 'User deleted' });
};
