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
const ormconfig = require('../ormconfig');

console.log(process.env.ACCESS_KEY_ID);

const aws = {
  AWS_S3_BUCKET_NAME: 'music-land-nest',
  ACCESS_KEY_ID: 'AKIA2GWNOXBPWJNEHKNM',
  SECRET_ACCESS_KEY_ID: 'V7rv4LXM01JgLz6NtXVMu9epZZZ+1pvn2jsunA88',
  CDN_URL: 'https://music-land-nest.s3.us-east-1.amazonaws.com',
  REGION: 'us-east-1',
};

const config = {
  database: ormconfig,
  aws,
};

export default config;
