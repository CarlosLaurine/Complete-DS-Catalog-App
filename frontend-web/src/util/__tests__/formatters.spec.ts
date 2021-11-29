import { formatPrice } from "util/formatters";


describe("formatPrice for Positive Numbers", () => {
    test('formatPrice Function should Format Number to pt-BR When 10.1 is Passed as Parameter', () => {

        //ARRANGE
        const value = 10.1;
    
        //ACT
        const result = formatPrice(value);
    
        //ASSERT
        expect(result).toEqual("10,10");
    
    })
    test('formatPrice Function should Format Number to pt-BR When 0.3 is Passed as Parameter', () => {

        //ARRANGE
        const value = 0.3;
    
        //ACT
        const result = formatPrice(value);
    
        //ASSERT
        expect(result).toEqual("0,30");
    
    })
})

describe("formatPrice for Non-Positive Numbers", () => {
    test('formatPrice Function should Format Number to pt-BR When -15.1 is Passed as Parameter', () => {

        //ARRANGE
        const value = -15.1;
    
        //ACT
        const result = formatPrice(value);
    
        //ASSERT
        expect(result).toEqual("-15,10");
    
    })
    test('formatPrice Function should Format Number to pt-BR When -0.7 is Passed as Parameter', () => {

        //ARRANGE
        const value = -0.7;
    
        //ACT
        const result = formatPrice(value);
    
        //ASSERT
        expect(result).toEqual("-0,70");
    
    })
})

