import options from './config';
const fs = require('fs');
const mqtt = require('mqtt');
const axios = require('axios');
const NodeGeocoder = require('node-geocoder');

const server = mqtt.connect('mqtt://192.168.0.192:1883');

const geocoder = NodeGeocoder(options);

server.on('connect', () => {
  console.log('Server ist mit Broker verbunden');

  //Server aboniert das Topic solar/request von Client
  server.subscribe('REQUEST'); 
});

server.on('message', async (topic, message) => {
  if (topic === 'REQUEST') {
    const request = JSON.parse(message.toString());
    console.log('Anfrage wird erhalten');

    requestAdresse = {address: request.street, country: request.country, zipcode: request.zipcode};

    //Konvertieren von Adresse zur Koordination
    const location = await geocoder.geocode(requestAdresse);

    //Rufen die Solarvorhersage von einer RESTful-API auf 
    try {
      const response = await axios.get(`https://api.forecast.solar/estimate/${location[0].latitude}/${location[0].longitude}/0/0/${request.solarPower}`);

      const prediction = response.data;

      //Server sendet die Vorhersage zurück an den Client
      server.publish('RESPONSE', JSON.stringify(prediction));

      //Protokollieren die Vorhersage für heute
      const today = new Date();

      fs.appendFile('log.txt', today + '\n' + JSON.stringify(prediction) + '\n', function (error) {
        if (error) throw error;
        console.log('Aktualisiert für' + today);
      });
    } catch (error) {
      console.error('Vorhersageabfrage fällt aus', error);
    }
  }
});