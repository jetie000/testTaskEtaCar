import { useMutation, useQueryClient } from "react-query";
import { CoinService } from "@/services/coins.service"

export const useSetLocalFavs = () => {
    const queryClient = useQueryClient();

    return useMutation(CoinService.setLocalFavs, {
        onSuccess: (favs) => {
            queryClient.setQueryData('coinFavs', favs)
        }
    })
}