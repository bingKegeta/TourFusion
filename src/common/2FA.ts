import { startAuthentication, startRegistration } from "@simplewebauthn/browser";

const endpoint: string = process.env.API_URL! + '/2fa'

function makeButtonAuthenticateUser(elemBegin: HTMLElement, elemSuccess: HTMLElement) {
    // Start authentication when the user clicks a button
    elemBegin.addEventListener('click', async () => {
        elemSuccess.innerHTML = '';

        // GET authentication options from the endpoint that calls
        // @simplewebauthn/server -> generateAuthenticationOptions()
        const resp = await fetch(endpoint + '/generate-authentication-options');

        let asseResp;
        try {
            // Pass the options to the authenticator and wait for a response
            asseResp = await startAuthentication(await resp.json());
        } catch (error) {
            // Some basic error handling
            alert('An error took place. Contact the system administrator at once.');
            console.error(error);
            throw error;
        }

        // POST the response to the endpoint that calls
        // @simplewebauthn/server -> verifyAuthenticationResponse()
        const verificationResp = await fetch('/verify-authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(asseResp),
        });

        // Wait for the results of verification
        const verificationJSON = await verificationResp.json();

        // Show UI appropriate for the `verified` status
        if (verificationJSON && verificationJSON.verified) {
            elemSuccess.innerHTML = 'Success!';
        } else {
            alert('Verification failed.');
            console.error(JSON.stringify(
                verificationJSON,
            ));
        }
    });
}

function makeButtonRegisterUser(elemBegin: HTMLElement, elemSuccess: HTMLElement) {
    // Start registration when the user clicks a button
    elemBegin.addEventListener('click', async () => {
        elemSuccess.innerHTML = '';

        // GET registration options from the endpoint that calls
        // @simplewebauthn/server -> generateRegistrationOptions()
        const resp = await fetch('/generate-registration-options');

        let attResp;
        try {
            // Pass the options to the authenticator and wait for a response
            attResp = await startRegistration(await resp.json());
        } catch (error: any) {
            // Some basic error handling
            if (error.name === 'InvalidStateError') {
                alert('You are already registered. Try logging in instead.')
            } else {
                console.error(error);
            }

            throw error;
        }

        // POST the response to the endpoint that calls
        // @simplewebauthn/server -> verifyRegistrationResponse()
        const verificationResp = await fetch(endpoint + '/verify-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attResp),
        });

        // Wait for the results of verification
        const verificationJSON = await verificationResp.json();

        // Show UI appropriate for the `verified` status
        if (verificationJSON && verificationJSON.verified) {
            elemSuccess.innerHTML = 'Success!';
        } else {
            console.error(JSON.stringify(
                verificationJSON,
            ));
            alert("Something went wrong while trying to register you.");
        }
    });
}

export {
    makeButtonAuthenticateUser,
    makeButtonRegisterUser
}
