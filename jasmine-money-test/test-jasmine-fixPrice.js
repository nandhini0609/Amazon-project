import { formattingPrice } from '../../scripts/utils/fixPrice.js';

describe('test suite:Automated testing for the formatting price', () => {
    it('testing with random number', () => {
        expect(formattingPrice(2095)).toEqual('20.95');
    })

    it('testing with Zero', () => {
        expect(formattingPrice(0)).toEqual('0.00');
    })

    it('testing with negative number', () => {
        expect(formattingPrice(2000.5)).toEqual('20.01');
    })
})