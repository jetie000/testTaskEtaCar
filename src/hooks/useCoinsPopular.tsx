'use client'
import { CoinService } from "@/services/coins.service"
import { variables } from "@/variables";
import { useQuery } from "react-query"

export const useCoinsPopular = () => {
    const { isLoading, data: response, error, isSuccess } = useQuery(
        ['coins popular'],
         () => CoinService.getAll(1, variables.POPULAR_COIN_NUM),
         {
            onError: (error: Error) => alert(error.message)
         });
    return {isLoading, data: response, error, isSuccess};
}