import mongoose from "mongoose";

const poiSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        openingTime: {
            type: String,
            required: true,
        },
        closingTime: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
            default: 0,
        },
        longitude: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

export const POI = mongoose.model('POI', poiSchema);