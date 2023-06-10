
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Planner from '../../../src/components/Trip/Planner';
import { beforeEach, describe, expect, it } from '@jest/globals';
import InputBar from '../../../src/components/Trip/Planner';
import { randomRequest, requestSearchResults, retrieveSearchResults, Result } from '../../../src/components/Trip/Planner';
describe('Planner', () => {
    const createSnackBar = jest.fn();
    
    beforeEach(() => {
        render(<Planner createSnackBar={createSnackBar} />);
    });
    
    it('renders a Leaflet map', async () => {
        screen.getByText('Leaflet');
    });
    
    it('renders trip table', async () => {
        screen.getByText('My Trip');
    });
    it('renders results card', async () => {
        screen.getByTestId('result-list');
    })
    
});
describe('InputBar', () => {
    const resultArray = [];
    const setResultArray = [];
    
    beforeEach(() => {
        render(<InputBar />);
    });
    
    it('renders a search bar', async () => {
        screen.getByPlaceholderText('Search location by name...');
    });
    it('renders the random button', async () => {
        screen.getByTestId('random-button');
    });
    
    it('requests random results', async () => {
        randomRequest(resultArray, setResultArray, 'http://localhost:8000');
        expect(resultArray.length).toEqual(0);
    });
    it('requests regular results with string', async () => {
        requestSearchResults('ghghj', resultArray, setResultArray, 'http://localhost:8000');
        expect(resultArray.length).toEqual(0);
    });
    it('requests regular results without string', async () => {
        requestSearchResults("", resultArray, setResultArray, 'http://localhost:8000');
        expect(resultArray.length).toEqual(0);
    });
    it('retrieves search results', async () => {
        let body = {
            "requestType": "find",
            "match": "ghghj",
            "limit": 10
        }
        retrieveSearchResults(body, resultArray, setResultArray, 'http://localhost:8000');
        let counter = resultArray.length;
        expect(counter).toEqual(0);
    });
    it('retrieves search results without input', async () => {
        let body = {
            "requestType": "find",
            "match": "",
            "limit": 10
        }
        retrieveSearchResults(body, resultArray, setResultArray, 'http://localhost:8000');
        let counter = resultArray.length;
        expect(counter).toEqual(0);
    });
});
