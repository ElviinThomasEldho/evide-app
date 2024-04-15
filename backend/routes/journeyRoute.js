import express from "express";
import { Journey } from "../models/journeyModel.js";

const router = express.Router()

// Route for save new journey
router.post('/', async (request, response) => {
    try {
        if(!request.body.startDate || !request.body.endDate || !request.body.terminals || !request.body.pois || !request.body.status) {
            return response.status(400).send({
                message: 'Send all required fields: startDate, endDate, terminals, pois, status'
            })
        }

        const newJourney = {
            startDate: request.body.startDate,
            endDate: request.body.endDate,
            terminals: request.body.terminals,
            pois: request.body.pois,
            status: request.body.status,
        }

        const journey = await Journey.create(newJourney);

        return response.status(201).send(journey);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Route for getting All journeys from database
router.get('/', async (request, response) => {
    try {
        const journeys = await Journey.find({});

        return response.status(200).json({
            count: journeys.length,
            data: journeys
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one journey from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const journey = await Journey.findById(id);

        return response.status(200).json(journey);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for updating a journey
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.startDate || !request.body.endDate || !request.body.terminals || !request.body.pois || !request.body.status) {
            return response.status(400).send({
                message: 'Send all required fields: startDate, endDate, terminals, pois, status'
            })
        }

        const { id } = request.params;

        const result = await Journey.findByIdAndUpdate(id, request.body);
        console.log(result);
        if (!result) {
            response.status(404).send({ message: 'Journey not found' })
        }

        return response.status(200).json({ message: 'Journey updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one journey from database by id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Journey.findByIdAndDelete(id);

        if (!result) {
            response.status(404).send({ message: 'Journey not found' })
        }

        return response.status(200).json({ message: 'Journey deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default router;