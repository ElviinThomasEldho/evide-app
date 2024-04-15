import mongoose from "mongoose";

const journeySchema = mongoose.Schema(
    {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        terminals: [{
            type: Object,
            required: true,
        }],
        pois: [{
            type: Object,
            required: false,
        }],
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Journey = mongoose.model('Journey', journeySchema);