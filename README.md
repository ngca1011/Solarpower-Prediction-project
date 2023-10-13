# Solarpower Prediction Project

## Introduction

This project uses JavaScript as the programming language to establish integrations between the client, server, a message broker, and the Forecast.Solar API. The API is a RESTful service used to estimate solar power in watts based on the location's longitude, latitude, and installed module power.

## Technologies

In this project, we have chosen Mosquitto MQTT as our message broker due to its lightweight nature and suitability for our Node.js runtime environment. Additionally, we utilize the open-source MQTT.js library from GitHub to efficiently implement the project. The following technologies are used:

- Node.js v20.7.0
- Mosquitto v2.0.18
- axios v1.5.1
- Node.js Client for Google Maps Services v3.3.41
- MQTT.js v5.1.2
- node-geocoder v4.2.0

## Launch

To launch this project, follow these steps:

1. Install the necessary modules mentioned above using npm.

2. Before starting the broker, edit the configuration file `mosquitto.conf` in the folder where you installed Mosquitto. Add the following lines on line 13 (under General Configuration) to allow communication with the broker on port 1883:

```
   listener 1883
   allow_anonymous true
```
3. After changing the configuration, now we can start the broker mosquitto locally in Terminal (make sure to run it as Administrator) with : net start mosquitto. Check the ip address with ipconfig right after then we take our ip address and edit/change the url we want our client and server to connect to in our client.js and server.js file.

4. Now you can start to make a request for the solar production estimate for a specific location for an installed module power by starting the server side with **node server.js** and then the client side with **node client.js** commands in your Terminal. The forecast detail for the day will be saved in "protokollierung.txt".
