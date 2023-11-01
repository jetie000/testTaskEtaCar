export default interface ICoin {
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