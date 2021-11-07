import Axios from "axios";
import axiosRetry from "axios-retry";
import {ConnectionError} from "..";
import {Client} from "./Client";
import {HttpClient} from "./HttpClient";
import {Response} from "./Response";

/**
 * AxiosClient
 */
export class AxiosClient extends Client implements HttpClient {

    private host: string;
    private timeout: number;
    private overrideQueries: boolean;
    private cancelToken: any;

    /**
     * Constructor
     *
     * @param host
     * @param version
     * @param timeout
     * @param overrideQueries
     */
    constructor(
        host: string,
        version: string,
        timeout: number,
        overrideQueries: boolean,
    ) {
        super(version);

        this.host = host;
        this.timeout = timeout;
        this.overrideQueries = overrideQueries;
        this.cancelToken = {};
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
        url = url.replace(/^\/*|\/*$/g, "");
        url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
        method = method.toLowerCase();

        if (
            "get" === method &&
            this.overrideQueries
        ) {
            this.abort(url);
        }

        const headers = "get" === method
            ? {}
            : {
                "Content-Encoding": "gzip",
                "Content-Type": "application/json",
            };

        const axiosRequestConfig: any = {
            baseURL: this.host.replace(/\/*$/g, ""),
            data,
            headers,
            method,
            timeout: this.timeout,
            transformRequest: [(rawData) => JSON.stringify(rawData)],
            url: url + "?" + Client.objectToUrlParameters({
                ...parameters,
                ...{
                    token: credentials.token,
                },
            }).replace(/#/g, '%23'),
    };

        if (typeof this.cancelToken[url] !== "undefined") {
            axiosRequestConfig.cancelToken = this.cancelToken[url].token;
        }

        try {
            axiosRetry(Axios, {
                retries: 3,
                shouldResetTimeout: true,
                retryCondition: (error) => {
                    return axiosRetry.isNetworkOrIdempotentRequestError(error)
                        || error.code === "ECONNABORTED"
                        || error.message === "Network Error";
                },
            });

            const sendRequest = async () => await Axios.request(axiosRequestConfig);
            const axiosResponse = await sendRequest();

            return new Response(
                axiosResponse.status,
                axiosResponse.data,
            );
        } catch (error) {
            let response: Response;
            if (error.response) {
                response = new Response(
                    error.response.status,
                    error.response.data,
                );
            } else {
                response = new Response(
                  ConnectionError.getTransportableHTTPError(),
                  {
                      message: error.message,
                  },
                );
            }
            throw response;
        }
    }

    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     */
    public abort(url: string) {
        if (typeof this.cancelToken[url] !== "undefined") {
            this.cancelToken[url].cancel();
        }

        this.generateCancelToken(url);
    }

    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    public generateCancelToken(url: string) {
        this.cancelToken[url] = Axios.CancelToken.source();
    }
}
