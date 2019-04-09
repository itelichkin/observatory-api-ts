import * as winston from 'winston';

const ENV = process.env.NODE_ENV;

export function getLogger(module) {

    const path = module.filename.split('/').slice(-2).join('/');

    return winston.createLogger({
        level: (ENV === 'development') ? 'debug' : 'error',
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.label(path),
                    winston.format.colorize({message: true}),
                    winston.format.simple()
                )
            }),
        ]
    });
}
