import {HttpClient} from "./HttpClient";
import {Response} from "./Response";
import {Md5} from "ts-md5";

/**
 * AxiosClient
 */
export class CacheClient implements HttpClient {

    private cache: {[key: string]: Response} = {};
    private httpClient: HttpClient;
    private hits: number = 0;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public flushCache() {
        this.cache = {};
    }

    public size() {
        return Object.keys(this.cache).length;
    }

    public getNumberOfHits() {
        return this.hits;
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
        if (method !== 'get') {
            return this.httpClient.get(
                url,
                method,
                credentials,
                parameters,
                data
            );
        }

        const cacheUID = Md5.hashStr(JSON.stringify({
            'u': url,
            'c': credentials,
            'p': parameters,
            'd': data,
        })).toString();

        if (!this.cache[cacheUID]) {
            this.cache[cacheUID] = await this.httpClient.get(
                url,
                method,
                credentials,
                parameters,
                data,
            );
        } else {
            this.httpClient.abort(url, false);
            this.hits++;
        }

        return this.cache[cacheUID];
    }

    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     * @param urlIsFormatted
     */
    public abort(
        url: string,
        urlIsFormatted: boolean,
    )
    {

    }
}
