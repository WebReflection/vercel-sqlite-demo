const {join} = require('path');
const {now} = require('perf_hooks').performance;

const {Database} = require('sqlite3');
const SQLiteTag = require('sqlite-tag');

const ip2location = join(__dirname, '..', 'sqlite', 'ip2location.ipv4');

const ipv4 = {
  _: [16777216, 65536, 256, 1],
  $: (whole, current, i) => (whole + current * ipv4._[i]),
  asInt: ip => ip.split('.').reduce(ipv4.$, 0),
  asRegExp: /^(?:\d+\.){3}\d+$/
};

module.exports = async (req, res) => {
  const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ipv4.asRegExp.test(address)) {
    const time = now();
    const db = new Database(ip2location);
    const {get} = SQLiteTag(db);
    const location = await get`
      SELECT
        country_code AS code,
        country_name AS name
      FROM
        ip2location
      WHERE
        ${ipv4.asInt(address)}
      BETWEEN ip_from AND ip_to
    `;
    db.close();
    res.setHeader('x-served-in', `${(now() - time).toFixed(2)}ms`);
    res.json(location || {code: '❔', name: 'Unknown'});
  }
  else
    res.json({code: '⚠', name: 'Invalid IP'});
};
