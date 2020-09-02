# Vercel SQLite ip2location demo

<sup><strong>Photo by <a href="https://unsplash.com/@miracleday?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Elena Mozhvilo</a> on <a href="https://unsplash.com/s/photos/earth?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></strong></sup>

## [Live Demo](https://vercel-sqlite-demo.vercel.app/)

Wait for the `fetch('api/country')` to show where you come from.

## How to test

  * fork or clone this repository and go into its folder
  * download [IPV4 CSV](https://lite.ip2location.com/database/ip-country)
  * copy the unzipped `IP2LOCATION-LITE-DB1.CSV` file into the folder
  * create an `sqlite` directory (`mkdir -p sqlite`) and run `sqlite3 sqlite/ip2location.ipv4`
  * copy and paste [ip2location.ipv4.sql](./ip2location.ipv4.sql) content in the *SQLite* shell
  * run `npx vercel --prod` to deploy

## Please Note

While having a static, read-only, *SQLite* database on *vercel* could be handy in various situations, you cannot upload more than *100MB* as deploy/build size in there, so be aware this technique might not scale.
