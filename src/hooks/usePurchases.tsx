'use client'
import { CoinService } from "@/services/coins.service"
import { useQuery } from "react-query"

export const usePurchases = () => {
    const { isLoading, data: response, isSuccess} = useQuery(
        ['purchases'],
         () => CoinService.getPurchases());
    return {isLoading, data: response, isSuccess};
}