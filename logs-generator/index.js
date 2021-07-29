const { v4: uuid } = require('uuid');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  defaultMeta: { service: 'log-generator' },
  transports: [
    new winston.transports.Console(),
  ],
});

const AVAILABLE_STATUS_CODES = [200, 201, 204, 400, 401, 403, 500];
const AVAILABLE_METHODS = ['GET', 'POST', 'DELETE']
const AVAILABLE_ROUTES = ['/profile', '/auth', '/posts', '/comments']
const randomDuration = () => { return Math.floor(Math.random() * 5000) }
Array.prototype.random = function() { return this[Math.floor((Math.random() * this.length))] }

setInterval(() => {
    for(let i = 0; i <= 10; i++) {
        const statusCode = AVAILABLE_STATUS_CODES.random();
        
        logger.log({ 
            level: statusCode >= 400 ? 'error' : 'info', 
            requestId: uuid(),
            method: AVAILABLE_METHODS.random(),
            duration: randomDuration(),
            route: AVAILABLE_ROUTES.random(),
            statusCode,
        });
    }    
}, 500);