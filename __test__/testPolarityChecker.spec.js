import "babel-polyfill";
import { checkPopularity } from "../src/client/js/formHandler"

describe('Testing polarity translation functionality', () => {
    test('Testing the polarityChecker() function', () => {
       expect(checkPopularity('P+')).toBe('STRONG POSITIVE')
    })
    test('Testing the polarityChecker() function', () => {
        expect(checkPopularity('P')).toBe('POSITIVE')
    })
    test('Testing the polarityChecker() function', () => {
        expect(checkPopularity('NEW')).toBe('NEUTRAL')
    })
    test('Testing the polarityChecker() function', () => {
        expect(checkPopularity('N')).toBe('NEGATIVE')
    })
    test('Testing the polarityChecker() function', () => {
        expect(checkPopularity('N+')).toBe('STRONG NEGATIVE')
    })
    test('Testing the polarityChecker() function', () => {
        expect(checkPopularity('NONE')).toBe('NO SENTIMENT')
    })
    test('Testing the polarityChecker() function', () => {
        expect(checkPopularity).toBeDefined();
    })
});