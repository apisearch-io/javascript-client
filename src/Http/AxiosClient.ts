import Axios from "axios";
import {KeyValueCache} from "../Cache/KeyValueCache";
import Client from "./Client";
import HttpClient from "./HttpClient";
import Response from "./Response";
import RetryMap from "./RetryMap";

/**
 * AxiosClient
 */
export default class AxiosClient extends Client implements HttpClient {

    private host: string;
    private cache: KeyValueCache;
    private timeout: number;
    private overrideQueries: boolean;
    private cancelToken;

    /**
     * Constructor
     *
     * @param host
     * @param version
     * @param timeout
     * @param retryMap
     * @param overrideQueries
     * @param cache
     */
    constructor(
        host: string,
        version: string,
        timeout: number,
        retryMap: RetryMap,
        overrideQueries: boolean,
        cache: KeyValueCache,
    ) {
        super(version, retryMap);

        this.host = host;
        this.timeout = timeout;
        this.cache = cache;
        this.overrideQueries = overrideQueries;
        this.cancelToken = Axios.CancelToken.source();
    }

    /**
     * Get
     *
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     *
     * @return {Promise<Response>}
     */
    public async get(
        url: string,
        method: string,
        credentials: any,
        parameters: any = {},
        data: any = {},
    ): Promise<Response> {
        const that = this;
        url = url.replace(/^\/*|\/*$/g, "");
        url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
        method = method.toLowerCase();

        if (
            "get" === method &&
            this.overrideQueries
        ) {
            this.abort();
        }

        return new Promise<Response> ((resolve, reject) => {

            const headers = "get" == method
                ? {}
                : {
                    "Content-Encoding": "gzip",
                    "Content-Type": "application/json",
                };

            //noinspection TypeScriptValidateTypes
            Axios
                .request({
                    url: url + "?" + Client.objectToUrlParameters({
                        ...credentials,
                        ...parameters,
                    }),
                    data,
                    headers,
                    method,
                    baseURL: that.host.replace(/\/*$/g, ""),
                    timeout: that.timeout,
                    cancelToken: this.cancelToken.token,
                    transformRequest: [(data) => JSON.stringify(data)],
                })
                .then((axiosResponse) => {

                    const response = new Response(
                        axiosResponse.status,
                        axiosResponse.data,
                    );

                    return resolve(response);
                })
                .catch(
                    (thrown) => reject(thrown),
                );
        });
    }

    /**
     * Abort current request
     * And regenerate the cancellation token
     */
    public abort() {
        this.cancelToken.cancel();
        this.cancelToken = Axios.CancelToken.source();
    }
}
