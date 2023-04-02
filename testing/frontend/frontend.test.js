import {render, screen, cleanup} from '@testing-library/react';
import Login from "../../components/auth/login";
import Home from "../index.ts";

/** Current test cases:
 * Login Rendering
 * Student Help Rendering
 * Dashboard Rendering
 */

//Unmount and cleanup the DOM once a test is finished
// afterEach(cleanup);


//Login Render Test
test('login render', () =>{
    render(<Login/>)
    const loginElement = screen.getByTestClass(utilStyles.vertical);
    expect(loginElement).toBeInTheDocument();
    expect(loginElement).toHaveTextContent();
})
// Student Help Render Test

//Dashboard Render Test