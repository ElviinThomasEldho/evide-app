import express from "express";
import { POI } from "../models/poiModel.js";

const router = express.Router()

// Route for save new poi
router.post('/', async (request, response) => {
    try {
        if(!request.body.name || !request.body.type || !request.body.openingTime || !request.body.closingTime || !request.body.latitude || !request.body.longitude) {
            return response.status(400).send({
                message: 'Send all required fields: name, type, openingTime, closingTime, latitude, longitude'
            })
        }

        const newPOI = {
            name: request.body.name,
            type: request.body.type,
            openingTime: request.body.openingTime,
            closingTime: request.body.closingTime,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
        }

        const poi = await POI.create(newPOI);

        return response.status(201).send(poi);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Route for getting All pois from database
router.get('/', async (request, response) => {
    try {
        const pois = await POI.find({});

        return response.status(200).json({
            count: pois.length,
            data: pois
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one poi from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const poi = await POI.findById(id);

        return response.status(200).json(poi);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for updating a poi
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.name || !request.body.type || !request.body.openingTime || !request.body.closingTime || !request.body.latitude || !request.body.longitude) {
            return response.status(400).send({
                message: 'Send all required fields: name, type, openingTime, closingTime, latitude, longitude'
            })
        }

        const { id } = request.params;

        const result = await POI.findByIdAndUpdate(id, request.body);
        console.log(result);
        if (!result) {
            response.status(404).send({ message: 'POI not found' })
        }

        return response.status(200).json({ message: 'POI updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for getting one poi from database by id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await POI.findByIdAndDelete(id);

        if (!result) {
            response.status(404).send({ message: 'POI not found' })
        }

        return response.status(200).json({ message: 'POI deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default router;