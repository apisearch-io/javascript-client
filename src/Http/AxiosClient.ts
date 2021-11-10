import axios from "axios";
import Axios from "axios";
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
            }).replace(/#/g, "%23"),
    };

        if (typeof this.cancelToken[url] !== "undefined") {
            axiosRequestConfig.cancelToken = this.cancelToken[url].token;
        }

        try {
            const axiosResponse = await this.fetch(url, axiosRequestConfig, 3);

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

    /**
     * @param url
     * @param options
     * @param retries
     */
    public async fetch(url: string, options: {}, retries: number) {
        return await Axios
            .request(options)
            .then((response) => {
                return {
                    data: response.data,
                    status: response.status,
                };
            })
            .catch((error) => {
                const response = error.response;
                if (
                    error.code !== undefined &&
                    error.code !== "ECONNREFUSED" &&
                    error.code !== "ECONNABORTED" &&
                    error.message !== "Network Error"
                ) {
                    return {
                        data: response.data,
                        status: response.status,
                    };
                }

                if (retries <= 0) {
                    throw error;
                }

                retries = retries - 1;

                return this.fetch(url, options, retries);
            });
    }
}
