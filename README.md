# Project Effective Train

### SSL Requirements
This uses an image capture library to process barcodes. Thus, it needs to access your webcam, which must be done over SSL. To get around this (we don't need a SSL cert since this server will be hosted internally), you need to start the server in a specific way.

See https://github.com/bcwik9/ScriptsNStuff/blob/master/create%20self-signed%20SSL%20cert.md

### About
This is a QR code reader that is hooked up to a parts database. Simply run the server, go to the homepage, and scan a QR code. Obviously no parts will be found until the database is loaded.
