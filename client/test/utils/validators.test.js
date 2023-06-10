import { describe, expect, it } from "@jest/globals";
import { validateLatitude, validateLongitude } from '../../src/utils/validators';

describe('validators', () => {
    it('validateLatitude evaluates valid input correctly', () => {
        let trueCases = ["90.000", "-90.000", "0.000", "44.3453", "-23.532"];
        let expectedResponse = true;
        for(let trueCase of trueCases){
            let response = validateLatitude(trueCase);
            expect(response).toEqual(expectedResponse);
        }
    });

    it('validateLatitude evaluates invalid input correctly', () => {
        let falseCases = ["90.0001", "-91.321", "fail"];
        let expectedResponse = false;
        expect(validateLatitude("90.0001")).toEqual(false);
        for(let falseCase of falseCases){
            let response = validateLatitude(falseCase);
            expect(response).toEqual(expectedResponse);
        }
    });


    it('validateLongitude evaluates valid input correctly', () => {
        let trueCases = ["180.000", "-180.000", "0.000", "44.3453", "-23.532"];
        let expectedResponse = true;
        for(let trueCase of trueCases){
            let response = validateLongitude(trueCase);
            expect(response).toEqual(expectedResponse);
        }
    });

    it('validateLongitude evaluates invalid input correctly', () => {
        let falseCases = ["180.0001", "-180.321", "fail"];
        let expectedResponse = false;
        for(let falseCase of falseCases){
            let response = validateLongitude(falseCase);
            expect(response).toEqual(expectedResponse);
        }
    });
});