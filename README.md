# Project Effective Train

### SSL Requirements
This uses an image capture library to process barcodes. Thus, it needs to access your webcam, which must be done over SSL. To get around this (we don't need a SSL cert since this server will be hosted internally), you need to start the server in a specific way.

Instructions are at https://www.devmynd.com/blog/rails-local-development-https-using-self-signed-ssl-certificate/

- Open `config/environments/<YOUR ENVIRONMENT>`, and add `config.force_ssl = true`
- to start the server, run `bundle exec rails server -b "ssl://0.0.0.0?key=localhost.key&cert=localhost.crt"`
  - the key and cert are at the base of this repo. just specify the path to them if you are in a different directory than the base