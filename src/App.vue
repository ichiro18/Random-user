<template>
    <div class="page-content">
        <header class="header">
            <div class="container">
                <a href="/" class="brand">
                    <img
                        src="./assets/images/logo.png"
                        alt="logo"
                        class="image logo"
                    />
                    <span class="title">Random User Infinity Scroll</span>
                </a>
            </div>
        </header>
        <main class="content">
            <div class="hero">
                <div class="container">
                    <h3 class="title">
                        Random Users with Infinity scroll
                    </h3>
                    <p class="description">
                        Integration
                        <a href="https://randomuser.me/" target="_blank">
                            Random User API
                        </a>
                        with Infinity Scroll, Preloader. With
                        <a href="/doc" target="_blank">
                            documentation
                        </a>
                    </p>
                </div>
            </div>
            <div class="container">
                <div class="columns users">
                    <div
                        v-for="(user, key) in list"
                        :key="key"
                        class="col is-6"
                    >
                        <user-card :user="user" />
                    </div>
                </div>
                <div v-if="loading" class="loader">
                    <div class="fa-3x">
                        <i class="fas fa-spinner fa-pulse"></i>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import FetchMixin from '@project_src/mixins/FetchMixin';
import UserCard from '@project_src/components/UserCard.vue';
import UtilsMixin from '@project_src/mixins/UtilsMixin';

/**
 * Root App component
 * @desc Load and render user list
 * @vue-data {String} [apiUrl = 'https://randomuser.me/api/'] API Endpoint
 * @vue-data {Array} [list = []] User data list
 * @mixes FetchMixin
 * @mixes UtilsMixin
 */
export default {
    name: 'App',
    components: { UserCard },
    mixins: [FetchMixin, UtilsMixin],
    data() {
        return {
            apiUrl: 'https://randomuser.me/api/',
            list: [],
        };
    },
    /**
     * App.vue `mounted` hook
     */
    mounted() {
        this.onMounted();
    },
    /**
     * App.vue `beforeDestroy` hook
     */
    beforeDestroy() {
        this.onBeforeDestroy();
    },
    methods: {
        /**
         * Append user list from API Response to list
         * @returns void
         */
        load() {
            this.get().then(res => {
                if (res.status === 200) {
                    this.list = [...this.list, ...res.data];
                }
            });
        },
        /**
         * Window scroll behavior
         * @desc Trigger load() when injected scroll to document bottom
         * @param {Event} event Scroll event
         * @listens window#scroll
         */
        onScroll(event) {
            // set default value
            let should = false;
            // get scroll top
            const scrollTop =
                event.target === document
                    ? document.documentElement.scrollTop
                    : event.target.scrollTop;
            // get height of BBOX
            const viewportHeight = document.documentElement.getBoundingClientRect()
                .height;
            // get document full height
            const scrollHeight = document.documentElement.scrollHeight;

            // calc should
            should = scrollTop + viewportHeight >= scrollHeight;

            if (should && !this.loading) {
                this.load();
            }
        },
        /**
         * App.vue `mounted` hook
         * @desc Preload User list && register throttled listener
         */
        onMounted() {
            // preload list
            this.load();
            // add event listener on scroll
            window.addEventListener(
                'scroll',
                this.throttle(this.onScroll.bind(this), 200)
            );
        },
        /**
         * App.vue `beforeDestroy` hook
         * @desc Remove registered Event Listener
         */
        onBeforeDestroy() {
            window.removeEventListener(
                'scroll',
                this.throttle(this.onScroll.bind(this), 200)
            );
        },
    },
};
</script>

<style lang="scss">
@import './assets/styles/config/variables';

.content {
    position: relative;

    .hero {
        display: flex;
        flex-direction: column;
        padding: 50px 0 110px;
        text-align: center;
        color: $invert-color;

        .title {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.125;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
        }

        .description {
            font-size: 1.25rem;
            font-weight: 400;
            line-height: 1.25;
        }
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 400px;
        background-color: $secondary-color;
    }

    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 0;
    }
}
</style>
