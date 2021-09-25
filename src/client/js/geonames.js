// geonames url & username
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = 'bekdev';
// Geonames function 
const geonames = async to => {
    const response = await fetch(geonamesURL + to + '&maxRows=10&username=' + username);
    try {
        return await response.json();
    } catch (err) {
        console.log('error', err);
    }
};
//export function
export {
    geonames
}