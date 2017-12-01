# Project Effective Train

### SSL Requirements
This uses an image capture library to process barcodes. Thus, it needs to access your webcam, which must be done over SSL. To get around this (we don't need a SSL cert since this server will be hosted internally), you need to start the server in a specific way.

Instructions are at https://www.devmynd.com/blog/rails-local-development-https-using-self-signed-ssl-certificate/

- Open `config/environments/<YOUR ENVIRONMENT>`, and add `config.force_ssl = true`
- Use command `openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt` to generate a self signed SSL cert
  - Only required if you need to recreate keys, which you should absolutely do for security since this is a public repo
- To start the server, run `bundle exec rails server -b "ssl://0.0.0.0?key=localhost.key&cert=localhost.crt"`
  - the key and cert are at the base of this repo. just specify the path to them if you are in a different directory than the base

### About
This is a QR code reader that is hooked up to a parts database. Simply run the server, go to the homepage, and scan a QR code. Obviously no parts will be found until the database is loaded.