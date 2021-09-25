// import api & keys
import {myTrip, wishes,place,date,days,temp,tripImage,weather,wishPlace,}from './vars';

//Update UI
const updateUI = data => {
    wishes.classList.remove('hidden');
    myTrip.classList.remove('hidden');
    myTrip.scrollIntoView({behavior: "smooth"});
    date.innerHTML = data.date;
    days.innerHTML = data.days;
    temp.innerHTML = data.temperature + '&#8451;' + ' &nbsp;';
    if (data.placeImg !== undefined) {
        tripImage.setAttribute('src', data.placeImg);
    }
    weather.innerHTML = data.weather;
    place.innerHTML = data.place;
    wishPlace.innerHTML = data.place;
};


//export function
export {updateUI}