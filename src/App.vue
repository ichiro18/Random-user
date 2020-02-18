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
						<user-card :user="user"/>
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
  import UtilsMixin from "@project_src/mixins/UtilsMixin";
  
  export default {
    name: 'App',
    components: {UserCard},
    mixins: [FetchMixin, UtilsMixin],
    data() {
      return {
        apiUrl: 'https://randomuser.me/api/',
        list: []
      };
    },
    mounted() {
      this.load();
      window.addEventListener('scroll', this.throttle(this.scroll.bind(this), 200));
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.throttle(this.scroll.bind(this), 200));
    },
    methods: {
      load() {
        this.get()
          .then(res => {
            if (res.status === 200) {
              this.list = [
                ...this.list,
                ...res.data
              ];
            }
          });
      },
      scroll(event) {
        let should = false;
        const scrollTop = event.target === document ? document.documentElement.scrollTop : event.target.scrollTop;
        const viewportHeight = document.documentElement.getBoundingClientRect().height;
        const scrollHeight = document.documentElement.scrollHeight;
  
        should = scrollTop + viewportHeight >= scrollHeight;
        
        
        if (should && !this.loading) {
          this.load();
        }
      },
    }
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
