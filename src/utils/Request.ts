import fetch, { FetchError } from "node-fetch";

export default function<T>(url: string): Promise<T> {
    return fetch(url).then(res => {
        if(!res.ok){
            throw new Error(res.statusText);
        }
        return res.json() as Promise<T>
    }).catch((err: FetchError) => {
        throw new Error(err.message);
    });
}