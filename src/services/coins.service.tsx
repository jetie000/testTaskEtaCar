import { variables } from "@/variables"
import axios from "axios"

axios.defaults.baseURL = variables.API_URL;

export const CoinService = {

    async getAll(page: number) {
        let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * variables.COINS_PER_PAGE;
        return axios.get('assets?limit=' + variables.COINS_PER_PAGE + '&offset=' + offset);
    },
    async getById(id: string) {
        return axios.get('assets/'+id);
    },
    async searchAll(searchStr: string, page: number) {
        let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * (variables.COINS_PER_SEARCH - 1);
        if(searchStr !== '')
            return axios.get('assets?limit=' + (offset + variables.COINS_PER_SEARCH) + '&search=' + searchStr);
    }
}