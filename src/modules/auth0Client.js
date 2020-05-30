// import createAuth0Client from "@auth0/auth0-spa-js";

// const userInfoInit = () => {
//     document.getElementById("login").addEventListener("click", async () => {
//         const auth0 = await createAuth0Client({
//             domain: "dev-405n1e6w.auth0.com",
//             client_id: "kaXZdymNjopdmrlQpOL5mMBQZyvrSry0",
//         });
//         console.log("FIRED")
//         await auth0.loginWithRedirect({
//             redirect_uri: "http://localhost:3000/home",
//         });
//         //logged in. you can get the user profile like this:
//         const user = await auth0.getUser();
//         console.log(user);
//         const claims = await auth0.getIdTokenClaims();
//         const token = await auth0.getTokenSilently();
//         const id_token = claims.__raw;
//         console.log({ token });
//         console.log({ id_token });
//     });
// }

// userInfoInit()
