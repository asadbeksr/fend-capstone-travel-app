// pixibay url & key
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayAPI = '20912397-554a64a1276892fd92382c0d8';
const pixibay = async toCity => {
    const response = await fetch(pixabayURL + pixabayAPI + '&q=' + toCity + ' city&image_type=photo');
    try {
        return await response.json();
    } catch (err) {
        console.log('error', err);
    }
};

//export function
export {pixibay}