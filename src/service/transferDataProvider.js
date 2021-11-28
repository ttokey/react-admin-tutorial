import axios from "axios";

const apiUrl = 'http://localhost:1234';


export const getAllList = async (env) => {
    const response = await axios.get(
        `${apiUrl}/${env}`
    );
    return response.data;
};

export const getDiffStatusList = async (collection, sourceEnv, targetEnv) => {
    const response = await axios.get(
        `${apiUrl}/transfer/diffStatus/${collection}?source=${sourceEnv}&target=${targetEnv}`
    );
    return response.data;
};

export const getDiff = async (collection, id, sourceEnv, targetEnv) => {
    const response = await axios.get(
        `${apiUrl}/transfer/diff/${collection}/${id}?source=${sourceEnv}&target=${targetEnv}`
    );
    return response.data;
};

export const getDiff2 = (collection, id, sourceEnv, targetEnv) => {
    return axios.get(`${apiUrl}/transfer/diff/${collection}/${id}?source=${sourceEnv}&target=${targetEnv}`)
        .then((json) => (
            json
        ));
};

export const postTransfer = async (collection, sourceEnv, targetEnv, ids) => {
    const response = await axios.post(
        `${apiUrl}/transfer/${collection}?source=${sourceEnv}&target=${targetEnv}`,
        ids
    );
    return response.data;
};

export const putData = async (env, id, data) => {
    const response = await axios.put(
        `${apiUrl}/${env}/${id}`,
        data,
    )
    return response.data;
}

export const postData = async (env, data) => {
    const response = await axios.post(
        `${apiUrl}/${env}`,
        data,
    )
    return response.data;
}

export const getApiCollection = async () => {
    const response = await axios.get(
        `${apiUrl}/apiInfo/collections`
    )
    return response.data;
}

export const getEnvs = async () => {
    const response = await axios.get(
        `${apiUrl}/envInfo/envs`
    )
    return response.data;
}