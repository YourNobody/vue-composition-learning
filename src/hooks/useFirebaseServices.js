import {AuthFirebaseService} from '@/services';
import {useToast} from 'vue-toastification';
import {generalToastOptions} from '@/configs';
import {useRouter} from 'vue-router';
import {useVuex} from '@/hooks/useVuex';

export const useFirebase = () => {
  const {mapMutations, call} = useVuex();
  const router = useRouter();

  const { setIsAuthProcessLoading, setAccessToken } = mapMutations({
    setIsAuthProcessLoading: 'auth/setIsAuthProcessLoading',
    setAccessToken: 'auth/setAccessToken'
  });

  const login = async data => {
    call(setIsAuthProcessLoading, true);
    const response = await AuthFirebaseService.login(data);
    if (!response.error && response?.user?.multiFactor?.user?.accessToken) {
      call(setAccessToken, response.user.multiFactor.user.accessToken);
      useToast().success('Вы были успешно авторизированы и будете перенаправлены на главную страницу');
      setTimeout(() => {
        router.push('/');
      }, generalToastOptions.timeout);
    }
    call(setIsAuthProcessLoading, false);
    return response;
  }

  const signup = async data => {
    call(setIsAuthProcessLoading, true);
    console.log('signUp');
    const response = await AuthFirebaseService.signup(data);
    console.log(response);
    if (!response.error && response?.user?.multiFactor?.user?.accessToken) {
      useToast().success('Вы были успешно зарегистрированы и будете перенаправлены на страницу авторизации');
      setTimeout(() => {
        router.push('/auth/login');
      }, generalToastOptions.timeout);
    }
    call(setIsAuthProcessLoading, false);
    return response;
  }

  return {
    signup, login
  };
};