import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()

export class NewsService {
    constructor(private httpClient: HttpClient) { }

    getNews(url) {
        return this.httpClient.get(url)
            .toPromise()
            .then(res => {
                let rtn: any;
                rtn = res;
                return rtn;
            });
    }
    postNews(form_data) {
        let url = "http://localhost:8080/news/db/post-news";
        return this.httpClient.post(url, form_data)
            .toPromise()
            .then(data => data);
    }
}