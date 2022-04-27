import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {inject} from 'vue';
import {useToast} from 'vue-toastification';

export const useFirebase = () => {
  const isOnline = inject('isOnline')();
  function notifyIfIsOffline() {
    !isOnline.value && useToast().warning('В данный момент подключение к интернету отсутствует.\nДанная функция не может быть выполнена');
    return !isOnline.value;
  }

  const FB = firebase.auth();

  const login = async data => {
    try {
      if (notifyIfIsOffline()) return;
      const response = await FB.signInWithEmailAndPassword(data.email, data.password);
      return response;
    } catch (e) {
      return {
        error: parseFirebaseError(e)
      };
    }
  };

  const signup = async data => {
    try {
      if (notifyIfIsOffline()) return;
      const response = await FB.createUserWithEmailAndPassword(data.email, data.password);
      return response;
    } catch (e) {
      return {
        error: parseFirebaseError(e)
      };
    }
  };

  const reset = async data => {

  };

  return {
    login, signup, reset
  };
};

function parseFirebaseError(error) {
  console.dir(error);
  if (!error || !error.code) return;
  const { code } = error;

  switch (code) {
    case 'auth/user-not-found': return 'Такого пользователя не существует';
    case 'auth/wrong-password': return 'Неверный пароль';
    case 'auth/weak-password': return 'Пароль слишком легкий: минимум 6 символов';
    case 'auth/email-already-in-use': return 'Пользователь с такой почтой уже существует';
    case 'auth/invalid-password': return 'Неверный пароль';
    default: return error.message;
  }
}