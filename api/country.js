const {join} = require('path');
const {now} = require('perf_hooks').performance;

const sqlite3 = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const ipv4 = {
  _: [16777216, 65536, 256, 1],
  asInt: ip => ip.split('.').reduce(
    (whole, current, i) => (whole + current * ipv4._[i]),
    0
  )
};

module.exports = async (req, res) => {
  const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (/^(?:\d+\.){3}\d+$/.test(address)) {
    const time = now();
    const ip = ipv4.asInt(address);
    const path = join(__dirname, '..', 'sqlite', `ip2location.ipv4`);
    const db = new sqlite3.Database(path);
    const {get} = SQLiteTag(db);
    const location = await get`
      SELECT
        country_code AS code,
        country_name AS name
      FROM
        ip2location
      WHERE
        ${ip}
      BETWEEN ip_from AND ip_to
    `;
    res.setHeader('X-Queried-In', `${(now() - time).toFixed(2)}ms`);
    res.json(location || {code: '❔', name: 'Unknown'});
    db.close();
  }
  else
    res.json({code: '⚠', name: 'Invalid IP'});
};
