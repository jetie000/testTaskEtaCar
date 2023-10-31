'use client'
import { CoinService } from "@/services/coins.service"
import { useQuery } from "react-query"

export const useCoin = (id: string) => {
    const { isLoading, data: response, error, isSuccess, isError } = useQuery(
        ['coin', id],
         () => CoinService.getById(id));
    return {isLoading, data: response, error, isSuccess, isError};
}