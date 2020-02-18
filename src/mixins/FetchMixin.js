'use strict';
import axios from 'axios';

/**
 * @mixin
 * @module mixins/FetchMixin
 * @desc API connector
 * @vue-data {Boolean} [loading = false] loading state
 * @vue-data {Boolean} [useAxios = true] use `Axios` for connection
 * @vue-data {String} [apiUrl = ''] API Endpoint URI
 * @vue-data {Object} response - Last response saved data
 * @vue-data {Number} [response.status = 200] Response status code
 * @vue-data {String} [response.statusText = ''] Response status text
 * @vue-data {Object} response.data Response data payload
 */
export default {
    data() {
        return {
            loading: false,
            useAxios: true,
            apiUrl: '',
            response: {
                status: 200,
                statusText: '',
                data: {},
            },
        };
    },
    methods: {
        /**
         * Send GET HTTP Request
         * @desc Safe Send GET HTTP request. If is loading should reset request
         * @return {Promise} Promise object represent the response data or error
         */
        get() {
            if (this.loading) return;
            this.loading = true;
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `${this.apiUrl}?results=10&exc=location,gender,registered,cell,nat`
                    )
                    .then(res => {
                        if (res.status !== 200) reject(res);
                        this.response = {
                            status: res.status,
                            data: res.data.results,
                        };
                        resolve(this.response);
                    })
                    .catch(err => {
                        console.error(err);
                        reject(err);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
    },
};
