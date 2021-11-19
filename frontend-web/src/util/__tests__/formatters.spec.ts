import { formatPrice } from "util/formatters";

test('formatPrice Function should Format Number to pt-BR When 10.1 is Passed as Parameter', () => {

    //ARRANGE
    const value = 10.1;

    //ACT
    const result = formatPrice(value);

    //ASSERT
    expect(result).toEqual("10,10");

})