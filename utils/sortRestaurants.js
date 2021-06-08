import {isOpen} from './isOpen';

function getRestaurantScore(rest) {
    let result = 0;

    // If theres a comma than its less close to Edmundston
    if(rest.address.search(",") === -1) {
        result += 1;
    }

    // Favour local restaurants with all attributes
    result += rest.dineIn ? 1 : 0;
    result += rest.takeOut ? 2 : 0; 
    result += rest.delivery ? 3 : 0; // delivery is worth more than all
		result += isOpen(rest.openHours) ? 4 : 0 // Open restaurant should have high priority
    result += rest.local ? 1 : 0;

    // Favour restaurants that have both phone and online
    if(rest.orderURL !== "") {
        result += 1;
    } 
    if(rest.phoneNumber !== "") {
        result += 1;
    } 

    return result;
};

export function sortRestaurants(rests) {
    return rests.sort((a,b) => getRestaurantScore(b) - getRestaurantScore(a));
};