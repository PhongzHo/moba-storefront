import { Client } from "minio";

export const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || '',
    port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT, 10) : 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || '',
    secretKey: process.env.MINIO_SECRET_KEY || '',
})

export default minioClient;