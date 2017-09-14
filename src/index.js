/**
 * Your code here
 */
import Query from './Query';
import HttpRepository from "./Repository";

const apisearch = {
    repository: 'comment',
    endpoint: 'http://127.0.0.1:9002/app.php',
    secret: 'sandbox_comments_secret'
};

let query = new Query();
query.create('', 1, 10);

let repository = new HttpRepository(
    apisearch.endpoint,
    apisearch.secret
);

repository.query(query).then(res => console.log(res));