'use client'
import { CoinService } from "@/services/coins.service"
import { useQuery } from "react-query"

export const useCoinsSearch = (searchStr: string, page: number) => {
    
    const { isLoading, data: response, error, isSuccess } = useQuery(
        ['coins list search', searchStr, page],
         () => CoinService.searchAll(searchStr, page),
         {
            onError: (error: Error) => alert(error.message)
         });
    return {isLoading, data: response, error, isSuccess};
}