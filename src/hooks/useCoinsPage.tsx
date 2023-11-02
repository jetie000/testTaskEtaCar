'use client'
import { CoinService } from "@/services/coins.service"
import { variables } from "@/variables";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query"

export const useCoinsPage = () => {
    const searchParams = useSearchParams();
    let pageParam = searchParams.get('page');
    let page = Number(pageParam) || 1;
    const { isLoading, data: response, error, isSuccess } = useQuery(
        ['coins list', page],
         () => CoinService.getAll(page, variables.COINS_PER_PAGE),
         {
            onError: (error: Error) => alert(error.message)
         });
    return {isLoading, data: response, error, isSuccess, page};
}