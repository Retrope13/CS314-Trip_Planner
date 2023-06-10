import '@testing-library/jest-dom';
import {describe, expect, it} from '@jest/globals';
import * as tourRequest from '../../../src/utils/requests/tourRequest';

describe('Tour Request', () => {
    it('requestTourResults', async () => {
        let tour;
        try{
            tour = await tourRequest.requestTourResults([], 3000, 2);
        }catch(e){}
        expect(tour).toEqual(undefined);
    });
});