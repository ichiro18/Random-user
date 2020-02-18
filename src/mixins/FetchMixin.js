import axios from 'axios';

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
