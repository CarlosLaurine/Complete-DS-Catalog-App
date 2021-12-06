import {hasAnyRoles} from '../auth'
import * as TokenModule from '../token'
describe("hasAnyRoles Tests", () => {
    test('hasAnyRoles Function should return TRUE When an Empty List is Passed as Parameter', () => {
        //ARRANGE && ACT
        const result = hasAnyRoles([]);

        //ASSERT
        expect(result).toEqual(true);
    })

    test('hasAnyRoles Function should return TRUE When User has given Role', () => {
        //MOCK getTokenData BEHAVIOUR
        jest.spyOn(TokenModule,"getTokenData").mockReturnValue({
            exp:0,
            user_name:"",
            authorities: ['ROLE_OPERATOR', 'ROLE_ADMIN']
        })
        
        //ARRANGE && ACT
        const result = hasAnyRoles(["ROLE_ADMIN"]);

        //ASSERT
        expect(result).toEqual(true);
    })

    test('hasAnyRoles Function should return FALSE When User DOES NOT have given Role', () => {
        //MOCK getTokenData BEHAVIOUR
        jest.spyOn(TokenModule,"getTokenData").mockReturnValue({
            exp:0,
            user_name:"",
            authorities: ['ROLE_OPERATOR']
        })
        
        //ARRANGE && ACT
        const result = hasAnyRoles(["ROLE_ADMIN"]);

        //ASSERT
        expect(result).toEqual(false);
    })
})