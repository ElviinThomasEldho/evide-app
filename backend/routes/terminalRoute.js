import express from "express";
import { Terminal } from "../models/terminalModel.js";

const router = express.Router()

// Route for save new terminal
router.post('/', async (request, response) => {
    try {
        if(!request.body.name || !request.body.type || !request.body.latitude || !request.body.longitude) {
            return response.status(400).send({
                message: 'Send all required fields: name, type, latitude, longitude'
            })
        }

        const newTerminal = {
            name: request.body.name,
            type: request.body.type,
            latitude: request.body.latitude,
            longitude: request.body.longitude
        }

        const terminal = await Terminal.create(newTerminal);

        return response.status(201).send(terminal);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Route for getting All terminals from database
router.get('/', async (request, response) => {
    try {
        const terminals = await Terminal.find({});

        return response.status(200).json({
            count: terminals.length,
            data: terminals
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one terminal from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const terminal = await Terminal.findById(id);

        return response.status(200).json(terminal);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for updating a terminal
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.name || !request.body.type || !request.body.latitude || !request.body.longitude) {
            return response.status(400).send({
                message: 'Send all required fields: name, type, latitude, longitude'
            })
        }

        const { id } = request.params;

        const result = await Terminal.findByIdAndUpdate(id, request.body);
        console.log(result);
        if (!result) {
            response.status(404).send({ message: 'Terminal not found' })
        }

        return response.status(200).json({ message: 'Terminal updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one terminal from database by id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Terminal.findByIdAndDelete(id);

        if (!result) {
            response.status(404).send({ message: 'Terminal not found' })
        }

        return response.status(200).json({ message: 'Terminal deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default router;