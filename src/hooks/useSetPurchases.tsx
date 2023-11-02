import { useMutation, useQueryClient } from "react-query";
import { CoinService } from "@/services/coins.service"

export const useSetPurchases = () => {
    const queryClient = useQueryClient();

    return useMutation(CoinService.setPurchases, {
        onSuccess: (purchs) => {
            queryClient.setQueryData('purchases', purchs)
        }
    })
}