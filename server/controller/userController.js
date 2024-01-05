import User from '../model/userModel.js';

export const create = async (req,res) => { 
    try {
        const userData = new User(req.body);
        if (!userData) {
            return res.status(404).json({ message: "User data not found." });
        } else {
            const saveData = await userData.save();
            res.status(200).json({message: "User data created successfully."});
        }
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

export const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) { 
            return res.status(404).json({ message: "User not found." });
        } else {
            res.status(200).json(userData);
        }
    } catch (err) {
        res.status(500).json({ err: err });
    }
}
 
export const getOne = async (req, res) => { 
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if (!userExists) { 
            return res.status(404).json({ message: "User is not found." });
        } else {
            res.status(200).json(userExists);
        }
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

export const update = async (req, res) => { 
    try {
        const id = req.params.id;
        const userUpdate = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!userUpdate) {
            return res.status(404).json({ message: "User is not found." });
        } else {
            res.status(200).json({message: "User updated successfully." });
        }
    } catch (err) {
        res.status(500).json({ err: err });
    }
}

export const deleteData = async (req, res) => { 
    try {
        const id = req.params.id;
        const userDelete = await User.findByIdAndDelete(id);
        if (!userDelete) {
            res.status(404).json({ message: "User is not found." });
        } else {
            res.status(200).json({message: "User deleted Successfully."});
        }
        
    } catch (err) {
        res.status(500).json({ err: err });
    }
}
