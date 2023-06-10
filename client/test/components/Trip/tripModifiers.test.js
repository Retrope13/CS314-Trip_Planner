import { describe, expect, it, jest} from "@jest/globals";
import * as mod from '../../../src/components/Trip/Itinerary/tripModifiers';

describe('trip modifiers', () => {
    const a = {lat:40.0,lng:40.0, name:'1'}
    const b = {lat:41.0,lng:41.0, name:'2'}
    const c = {lat:42.0,lng:42.0, name: '3'}
    let places = [a,b];
    let places2 = [a,b,c];
    
    const placeActions={selectIndex : jest.fn()}
    it('reverseTrip works correctly', () => {
        let result = mod.reverseTrip(places2, placeActions);
        expect(result).resolves.toEqual([{name:"1",lat:40.0,lng:40.0},{lat:42.0,lng:42.0, name: '3'}, {name:"2",lat:41.0,lng:41.0}]);
        
    });
    it('newStartingPlace works correctly', () => {
        let result = mod.newStartingPlace(places, 1, placeActions);
        expect(result).resolves.toEqual([{name:"2",lat:41.0,lng:41.0}, {name:"1",lat:40.0,lng:40.0}]);
    });
    it('changePlacesIndex works correctly', () => {
        let indices= {oldIndex:0, newIndex:1}
        let indices2 = {oldIndex:1, newIndex:0}
        let result = mod.changePlacesIndex(places, placeActions, indices);
        expect(result).toEqual([{name:"1",lat:40,lng:40}, {name:"2",lat:41,lng:41}]);
        let result2 = mod.changePlacesIndex(result, placeActions, indices2);
        expect(result2).toEqual(places);
    });
});
