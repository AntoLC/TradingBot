import app from '@server';
import {SocketInit} from './Socket';
import { logger } from '@shared';

// Start the server
const port = Number(process.env.PORT || 3000);
/*app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});*/ 

SocketInit();
