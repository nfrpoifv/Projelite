const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

async function getProfile(req, res) {
    try {
        const user = await User.findByPk(req.user.userId, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProfile(req, res) {
    try {
        const user = await User.findByPk(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.update(req.body);
        
        const { password: _, ...userData } = user.toJSON();
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findByPk(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({ password: hashedPassword });
        
        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};