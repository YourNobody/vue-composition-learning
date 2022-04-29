import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {notifyIfIsOffline} from '@/helpers';
import {firebaseConfig} from '@/configs';

export class AuthFirebaseService {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.authedFirebase = firebase.auth();
  }

  async login(data) {
    try {
      if (notifyIfIsOffline()) return;
      const response = await this.authedFirebase.signInWithEmailAndPassword(data.email, data.password);
      return response;
    } catch (e) {
      return {
        error: parseFirebaseError(e)
      };
    }
  }

  async signup(data) {
    try {
      if (notifyIfIsOffline()) return;
      const response = await this.authedFirebase.createUserWithEmailAndPassword(data.email, data.password);
      return response;
    } catch (e) {
      return {
        error: parseFirebaseError(e)
      };
    }
  }

  async logout(data) {
  }

  async reset(data) {
  }
}

export default new AuthFirebaseService();

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
    case 'auth/too-many-requests': return 'Слишком много запросов из формы\nПопробуйте позже';
    case 'auth/operation-not-allowed': return 'Ошибка сервиса. Попробуйте позже'
    default: return error.message;
  }
}