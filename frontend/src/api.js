{/* Replaced code previously used to simulate a fetch request */}

// import { cryptoAssets, cryptoData } from "./data";

// export function fakeFetchCrypto() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(cryptoData)
//         }, 1)
//     })
// }

// export function fetchAssets() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(cryptoAssets)
//         }, 1)
//     })
// }

const API_KEY = '43nzQHX/yx4G7g+PVqboMWdmWJSx8B4tO9od0U31xnI=';
const API_URL = 'https://openapiv1.coinstats.app/coins';

export function fetchCryptoData() {
    return fetch(API_URL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-KEY': API_KEY
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        return response.json();
    }).catch(err => {
        console.error("Error fetching crypto data:", err);
        throw err;
    });
}