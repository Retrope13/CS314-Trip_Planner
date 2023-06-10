export async function reverseTrip(places, placeActions){
    let tmp
    var length = places.length;
    if (length <3)
        return places
    for (let first = 1, last = length - 1; first < (length / 2); first++, last--) {
        tmp = places[first];
        places[first] = places[last];
        places[last] = tmp;
    }
    //rerender places
    await placeActions.selectIndex(places.length-1);
    await placeActions.selectIndex(0);
    return places
}

export async function newStartingPlace(places, index, placeActions){
    const prev = places.slice();

    for (let i = 0; i < places.length; i++){
        places[i] = prev[(index+i)%places.length];
    }
    
    await placeActions.selectIndex(places.length-1);
    await placeActions.selectIndex(0);
    return places;
}

export function changePlacesIndex(places, placeActions, indices){
    let oldI = indices.oldIndex;
    let newI = indices.newIndex;
    let i = oldI;
    while (i != newI){
        let j = (oldI < newI) ? i+1: i-1;
        [places[i], places[j]] = [places[j], places[i]];
        i = (oldI < newI) ? i+1: i-1;
    }
    placeActions.selectIndex(places.length-1);
    placeActions.selectIndex(0);
    return places;
}