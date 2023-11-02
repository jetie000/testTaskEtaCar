import { ICoinCase } from "@/interfaces/ICoinCase";
import { variables } from "@/variables"
import axios from "axios"

axios.defaults.baseURL = variables.API_URL;

export const CoinService = {

    async getAll(page: number, limit: number) {
        let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * variables.COINS_PER_PAGE;
        return axios.get('assets?limit=' + limit + '&offset=' + offset);
    },
    async getById(id: string) {
        return axios.get('assets/' + id);
    },
    async searchAll(searchStr: string, page: number) {
        let offset = Number(page) < 1 ? 0 : (Number(page) - 1) * (variables.COINS_PER_SEARCH - 1);
        if (searchStr !== '')
            return axios.get('assets?limit=' + (offset + variables.COINS_PER_SEARCH) + '&search=' + searchStr);
    },
    async getPriceGraph(id: string, period: string) {
        let d = new Date();
        switch (period) {
            case 'month':
                return axios.get('assets/' + id + '/history?interval=h12&start=' + (Number(d) - (variables.MILL_PER_DAY * variables.DAYS_PER_WEEK * 4)) + '&end=' + Number(d));
            case 'day':
                return axios.get('assets/' + id + '/history?interval=m30&start=' + (Number(d) - variables.MILL_PER_DAY) + '&end=' + Number(d));
            case 'week': default:
                return axios.get('assets/' + id + '/history?interval=h2&start=' + (Number(d) - (variables.MILL_PER_DAY * variables.DAYS_PER_WEEK)) + '&end=' + Number(d));
        }
    },
    async getByIds(ids: string) {
        let idsTemp = ids;
        if (ids === '')
            idsTemp = '000000000000000';
        return axios.get('assets?ids=' + idsTemp);
    },
    getLocalFavs() {
        return JSON.parse(localStorage.getItem(variables.FAV_COINS)!) as string[];
    },
    setLocalFavs : async (favs: string[]) : Promise<string[]> => {
        localStorage.setItem(variables.FAV_COINS, JSON.stringify(favs));
        console.log(favs)
        return favs;
    },
    getPurchases() {
        return JSON.parse(localStorage.getItem(variables.USER_COINS)!) as ICoinCase[];
    },
    setPurchases : async (purchs: ICoinCase[]) : Promise<ICoinCase[]> => {
        localStorage.setItem(variables.USER_COINS, JSON.stringify(purchs));
        return purchs;
    },
}
