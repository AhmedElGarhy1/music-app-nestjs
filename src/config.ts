// const ormconfig = require('../ormconfig');

// console.log(process.env.ACCESS_KEY_ID);

// const aws = {
//   AWS_S3_BUCKET_NAME: 'music-land-nest',
//   ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
//   SECRET_ACCESS_KEY_ID: process.env.SECRET_ACCESS_KEY_ID,
//   CDN_URL: 'https://music-land-nest.s3.us-east-1.amazonaws.com',
//   REGION: 'us-east-1',
// };

// const config = {
//   database: ormconfig,
//   aws,
// };

// export default config;
import {
  NodemailerOptions,
  NodemailerDrivers,
} from '@crowdlinker/nestjs-mailer';
const ormconfig = require('../ormconfig');

const aws = {
  AWS_S3_BUCKET_NAME: 'music-land-nest',
  ACCESS_KEY_ID: '--------------------',
  SECRET_ACCESS_KEY_ID: '----------------------',
  CDN_URL: 'https://music-land-nest.s3.us-east-1.amazonaws.com',
  REGION: 'us-east-1',
};

const nodemailer: NodemailerOptions<NodemailerDrivers.SMTP> = {
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      username: '----------@gmail.com',
      pass: '-----',
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  defaults: {},
};

const config = {
  database: ormconfig,
  aws,
  nodemailer,
};

export default config;
