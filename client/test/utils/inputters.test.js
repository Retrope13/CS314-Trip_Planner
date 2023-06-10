import { describe, expect, it } from "@jest/globals";
import * as input from '../../src/utils/inputters';
import { checkPropTypes } from "prop-types";

describe('inputters w/ input', () => {
    window.prompt = jest.fn();
    it('inputcoordinates gives correct response', () => {
        jest.spyOn(window, "prompt").mockImplementation(() => "40.0");
        let result = input.inputCoordinates();
        expect(result).toEqual({latitude: "40", longitude: "40"});
    });
    it('input new unit value', () => {
        jest.spyOn(window, "prompt").mockImplementation(() => "40.0");
        let result = input.inputNewUnitValue(test);
        expect(result).toEqual("40.0");
    });
    it('build new unit', () => {
        jest.spyOn(window, "prompt").mockImplementation(() => "40.0");
        let result = input.buildNewUnit();
        expect(result).toEqual( {"unit": "40.0", "value": "40.0"});
    });
    it('set new unit', () => {
        let units = [{"unit": "one", "value": 100}, {"unit": "two", "value": 200}]
        let props = { "deleted": [false], "placeActions": {"units": units}};
        let newUnit = {"unit": "new", "value": 1234};
        jest.spyOn(window, "prompt").mockImplementation(() => "40.0");
        expect(input.setNewUnit(props, newUnit)).resolves.not.toThrow();
    });
    it('Set new Trip name', () => {
        jest.spyOn(window, "prompt").mockImplementation(() => "40.0");
        expect(input.inputNewTripName()).toEqual("40.0");
    });
});

describe('inputters w/ null', () => {
    window.prompt = jest.fn();
    it('inputcoordinates gives correct response', () => {
        jest.spyOn(window, "prompt").mockImplementationOnce(() => "bad");
        jest.spyOn(window, "prompt").mockImplementationOnce(() => "40.0");
        jest.spyOn(window, "prompt").mockImplementationOnce(() => "bad");
        jest.spyOn(window, "prompt").mockImplementationOnce(() => "40.0");
        let result = input.inputCoordinates();
        expect(result).toEqual({latitude: "40", longitude: "40"});
    });
    it('input new unit value', () => {
        jest.spyOn(window, "prompt").mockImplementationOnce(() => "");
        jest.spyOn(window, "prompt").mockImplementation(() => "40.0");
        let result = input.inputNewUnitValue(test);
        expect(result).toEqual("40.0");
    });

    it('build new unit', () => {
        jest.spyOn(window, "prompt").mockImplementationOnce(() => "");
        jest.spyOn(window, "prompt").mockImplementation(() => "40.0");
        let result = input.buildNewUnit();
        expect(result).toEqual( {"unit": "40.0", "value": "40.0"});
    });
});

describe('Delete unit Working', () => {
    it('props.deleted changed', () => {
        let props = { "deleted": [true]};
        input.updateUnits(props, {"doesnt": "matter"});
        expect(props.deleted[0]).toEqual(false);
    });

    it('Delete Unit from list', () => {
        let units = [{"unit": "one", "value": 100}, {"unit": "two", "value": 200}]
        let props = { "deleted": [false], "placeActions": {"units": units}};
        input.deleteUnit(props, units[0]);
        expect(props.placeActions.units.length).toEqual(1);
    });
});