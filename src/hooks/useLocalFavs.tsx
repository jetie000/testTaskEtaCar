'use client'
import { CoinService } from "@/services/coins.service"
import { useQuery } from "react-query"

export const useLocalFavs = () => {
    const { isLoading, data: response, isSuccess} = useQuery(
        ['coinFavs'],
         () => CoinService.getLocalFavs());
    return {isLoading, data: response, isSuccess};
}