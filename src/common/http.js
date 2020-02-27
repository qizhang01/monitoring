import axios from 'axios'
import { pre } from 'src/common/api'
import { N } from './proxy'

function check(res) {
	if (res.data.code !== 'success') {
		return Promise.reject(res)
	}
	return res
}

export function httpGet(url, query) {
	return axios.get(N(pre + url)).then(check)
}

export function httpPost(url, data) {
	return axios.post(N(pre + url), data).then(check)
}

export function httpPut(url, data) {
	return axios.put(N(pre + url), data).then(check)
}

export function httpDel(url, query) {
	return axios.delete(N(pre + url)).then(check)
}