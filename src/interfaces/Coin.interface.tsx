export default interface Coin {
    id: string,
    rank: number,
    symbol: string,
    name: string,
    supply: number,
    maxSupply: number | null,
    marketCapUsd: number,
    volumeUsd24Hr: number,
    priceUsd: number,
    changePercent24Hr: number,
    vwap24Hr: number
}