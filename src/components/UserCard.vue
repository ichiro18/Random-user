<template>
    <div class="user">
        <div class="user__preview">
            <div class="user__avatar">
                <div
                    class="avatar__image"
                    :style="{ backgroundImage: `url('${user.picture.large}')` }"
                ></div>
            </div>
        </div>
        <div class="user__details">
            <div class="detail__item">
                <span class="item__description">{{ userData.desc }}</span>
                <span
                    class="item__value"
                    :class="{
                        'item__value--capitalized': userData.capitalized,
                    }"
                    >{{ userData.value }}</span
                >
            </div>
            <ul class="detail__fields">
                <li
                    class="field__item"
                    :class="{
                        'field__item--active': currentField === fields.name,
                    }"
                    @click="selectData(fields.name)"
                >
                    <i class="fas fa-user"></i>
                </li>
                <li
                    class="field__item"
                    :class="{
                        'field__item--active': currentField === fields.birthday,
                    }"
                    @click="selectData(fields.birthday)"
                >
                    <i class="far fa-calendar-alt"></i>
                </li>
                <li
                    class="field__item"
                    :class="{
                        'field__item--active': currentField === fields.email,
                    }"
                    @click="selectData(fields.email)"
                >
                    <i class="far fa-envelope"></i>
                </li>
                <li
                    class="field__item"
                    :class="{
                        'field__item--active': currentField === fields.phone,
                    }"
                    @click="selectData(fields.phone)"
                >
                    <i class="fas fa-phone"></i>
                </li>
                <li
                    class="field__item"
                    :class="{
                        'field__item--active': currentField === fields.login,
                    }"
                    @click="selectData(fields.login)"
                >
                    <i class="fas fa-sign-in-alt"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const fields = {
    name: 'name',
    birthday: 'dob',
    email: 'email',
    phone: 'phone',
    login: 'login',
};

export default {
    name: 'UserCard',
    data() {
        return {
            fields,
            currentField: fields.name,
            user: {
                gender: 'male',
                name: {
                    title: 'mr',
                    first: 'brad',
                    last: 'gibson',
                },
                location: {
                    street: '9278 new road',
                    city: 'kilcoole',
                    state: 'waterford',
                    postcode: '93027',
                    coordinates: {
                        latitude: '20.9267',
                        longitude: '-7.9310',
                    },
                    timezone: {
                        offset: '-3:30',
                        description: 'Newfoundland',
                    },
                },
                email: 'brad.gibson@example.com',
                login: {
                    uuid: '155e77ee-ba6d-486f-95ce-0e0c0fb4b919',
                    username: 'silverswan131',
                    password: 'firewall',
                    salt: 'TQA1Gz7x',
                    md5: 'dc523cb313b63dfe5be2140b0c05b3bc',
                    sha1: '7a4aa07d1bedcc6bcf4b7f8856643492c191540d',
                    sha256:
                        '74364e96174afa7d17ee52dd2c9c7a4651fe1254f471a78bda0190135dcd3480',
                },
                dob: {
                    date: '1993-07-20T09:44:18.674Z',
                    age: 26,
                },
                registered: {
                    date: '2002-05-21T10:59:49.966Z',
                    age: 17,
                },
                phone: '011-962-7516',
                cell: '081-454-0666',
                id: {
                    name: 'PPS',
                    value: '0390511T',
                },
                picture: {
                    large: 'https://randomuser.me/api/portraits/men/75.jpg',
                    medium:
                        'https://randomuser.me/api/portraits/med/men/75.jpg',
                    thumbnail:
                        'https://randomuser.me/api/portraits/thumb/men/75.jpg',
                },
                nat: 'IE',
            },
        };
    },
    computed: {
        userData() {
            let desc = '';
            let value = '';
            let capitalized = false;
            switch (this.currentField) {
                case fields.name:
                    desc = 'My name is';
                    value = `${
                        this.user[fields.name] && this.user[fields.name].first
                            ? this.user[fields.name].first
                            : ''
                    } ${
                        this.user[fields.name] && this.user[fields.name].last
                            ? this.user[fields.name].last
                            : ''
                    }`;
                    capitalized = true;
                    break;
                case fields.birthday:
                    desc = 'My birthday is';
                    value =
                        this.user[fields.birthday] &&
                        this.user[fields.birthday].date
                            ? this.parseDate(this.user[fields.birthday].date)
                            : '-';
                    break;
                case fields.email:
                    desc = 'My email address is';
                    value = this.user[fields.email]
                        ? this.user[fields.email]
                        : '-';
                    break;
                case fields.phone:
                    desc = 'My phone number is';
                    value = this.user[fields.phone]
                        ? this.user[fields.phone]
                        : '-';
                    break;
                case fields.login:
                    desc = 'My username is';
                    value =
                        this.user[fields.login] &&
                        this.user[fields.login].username
                            ? this.user[fields.login].username
                            : '-';
                    break;
                default:
                    desc = '-';
                    value = '-';
            }
            return {
                desc,
                value,
                capitalized,
            };
        },
    },
    methods: {
        selectData(field) {
            const index = Object.values(fields).indexOf(field);
            this.currentField =
                index >= 0 ? Object.values(fields)[index] : fields.name;
        },
        parseDate(timestamp) {
            return new Date(timestamp).toLocaleDateString();
        },
    },
};
</script>

<style lang="scss">
@import '../assets/styles/config/variables';

.user {
    display: flex;
    flex-direction: column;
    background-color: $invert-color;
    border: 1px solid $border-color;
    box-shadow: $box-shadow;
    border-radius: 5px;

    &__preview {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
    }

    &__avatar {
        background-color: $invert-color;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 30px;
        border: 1px solid $border-color;
        overflow: hidden;

        .avatar__image {
            display: block;
            position: relative;
            width: inherit;
            height: inherit;
            background-repeat: no-repeat;
            background-position: center bottom;
            background-size: contain;
        }
    }

    &__details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px 30px;

        .detail {
            &__item {
                display: flex;
                flex-direction: column;
                text-align: center;

                .item {
                    &__description {
                        color: $text-color-secondary;
                        font-size: 18px;
                        margin: 0;
                    }

                    &__value {
                        color: $secondary-color;
                        font-size: 38px;
                        margin: 5px;

                        &--capitalized {
                            text-transform: capitalize;
                        }
                    }
                }
            }

            &__fields {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 30px 0;
                padding: 0;
                list-style: none;

                .field__item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 3rem;

                    &--active,
                    &:hover {
                        cursor: pointer;
                        color: $accent-color;
                    }

                    & + .field__item {
                        margin-left: 15px;
                    }
                }
            }
        }
    }
}
</style>
