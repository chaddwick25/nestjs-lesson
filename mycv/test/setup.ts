import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
    try {
        await rm(join(__dirname,  '..','test.sqlite'));
    // no error handling required 
    }catch (error) {}    
});

global.afterEach(async () => {
    // closes the file that contains the connection to the DB after each test is finished  
    const conn =  getConnection();
    await conn.close();
});