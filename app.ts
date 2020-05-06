import { deliveryOrder, resultList } from './server'
var arg11 = {
    "products": {
        "清汤": {
            "price": 19,
            "packageFee": 2,
            "num": 1
        },
        "酸汤": {
            "price": 28,
            "packageFee": 2,
            "num": 3
        },
        "西红柿": {
            "price": 28,
            "packageFee": 2,
            "num": 1
        },
        "半只鸡": {
            "price": 39,
            "packageFee": 2,
            "num": 1
        }
    },
    "discount": [
        [30, 6],
        [45, 12],
        [55, 18],
        [75, 25]
    ],
    "deliveryFee": 4
}
function request<Request, Response>(
    method: 'GET' | 'POST',
    url: string,
    content?: any,
    callback?: (response: Response) => void,
    errorCallback?: (err: any) => void) {
    const rq = new XMLHttpRequest();
    rq.open(method, url, true);
    rq.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            const data = JSON.parse(this.response) as Response;
            callback && callback(data);
        } else {
            // We reached our target server, but it returned an error
        }
    };

    rq.onerror = function (err) {
        // There was a connection error of some sort
        errorCallback && errorCallback(err);
    };
    if (method === 'POST') {
        rq.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    }
    rq.send(JSON.stringify(content));
}

// Using promises:
function requestPromise<Request, Response>(
    method: 'GET' | 'POST',
    url: string,
    content?: any
    ): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
        request(method, url, content, resolve, reject);
    });
}

export function orderSubmit(arg1:deliveryOrder):Promise<any> {
    const method = 'POST';
    const url = 'http://localhost:8888/';
    const content = arg1;
    return requestPromise(method,url,content).then((data) => {
        if (data) {
            return data;
        }
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
}