-- mkdir -p sqlite
-- sqlite3 sqlite/ip2location.ipv4

CREATE TABLE ip2location (
  ip_from INT(10),
  ip_to INT(10),
  country_code CHAR(2),
  country_name VARCHAR(64),
  PRIMARY KEY(ip_from, ip_to)
);

-- https://lite.ip2location.com/database/ip-country
.mode csv
.import IP2LOCATION-LITE-DB1.CSV ip2location

DELETE FROM ip2location WHERE country_code = "-";

-- SELECT country_code AS code, country_name AS name FROM ip2location WHERE 35977539 BETWEEN ip_from AND ip_to;

.exit
