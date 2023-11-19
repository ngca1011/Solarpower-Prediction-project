require('dotenv').config();

export const option = {
    provider: 'google',
    apiKey: process.env.GEOCODER_API_KEY,
};

