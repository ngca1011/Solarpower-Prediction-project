const mqtt = require('mqtt');
const axios = require('axios');

const client = mqtt.connect('mqtt://192.168.0.192:1883'); 

client.on('connect', () => {
    console.log('Client ist mit Broker verbunden');
    
    const request = {
      straße: 'Augartenstraße 2',
      land: 'Germany',
      postleitzahl: '76137',
      solarLeistung : 10000,
    };

    //Client veröffentlicht das Topic REQUEST
    client.publish('REQUEST', JSON.stringify(request));

    //Client abonniert das Topic RESPONSE von Server
    client.subscribe('RESPONSE'); 
});
  
client.on('message', (topic, message) => {
    if (topic === 'RESPONSE') {
      const vorhersage = JSON.parse(message.toString());
      console.log('Vorhersage der Solarproduktion:' + '\n', vorhersage);
    }
});