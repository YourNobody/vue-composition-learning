<template>
  <div
    class='wrapper'
    :class="call(isAuthenticated) && 'authed__wrapper'"
    v-interactive="interactOption"
  >
    <header>
      <nav class='nav container-h-auto'>
        <div class='app__link'>
            <div class='app__links_main'>
              <c-button
                class='go-from-inside'
                @click="changeBlock('/')"
              >На главную</c-button>
              <c-button
                class='unwrap'
                @click='isActionsShown = !isActionsShown'
              >></c-button>
            </div>
            <transition
              name="slide-fade"
            >
              <div class='actions__pages' v-if='isActionsShown'>
                <c-button
                  class='go-from-inside'
                  @click="changeBlock('/auth/signup')"
                >Зарегистрироваться</c-button>
                <c-button
                  class='go-from-inside'
                  @click="changeBlock('/auth/login')"
                >Войти</c-button>
              </div>
            </transition>
        </div>
        <div class='profile'>
          <div class='profile__open'>
            <c-button class='go-from-inside'>Профиль</c-button>
          </div>
        </div>
      </nav>
      <hr class='container-h-auto'>
    </header>
    <div class='users container-h-auto'>
      <div class='users__filters'>
        <div class='users__filters_search'>
          <c-input />
        </div>
        <div class='users__filters_actions'>
          <div>Actions</div>
        </div>
      </div>
      <div class='users__list'>
        <c-card
          v-for='user in call(usersModule).users'
          :key='user.id'
          :userData='user'
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useVuex} from '@/hooks';
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const interactOption = ref('top');

const changeBlock = (route) => {
  document.body.style.overflow = 'hidden';
  interactOption.value = 'bottom';

  setTimeout(() => {
    router.push(route);
  }, 200);
};

const isActionsShown = ref(false);

const {mapGetters, mapActions, mapState, call} = useVuex();
const {isAuthenticated} = mapGetters({isAuthenticated: 'auth/isAuthenticated'});
const {usersModule} = mapState({usersModule: 'users'});
const {accessToken} = mapState({accessToken: 'auth/accessToken'});
const {fetchUser} = mapActions({fetchUser: 'users/fetchUsers'});
onMounted(() => {
  call(fetchUser);
});
</script>

<style scoped lang='scss'>
@import "../styles/variables";
@import "../styles/animations";

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
      gap: 20px;
      align-items: center;
      justify-content: flex-start;
    }

    button {
      padding: 12px 10px;
    }

    .unwrap {
      font-size: 24px;
      padding: 0;
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }

  hr {
    border-color: $green;
    margin-top: 15px;
  }
}

.users {
  .users__filters {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .users__list {
    display: grid;
    gap: 15px;
    margin-top: 15px;
  }
}

.slide-fade-enter {
  transform: translateX(-100px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 5s ease;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>