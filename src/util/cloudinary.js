import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

dotenv.config({
    path: './.env'
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'rishabh09',
    api_key: process.env.CLOUDINARY_API_KEY || '634829473791266',
    api_secret: process.env.CLOUDINARY_API_SECRET || '2FgsMmHKGHylLgtoPqQmCTCvkBU',
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'raw',
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}

export { uploadOnCloudinary }