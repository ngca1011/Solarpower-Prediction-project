const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://192.168.0.192:1883'); 

client.on('connect', () => {
    console.log('Client ist mit Broker verbunden');
    
    const request = {
      street: 'Moltkestraße 30',
      country: 'Germany',
      zipcode: '76133',
      solarPower : 10000,
    };

    //Client veröffentlicht das Topic REQUEST
    client.publish('REQUEST', JSON.stringify(request));

    //Client abonniert das Topic RESPONSE von Server
    client.subscribe('RESPONSE'); 
});
  
client.on('message', (topic, message) => {
    if (topic === 'RESPONSE') {
      const prediction = JSON.parse(message.toString());
      console.log('Vorhersage der Solarproduktion:' + '\n', prediction);
    }
});