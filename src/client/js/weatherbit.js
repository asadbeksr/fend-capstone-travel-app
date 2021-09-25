// weatherbit url & key
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherbitKEY = 'a0b6e906ce164165b3dffd63e9425495';

//Function to get weather data
const weatherbit = async (lat, lon,) => {
    let res;
    res = await fetch(weatherbitURL + lat + '&lon=' + lon + '&key=' + weatherbitKEY);
    try {
        return await res.json();
    } catch (err) {
        console.log('error', err)
    }
};

//export function
export {
    weatherbit
}