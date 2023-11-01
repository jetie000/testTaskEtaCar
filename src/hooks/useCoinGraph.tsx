'use client'
import { CoinService } from "@/services/coins.service"
import { useQuery } from "react-query"

export const useCoinGraph = (id: string, period: string) => {
    const { isLoading, data: response, error, isSuccess, isError } = useQuery(
        ['coin', id, period],
         () => CoinService.getPriceGraph(id, period));
    return {isLoading, data: response, error, isSuccess, isError};
}