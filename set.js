const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUkzRlB0a0NGMVVPVm1jMTRqbjY1UTd2K3dxTXpDTnlxbkw3WUcrZWxFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZHhyYitMczVHcndXdU9pRVZKb3l5Mlp5R1AvNUUyR3o4SmxmQTJZbHJTRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSk92OGF0TS9vTXhoZnVsREtMN1BqSm82TmNMZFJSU1dKb0E4UVVCQTNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrUUk0MFFqeVdGcUx5MTRWbGRObldBRFR1bkJPaGpDL25EK2VqcWFtVXpvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhOUVRScFcweHdiUGx1V1Y1NTNuU3dXZWZkKzZ1UGhUV1B1RmdmbXh1R0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InN5UDg2dys5TEQwZXpYRmJSRi9PT0J2WUUvMytGVnlSL3daZUlzalVIM2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUNmLy9aZnlnK0d3c3VjbWtJZHV2SVN1Q0hzVFdGRDNaakx2ZUkza09rTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWZ4bUNXeGdIaFNvdVhLcU4zZ0dWWG1TdFdkSGdiUHJ4cUhEdTVHTzdUND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZEMW9RTUpDSlgrYTBGdng3aWpScjJoRHlDZUFtUHkzeTcydmVCdG5IUFE0SWlXcHBBTUw3b3BOMkhzaXExK0k0TWlVeUlmcGIyeVQ5eVM0TUdZd2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTIsImFkdlNlY3JldEtleSI6InJjL0ptOWJJRHA3UG16bUtBNlg2OXcrY0RSbXhlbXIvWVc2UVE2MUhhVkU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InVYMW9TUkJ3UTl5N2VhR2c3YzRyQmciLCJwaG9uZUlkIjoiMGFlMWJiMWItZTBmZC00YzFlLTgxNDAtYjkyYjI4N2RjODE3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5qT3J3RnpZSmRsQ05aNXVjMEowdUpzTTJUOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMZlFVSGxERXkzdFArTFVkbGJzalp1RVpkU289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1ExVEw0MUIiLCJtZSI6eyJpZCI6IjIzNDgwNTYwMDM3ODA6MTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSElUTUFOIExPR1MifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00ya3Jkd0JFTmJ5NmJzR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImhNMUZYNTZOMS83NW8zdlBoNTBZeDRpdW5TTmRIRDFXNnhZWVNFaVpsMVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6InJGM20xMjZlclU3ZGN3Z3lBNklIMWp5blV0ZFgrMlcwQ2J4c1E3RVJzNjkvWTE5Z0pOeVk3d1JwTFZUSmdQaU1pSnpnOW1ycG9EbEJ5YjVvYy9EeUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxY2NRVjluZDJyWXBQdlBjU0R2T0RZZ0FFT1hWWEErN1VyajNHSDFqeE54aitkcFFpRVFyOGY3ZkxlVHM0MXNYQ2pPLzlnZjMwSHIxUzZRcm1jTmRqQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwNTYwMDM3ODA6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWVROUlYrZWpkZisrYU43ejRlZEdNZUlycDBqWFJ3OVZ1c1dHRWhJbVpkViJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNjA3OTcxNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCRG8ifQ=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "Grannyvibez",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "447716625630",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "no",               
    AUTO_REPLY : process.env.AUTO_REPLY || "no",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'non',              
    GURL: process.env.GURL  || "https://chat.whatsapp.com/BdYycYZb9WrIpc27L1QDgy",
    WEBSITE :process.env.GURL || "https://chat.whatsapp.com/BdYycYZb9WrIpc27L1QDgy",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'no',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
