import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router()

// Route for save new user
router.post('/', async (request, response) => {
    try {
        if(!request.body.name || !request.body.username || !request.body.dob || !request.body.phone || !request.body.email) {
            return response.email(400).send({
                message: 'Send all required fields: name, username, dob, phone, email'
            })
        }

        const newUser = {
            name: request.body.name,
            username: request.body.username,
            dob: request.body.dob,
            phone: request.body.phone,
            email: request.body.email,
        }

        const user = await User.create(newUser);

        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Route for getting All users from database
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});

        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one user from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for updating a user
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.name || !request.body.username || !request.body.dob || !request.body.phone || !request.body.email) {
            return response.email(400).send({
                message: 'Send all required fields: name, username, dob, phone, email'
            })
        }

        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);
        console.log(result);
        if (!result) {
            response.status(404).send({ message: 'User not found' })
        }

        return response.status(200).json({ message: 'User updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one user from database by id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            response.status(404).send({ message: 'User not found' })
        }

        return response.status(200).json({ message: 'User deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default router;