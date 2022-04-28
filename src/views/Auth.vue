<template>
  <div
    class="auth"
    v-interactive="interactOption"
  >
    <div
      class="auth__begin"
      v-if="stages.isBegin"
    >
      <h1>Авторизация</h1>
      <div class="auth__begin_buttons">
        <c-button
          class="go-collapse"
          @click="changeBlock('isLogin', {
          handler: () => router.push('/auth/login')
        })"
        >Есть аккаунт
        </c-button>
        <c-button
          class="go-collapse"
          @click="changeBlock('isSignup', {
          handler: () => router.push('/auth/signup')
        })"
        >Еще нет аккаунта
        </c-button>
      </div>
      <div>
        <c-button
          style="width:100%"
          class="go-over"
          @click="changeBlock('isSignup', {
            handler: () => router.push('/')
          })"
        >На главную
        </c-button>
      </div>
    </div>
    <div class="auth__login" v-if="stages.isLogin">
      <h1>Вход</h1>
      <FormKit
        type="form"
        form-class="form-grid"
        v-model="forms.login"
        @submit="handleSubmit('login', login)"
        :disabled="isFormProcessing"
        :actions="false"
      >
        <FormKit
          name="email"
          type="email"
          placeholder="Введите email"
          label="Email"
          :outer-class="withContent(forms.login?.email?.length)"
          :validation="getValidators('email')"
          :validation-messages="getCustomValidationMessages('email')"
        />
        <FormKit
          name="password"
          type="password"
          placeholder="Введите пароль"
          label="Пароль"
          :outer-class="withContent(forms.login?.password?.length)"
          :validation="getValidators('password')"
          :validation-messages="getCustomValidationMessages('password')"
        />
        <FormKit
          type="submit"
          :outer-class="{
            'w-go-collapse': !isFormProcessing
          }"
          :label="isFormProcessing ? 'Идет процесс входа' : 'Войти'"
        />
      </FormKit>
      <div class="links__wrapper">
        <div @click="changeBlock('isSignup', {
          handler: () => router.push('/auth/signup')
        })">Все же нет аккаунта</div>
        <div @click="changeBlock('isBegin', {
          handler: () => router.push('/auth')
        })">Назад</div>
      </div>
    </div>
    <div class="auth__signup" v-if="stages.isSignup">
      <h1>Регистрация</h1>
      <FormKit
        type="form"
        form-class="form-grid"
        v-model="forms.signup"
        @submit="handleSubmit('signup', signup)"
        :submit-label="isFormProcessing ? 'Идет процесс регистрации' : 'Зарегистрироваться'"
        :actions-class="!isFormProcessing && 'w-go-collapse'"
      >
        <FormKit
          name="email"
          type="email"
          placeholder="Введите email"
          label="Email"
          :input-class="withContent(forms.signup?.email?.length)"
          :label-class="withContent(forms.signup?.email?.length)"
          :validation="getValidators('email')"
          :validation-messages="getCustomValidationMessages('email')"
        />
        <FormKit
          name="password"
          type="password"
          placeholder="Введите пароль"
          label="Пароль"
          :input-class="withContent(forms.signup?.password?.length)"
          :label-class="withContent(forms.signup?.password?.length)"
          :validation="getValidators('password')"
          :validation-messages="getCustomValidationMessages('password')"
        />
        <FormKit
          name="confirm"
          type="password"
          placeholder="Подтвердите пароль"
          label="Пароль еще раз"
          :input-class="withContent(forms.signup?.confirm?.length)"
          :label-class="withContent(forms.signup?.confirm?.length)"
          :validation="getValidators('confirm')"
          :validation-messages="getCustomValidationMessages('confirm')"
        />
      </FormKit>
      <div class="links__wrapper">
        <div @click="changeBlock('isLogin', {
          handler: () => router.push('/auth/login')
        })">Есть аккаунт</div>
        <div @click="changeBlock('isBegin', {
          handler: () => router.push('/auth')
        })">Назад</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useElementStyles, useForm, useVuex} from '@/hooks';
import {useFirebase} from '@/hooks/useFirebaseServices';

const router = useRouter();
const route = useRoute();

const stages = ref({
  isBegin: !route.params.page,
  isLogin: route.params.page && route.params.page === 'login',
  isSignup: route.params.page && route.params.page === 'signup'
});

watch(route, () => {
  stages.value = {
    isBegin: !route.params.page,
    isLogin: route.params?.page === 'login',
    isSignup: route.params?.page === 'signup'
  };
});

const interactOption = ref('top');
const currentStageKey = computed(() => Object.keys(stages.value).find(key => stages.value[key]));

const changeBlock = (to, options = {}) => {
  const {handler} = options;
  document.body.style.overflow = 'hidden';
  interactOption.value = 'bottom';

  setTimeout(() => {
    stages.value[currentStageKey.value] = false;
    stages.value[to] = true;
    interactOption.value = 'top';
    document.body.style.overflow = '';
    handler && handler();
  }, 200);
};

const {withError, withContent} = useElementStyles();
const {login, signup} = useFirebase();
const {mapGetters, bind} = useVuex();
const {forms, isFormProcessing, isValid, getValidators, getCustomValidationMessages, handleSubmit} = useForm(
  ['login', 'signup'], {
    password: {
      required: true,
      length: '4,16'
    },
    confirm: {
      required: true,
      length: '4,16',
      confirm: 'password'
    },
    email: {
      required: true,
      email: true
    }
  }, {
    password: {
      required: 'Это поле обязательно',
      length: 'Минимальная длина пароля 4 символ\nМаксимальная длина 16 символов',
    },
    confirm: {
      required: 'Это поле обязательно',
      length: 'Минимальная длина пароля 4 символ\nМаксимальная длина 16 символов',
      confirm: 'Пароли не совпадают'
    }
  }
);
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
@import "../styles/animations.scss";

.auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;

  & > div {
    display: grid;
    gap: 15px;
    width: 330px;
    padding: 20px 15px;
  }

  & .formkit-form {
    background: red;
  }
}

.auth__begin_buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;

  button:not(:last-of-type) {
    margin-right: 10px;
  }
}

.links__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    cursor: pointer;
    transition: 0.2s all;

    &:hover {
      color: $green;
    }
  }
}
</style>