import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MOCK_PLACES } from "../../sharedMocks";
import Itinerary from '../../../src/components/Trip/Itinerary/Itinerary.js';
import { EARTH_RADIUS_UNITS_DEFAULT } from '../../../src/utils/constants'

describe('Itinerary', () => {
    beforeEach(() => {
        render(<Itinerary places={MOCK_PLACES} placeActions={{units: EARTH_RADIUS_UNITS_DEFAULT, append: jest.fn(), selectIndex: jest.fn()}} />);
    });

    it('renders the name attribute', () => {
        screen.getByRole('cell', { name: /Place A/i })
    });

    it('toggles row dropdown when clicked', () => {
        const dropdown = screen.getByTestId('row-toggle-0');
        expect(dropdown.getAttribute('aria-expanded')).toEqual('false');

        user.click(dropdown);
        expect(dropdown.getAttribute('aria-expanded')).toEqual('true');
    });
});