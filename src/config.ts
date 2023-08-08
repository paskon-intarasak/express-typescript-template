import * as path from 'path';
import * as process from 'process';

// =======================================

/**
 * APP Main Configuration
 */
export class Configuration {
  static title: string;
  static port: number;
  static env: string;
  static timezone: string;
  static getSMCUrl: string;
  static createReversibleUrl: string;
  static jwtSecret: string;
  static bcrypTier: number;

  static init() {
    // +++++++++++++++++++++++++[DONT CHANGE]+++++++++++++++++++++++++
    if (!process.env.APP_PORT) {
      require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
    }

    console.log(`Environment: ${process.env.APP_ENV}`);
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // ====== SET Config HERE ======
    // #### MAPPING configuration from jsonfile to strongly-typed model
    Configuration.title = process.env.APP_NAME;
    Configuration.env = process.env.APP_ENV;
    Configuration.timezone = process.env.APP_TIMEZONE;
    Configuration.jwtSecret = process.env.APP_JWTSEC;
    Configuration.bcrypTier = parseInt(process.env.APP_BCRYPT_TIER);
  }
}