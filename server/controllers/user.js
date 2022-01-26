const UserModal = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");

const signin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id },
            process.env.SECRET, {
                expiresIn: "1h",
            }
        );

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signup = async(req, res) => {
    console.log("email: ", req.body);
    const { email, password, firstName, lastName, role } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            role,
        });

        const token = jwt.sign({ email: result.email, id: result._id },
            process.env.SECRET, {
                expiresIn: "1h",
            }
        );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

const ChangeRole = async(req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Task Found ! ");

    const updated = await User.findByIdAndUpdate(
        id, { role: role }, { new: true }
    );
    res.status(200).send(updated);
};

module.exports = { signin, signup, ChangeRole };