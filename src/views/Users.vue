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
      <hr class='container-h-auto header_hr'>
    </header>
    <div class='users container-h-auto'>
      <div class="profile__info" v-if="false">
        Profile
      </div>
      <div class='users__filters'>
        <div class='users__filters_search'>
          <c-input
            input-style="border: 1px solid black"
            v-model.trim="usersStore.filterLine"
          />
        </div>
        <div class='users__filters_actions'>
          <c-button
            class="go-over"
            @click="isFiltersButtonsShown = !isFiltersButtonsShown"
          >{{ isFiltersButtonsShown ? 'Скрыть' : 'Фильтры' }}</c-button>
          <div
            class="user__filters_block"
            v-if="isFiltersButtonsShown"
          >
            <FormKit
              v-model="usersStore.filterActiveOption"
              type="radio"
              label="Доступные фильтры"
              :options="usersStore.filterOptions"
              help="Выберите по каким данным фильтровать"
            />
          </div>
        </div>
      </div>
      <div class='users__list' v-if="!usersStore.isLoading && usersStore.users.length">
        <transition-group name="flip-list">
          <c-card
            v-for='user in usersStore.filteredByOptionsAndLine'
            :key='user.id'
            :style="{
              'z-index': user.id
            }"
            :userData='user'
            class="user__card"
          />
        </transition-group>
      </div>
      <div
        v-if="usersStore.isLoading"
        class="loading"
      >
        <c-loader-vlines />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useVuex, useShowVariables} from '@/hooks';
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUsersStore} from '@/store/users.pinia';

import '@formkit/themes/genesis';
import CLoaderVlines from '@/components/Loader';

const router = useRouter();
const interactOption = ref('top');

const changeBlock = (route) => {
  document.body.style.overflow = 'hidden';
  interactOption.value = 'bottom';

  setTimeout(() => {
    router.push(route);
  }, 200);
};

const { isActionsShown, isFiltersButtonsShown } = useShowVariables(['isActionsShown', 'isFiltersButtonsShown']);

const {mapGetters, call} = useVuex();
const {isAuthenticated} = mapGetters({isAuthenticated: 'auth/isAuthenticated'});
const usersStore = useUsersStore();

onMounted(() => {
  usersStore.fetchUsers();
});
</script>

<style scoped lang='scss'>
@import "../styles/variables";
@import "../styles/animations";

header {
  background-color: white;
  padding: 15px 20px 0 20px;

  .header_hr {
    border-color: $green;
    margin-top: 15px;
  }

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
}

.users {
  position: relative;
  margin-top: 15px;

  .users__filters {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    gap: 10px;

    .users__filters_search {
      .search__input {
        border: 1px solid black;
      }
    }
  }

  .users__list {
    display: grid;
    gap: 15px;
    margin-top: 15px;
  }

  .users__filters_actions {
    position: relative;
  }

  .user__filters_block {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background-color: white;
    padding: 20px;
    width: 320%;
    border-radius: 20px;
    box-shadow: 0 2px 14px rgba(126, 125, 125, 0.5);
    z-index: 20;
  }

  .user__card:last-of-type {
    margin-bottom: 30px;
  }
}

.profile__info {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: red;
  z-index: 40;
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

.flip-list-move {
  transition: transform 0.5s;
  border-color: transparent !important;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>