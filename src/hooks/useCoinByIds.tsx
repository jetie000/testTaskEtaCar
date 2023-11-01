'use client'
import { CoinService } from "@/services/coins.service"
import { useQuery } from "react-query"

export const useCoinByIds = (ids: string) => {
    const { isLoading, data: response, error, isSuccess, isError } = useQuery(
        ['coins', ids],
         () => CoinService.getByIds(ids));
    return {isLoading, data: response, error, isSuccess, isError};
}