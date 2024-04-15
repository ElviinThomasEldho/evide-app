import mongoose from "mongoose";

const terminalSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
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

export const Terminal = mongoose.model('Terminal', terminalSchema);