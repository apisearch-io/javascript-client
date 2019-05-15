import Axios, {AxiosResponse} from "axios";
import {ConnectionError, Retry} from "..";
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
            }),
        };

        if (typeof this.cancelToken[url] !== "undefined") {
            axiosRequestConfig.cancelToken = this.cancelToken[url].token;
        }

        try {
            const sendRequest = async () => await Axios.request(axiosRequestConfig);
            const retry = this.retryMap.getRetry(axiosRequestConfig.url, axiosRequestConfig.method);
            const axiosResponse = await this.tryRequest(sendRequest, retry);

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
                      message: "Connection failed or timed out",
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
     * Performs the request and maybe retries in case of failure
     *
     * @param sendRequest The function that, when called, will perform the HTTP request
     * @param retry       If it's an instance of Retry and the request fails it will retry the request
     *
     * @return {Promise<AxiosResponse>}
     */
    private async tryRequest(sendRequest: () => Promise<AxiosResponse>, retry?: Retry): Promise<AxiosResponse> {
        let retries = 0;
        let millisecondsBetweenRetries = 0;
        if (retry instanceof Retry) {
            retries = retry.getRetries();
            millisecondsBetweenRetries = retry.getMicrosecondsBetweenRetries() / 1000;
        }
        while (true) {
            try {
                return await sendRequest();
            } catch (error) {
                if (retries <= 0) {
                    throw error;
                }
                retries -= 1;
                if (millisecondsBetweenRetries > 0) {
                    await new Promise((resolve) => setTimeout(resolve, millisecondsBetweenRetries));
                }
            }
        }
    }
}
