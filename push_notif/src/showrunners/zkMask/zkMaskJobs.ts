// Do Scheduling
// https://github.com/node-schedule/node-schedule
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// Execute a cron job every 5 Minutes = */5 * * * *
// Starts from seconds = * * * * * *

import logger from '../../loaders/logger';
import schedule from 'node-schedule';
import { Container } from 'typedi';

import DappHackChannel from './DappHackChannel';

export default () => {
  const startTime = new Date(new Date().setHours(0, 0, 0, 0));

  const fiveMinuteRule = new schedule.RecurrenceRule();
  fiveMinuteRule.minute = new schedule.Range(0, 59, 5);
  fiveMinuteRule.second = 0;

  const channel = Container.get(DappHackChannel);
  logger.info(`🛵 Scheduling Showrunner - Nord Channel [on 24 hours] [${new Date(Date.now())}]`);

  schedule.scheduleJob({ start: startTime, rule: fiveMinuteRule }, async function () {
    const taskName = `${channel.cSettings.name} notifyAuthRequest(false)`;
    try {
      logger.info(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      logger.error(`❌ Cron Task Failed -- ${taskName}`);
      logger.error(`Error Object: %o`, err);
    }
  });
};
