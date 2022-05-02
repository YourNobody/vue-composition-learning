<template>
    <div
      class="wrapper"
      :class="call(isAuthenticated) && 'authed__wrapper'"
    >
        <header>
            <nav class="nav container-h-auto">
                <div class="app__link">
                    <div class="app__links_main">
                        <c-button>На главную</c-button>
                        <c-button>></c-button>
                    </div>
                    <div>
                        <c-button>Зарегистрироваться</c-button>
                        <c-button>Войти</c-button>
                    </div>
                </div>
                <div class="profile">
                    <div class="profile__open">
                        <c-button>Профиль</c-button>
                    </div>
                </div>
            </nav>
            <hr class="container-h-auto">
        </header>
        <div class="users container-h-auto">
            <div class="users__filters">
                <div class="users__filters_search">
                    <c-input/>
                </div>
                <div class="users__filters_actions">
                    <div>Actions</div>
                </div>
            </div>
            <div class="users__list">
                <div>User 1</div>
                <div>User 2</div>
                <div>User 3</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useVuex} from '@/hooks';

const {mapGetters, call} = useVuex();
const {isAuthenticated} = mapGetters({isAuthenticated: 'auth/isAuthenticated'});
</script>

<style scoped lang="scss">
@import "../styles/variables";
header {
    background-color: white;
    padding: 15px 20px;

    nav.nav {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
    }

    .app__link {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 20px;

        & > div {
            display: grid;
            grid-template-columns: auto auto;
            gap: 10px;
            align-items: center;
            justify-content: flex-start;
        }
    }

    hr {
        border-color: $green;
        margin-top: 15px;
    }
}

.users {
}
</style>