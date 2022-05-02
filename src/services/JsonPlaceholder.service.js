import axios from 'axios';

export default class JsonPlaceholderService {
	constructor(url) {
		this._url = 'https://jsonplaceholder.typicode.com' + url;
	}

	get url() {
		return this._url;
	}

	getAll = async () => {
		try {
			const response = await axios.get(this._url);
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	getUnique = async (number = 1) => {
		try {
			const response = await axios.get(this._url + `/${number}`);
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	getLimited = async (number = 1) => {
		try {
			const response = await axios.get(this._url + `?_limit=${number}`);
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}
}