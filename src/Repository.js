/**
 * Repository class
 */
export default class HttpRepository {
    /**
     * Constructor
     * @param endpoint
     * @param secret
     */
    constructor(endpoint, secret) {
        this.endpoint = endpoint;
        this.secret = secret;
    }

    /**
     * Make query against the server
     * @param query
     * @returns {Promise}
     */
    query(query) {
        query = JSON.stringify(query);
        let composedQuery = `${this.endpoint}?key=${this.secret}&query=${query}`;

        return this.fetchData(composedQuery);
    }

    fetchData(composedQuery) {
        return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            return resolve(
                                JSON.parse(this.responseText)
                            )
                        } else {
                            return reject(`Request error, make sure your query url is properly formed.`)
                        }
                    }
                };

                xhr.open("GET", composedQuery, true);
                xhr.send();
            }
        );
    }
}