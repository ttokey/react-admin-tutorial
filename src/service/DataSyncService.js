import axios from "axios";

const DIFF_STATUS_API_BASE_URL = "http://localhost:1234/transfer/diffStatus/nlu?source=local&target=local2";
const ENV_INFO_API_BASE_URL = "http://localhost:1234/envInfo"
const API_INFO_API_BASE_URL = "http://localhost:1234/apiInfo"


class DataSyncService {
    getEnvInfos() {
        return axios.get(ENV_INFO_API_BASE_URL);
    }

    getDiffStatus() {
        return axios.get(DIFF_STATUS_API_BASE_URL);
    }

    getApiInfos() {
        return axios.get(API_INFO_API_BASE_URL);
    }
}

export default DataSyncService;