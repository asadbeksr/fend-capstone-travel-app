// import vars
import {iPlace,iDate,submitBtn,wishes,iForm,removeTrip,myTrip,} from './vars';
import {geonames} from './geonames'
import {weatherbit} from './weatherbit'
import {pixibay} from './pixabay'
import {updateUI} from './updateUI'

//custom cursor https://codepen.io/ntenebruso/pen/QWLzVjY
let cursor = document.querySelector('.cursor');
let cursorinner = document.querySelector('.cursor2');
let a = document.querySelectorAll('a');

document.addEventListener('mousemove', function (event) {
    let x = event.clientX;
    let y = event.clientY;
    cursor.style.transform = `translate3d(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function (event) {
    let x = event.clientX;
    let y = event.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function () {
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function () {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
})





//Main function
const info = {};

const handleSubmit = event => {
    event.preventDefault();
    //Check for user input

    if (iPlace.value == false) {
        alert('Please fill destination form')
        return false;
    }
    else if(iDate.value == false){
        alert('Please choose trip date')
        return false;
    }
     else {
        console.log('Inputs are filled')
    }
    // Inputs value
    info['place'] = iPlace.value;
    info['date'] = iDate.value;
    info['days'] = getDate(info['date']);

    try {
        // Geonmaes
        geonames(info['place'])
            .then((toInfo) => {
                //assigning values
                const lat = toInfo.geonames[0].lat;
                const lon = toInfo.geonames[0].lng;
                //Getting weather
                return weatherbit(lat, lon, info['date']);
            })
            .then((weatherData) => {
                info['temperature'] = weatherData['data'][0]['temp'];
                info['weather'] = weatherData['data']['0']['weather']['description'];
                return pixibay(info['place']);
            })
            .then((imageInfo) => {
                if (imageInfo['hits'].length > 0) {
                    info['placeImg'] = imageInfo['hits'][0]['webformatURL'];
                }
                return postData(info);
            })
            .then((data) => {
                // Update UI
                updateUI(data);
            })
    } catch (err) {
        console.log('error', err);
    }
};


// Post Data
const postData = async info => {
    const response = await fetch('http://localhost:8081/postData', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    });

    try {
        return await response.json();
    } catch (err) {
        console.log('error', err);
    }
};

let getDate = date1 => {
    let first = new Date(date1);
    let second = new Date();
    return Math.round((Date.UTC(first.getFullYear(), first.getMonth(), first.getDate()) - Date.UTC(second.getFullYear(), second.getMonth(), second.getDate())) / (1000 * 60 * 60 * 24));
};


// Remove trip button
removeTrip.addEventListener('click', function () {
    iForm.reset();
    wishes.classList.add('hidden')
    myTrip.classList.add('hidden');
    location.reload();

});



submitBtn.addEventListener("click", handleSubmit);




export {
    handleSubmit,
    removeTrip,
}