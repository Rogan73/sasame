import axios from "axios";

export default class APIrequest {

    resource;

    constructor(resource) {
        if (!resource) throw new Error("No se proporciona el recurso");
        this.resource = resource;
    }

    async get(id) {
        try {
            const response = await axios.get(this.getUrl(id));
            return await response.data.data;
        } catch (err) {
            this.Errors(err);
        }
    }

    async post(link, data) {
        try {
            const response = await axios.post(this.getUrl() + link, JSON.stringify(data));
            return await response.data.data;
        } catch (err) {
            this.Errors(err.response.data.error);
        }
    }

    getUrl(id = "") { return `/api/${this.resource}`; }

    Errors(err) { console.log("Errors from API: ", err); }
}