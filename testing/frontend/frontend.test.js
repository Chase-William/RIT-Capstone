import {render, fireEvent, cleanup} from '@testing-libary/react';
import { afterEach } from 'node:test';
import Login from "../../components/auth/login";
import Home from "../index.ts";

/** Current test cases:
 * Login Rendering
 * Student Help Rendering
 * Dashboard Rendering
 */

//Unmount and cleanup the DOM once a test is finished
afterEach(cleanup);


//Login Render Test
it("login render", ()=>{
    const {queryByInput} = render(Login)
});

// Student Help Render Test

//Dashboard Render Test