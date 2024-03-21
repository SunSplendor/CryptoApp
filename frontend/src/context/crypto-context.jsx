import { createContext, useState, useEffect, useContext } from "react";
// import { fakeFetchCrypto, fetchAssets } from '../api';
import { fetchCryptoData } from '../api';
import { percentDifference } from '../utils'

// Creating a Context for Crypto-related data
const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

// Context provider component
export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)   // State to track data loading
    const [crypto, setCrypto] = useState([])        // State to store crypto data
    const [assets, setAssets] = useState([])        // State to store asset data

    // Function to map and enrich assets with additional data
    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find((c) => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset, // Spread the rest of asset properties
            }
        })    
    }

    {/* Retained as an example and for tracking API implementation progress */}

    // useEffect(() => {
    //     async function preload() {
    //         setLoading(true)
    //         const { result } = await fakeFetchCrypto()
    //         const assets = await fetchAssets()

    //         setAssets(mapAssets(assets, result))
    //         setCrypto(result)
    //         setLoading(false)
    //     }
    //     preload()
    // }, [])

    useEffect(() => {
        async function preload() {
            try {
                setLoading(true);
                const data = await fetchCryptoData();
                const result = data.result;
                setAssets(mapAssets(assets, result));
                setCrypto(result);
            } catch (error) {
                console.error("Error loading crypto data:", error);
            } finally {
                setLoading(false);
            }
        }
        preload();
    }, []);

    // Function to add a new asset
    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    return (
        <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
            {children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext

// Created a custom hook for easier consumption of context
export function useCrypto() {
    return useContext(CryptoContext)
}