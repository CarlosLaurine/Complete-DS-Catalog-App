import {hasAnyRoles} from '../auth'
describe("hasAnyRoles Tests", () => {
    test('hasAnyRoles Function should return TRUE When an Empty List is Passed as Parameter', () => {
        //ARRANGE && ACT
        const result = hasAnyRoles([]);

        //ASSERT
        expect(result).toEqual(true);
    })
})