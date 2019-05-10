import Axios from "axios";
import {ConnectionError} from "..";
import {Client} from "./Client";
import {HttpClient} from "./HttpClient";
import {Response} from "./Response";
import {RetryMap} from "./RetryMap";

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
     * @param retryMap
     * @param overrideQueries
     */
    constructor(
        host: string,
        version: string,
        timeout: number,
        retryMap: RetryMap,
        overrideQueries: boolean,
    ) {
        super(version, retryMap);

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
        const that = this;
        url = url.replace(/^\/*|\/*$/g, "");
        url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
        method = method.toLowerCase();

        if (
            "get" === method &&
            this.overrideQueries
        ) {
            this.abort(url);
        }

        return new Promise<Response> ((resolve, reject) => {

            const headers = "get" === method
                ? {}
                : {
                    "Content-Encoding": "gzip",
                    "Content-Type": "application/json",
                };

            const axiosRequestConfig: any = {
                baseURL: that.host.replace(/\/*$/g, ""),
                data,
                headers,
                method,
                timeout: that.timeout,
                transformRequest: [(rawData) => JSON.stringify(rawData)],
                url: url + "?" + Client.objectToUrlParameters({
                    ...parameters,
                    ...{
                        token: credentials.token,
                    },
                }),
            };

            if (typeof this.cancelToken[url] !== "undefined") {
                axiosRequestConfig.cancelToken = this.cancelToken[url].token;
            }

            Axios
                .request(axiosRequestConfig)
                .then((axiosResponse) => {

                    const response = new Response(
                        axiosResponse.status,
                        axiosResponse.data,
                    );

                    return resolve(response);
                })
                .catch((error) => {
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
                              message: "Connection failed or timed out",
                          },
                        );
                    }
                    reject(response);
                });
        });
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
