import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';

// =======================================

export class SupabaseConfig {
  supabaseUrl: string;
  supabaseJwt: string;
}

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
    let envFileName = '';

    if (process.env.NODE_ENV === 'production') {
      envFileName = path.join(__dirname, '../.env.production');
    }
    if (process.env.NODE_ENV === 'development') {
      envFileName = path.join(__dirname, '../.env.develop');
    }

    console.log(envFileName);

    if (envFileName) {
      if (fs.existsSync(envFileName)) {
        require('dotenv').config({ path: envFileName });
      } else {
        console.error(
          `Error: '${envFileName}' file not found. Please create one.`,
        );
        process.exit(1);
      }
    } else {
      console.error(
        "Error: Environment not set correctly. Please specify NODE_ENV as 'production' or 'development'.",
      );
      process.exit(1);
    }

    console.log(`Environment: ${process.env.NODE_ENV}`);
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // ====== SET Config HERE ======
    // #### MAPPING configuration from jsonfile to strongly-typed model
    Configuration.title = process.env.APP_NAME;
    Configuration.port = parseInt(process.env.APP_PORT);
    Configuration.env = process.env.APP_ENV;
    Configuration.timezone = process.env.APP_TIMEZONE;
    Configuration.jwtSecret = process.env.APP_JWTSEC;
    Configuration.bcrypTier = parseInt(process.env.APP_BCRYPT_TIER);
  }
}
