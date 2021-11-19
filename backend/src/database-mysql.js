import  mysql  from 'mysql2/promise';
import { config } from './config.js';

export const connect = async () => {
    try {
        return await mysql.createConnection(config);
    } catch (error) {
        console.log("Connect error in backend/src/'database-mysql.js':", error)
    }
}
