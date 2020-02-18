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
                >
                    {{ userData.value }}
                </span>
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
/**
 * @constant
 * @desc Default mapping data field with Response
 * @type {{birthday: string, phone: string, name: string, login: string, email: string}}
 * @default
 */
const FIELDS = {
    name: 'name',
    birthday: 'dob',
    email: 'email',
    phone: 'phone',
    login: 'login',
};

/**
 * @module components/UserCard
 * @desc UserCard component for render user data
 * @vue-prop {Object} user List item of users
 * @vue-data {Object} [fields = FIELDS] bridge to fields constant
 * @vue-data {String} [currentField = 'name'] Filter types of fields
 * @vue-computed {{capitalized: boolean, value: *, desc: string}} userData - Fill data for current field
 */
export default {
    name: 'UserCard',
    props: {
        user: {
            type: Object,
            required: true,
            validator(val) {
                Object.values(FIELDS).forEach(item => {
                    if (!val[item]) return false;
                });
                return true;
            },
        },
    },
    data() {
        return {
            fields: FIELDS,
            currentField: FIELDS.name,
        };
    },
    computed: {
        userData() {
            let desc = '';
            let value = '';
            let capitalized = false;
            switch (this.currentField) {
                case FIELDS.name:
                    desc = 'My name is';
                    value = `${
                        this.user[FIELDS.name] && this.user[FIELDS.name].first
                            ? this.user[FIELDS.name].first
                            : ''
                    } ${
                        this.user[FIELDS.name] && this.user[FIELDS.name].last
                            ? this.user[FIELDS.name].last
                            : ''
                    }`;
                    capitalized = true;
                    break;
                case FIELDS.birthday:
                    desc = 'My birthday is';
                    value =
                        this.user[FIELDS.birthday] &&
                        this.user[FIELDS.birthday].date
                            ? this.parseDate(this.user[FIELDS.birthday].date)
                            : '-';
                    break;
                case FIELDS.email:
                    desc = 'My email address is';
                    value = this.user[FIELDS.email]
                        ? this.user[FIELDS.email]
                        : '-';
                    break;
                case FIELDS.phone:
                    desc = 'My phone number is';
                    value = this.user[FIELDS.phone]
                        ? this.user[FIELDS.phone]
                        : '-';
                    break;
                case FIELDS.login:
                    desc = 'My username is';
                    value =
                        this.user[FIELDS.login] &&
                        this.user[FIELDS.login].username
                            ? this.user[FIELDS.login].username
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
        /**
         * Update current field
         * @desc change selected field Data
         * @param {String} field - field value of FIELDS || any string
         */
        selectData(field) {
            const index = Object.values(FIELDS).indexOf(field);
            this.currentField =
                index >= 0 ? Object.values(FIELDS)[index] : FIELDS.name;
        },

        /**
         * Timestamp parser
         * @desc Parse timestamp to DataTime Locale string
         * @param {Date} timestamp - timestamp to parsed
         * @return {string} A locale date string
         */
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
