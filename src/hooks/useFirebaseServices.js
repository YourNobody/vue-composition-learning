import {AuthFirebaseService} from '@/services';
import {useToast} from 'vue-toastification';
import {generalToastOptions} from '@/configs';
import {useRouter} from 'vue-router';
import {useVuex} from '@/hooks/useVuex';
import {UserFirebaseDto} from '@/dto/UserFirebaseDto';

export const useFirebase = () => {
  const {mapMutations, call} = useVuex();
  const router = useRouter();

  const { setIsAuthProcessLoading, setAccessToken, setUserInfo } = mapMutations({
    setIsAuthProcessLoading: 'auth/setIsAuthProcessLoading',
    setAccessToken: 'auth/setAccessToken',
    setUserInfo: 'auth/setUserInfo'
  });

  const login = async data => {
    call(setIsAuthProcessLoading, true);
    const response = await AuthFirebaseService.login(data);
    if (!response.error && response?.user?.multiFactor?.user?.accessToken) {
      call(setAccessToken, response.user.multiFactor.user.accessToken);
      call(setUserInfo, new UserFirebaseDto(response));
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
    const response = await AuthFirebaseService.signup(data);
    if (!response.error && response?.user?.multiFactor?.user?.accessToken) {
      useToast().success('Вы были успешно зарегистрированы и будете перенаправлены на страницу авторизации');
      setTimeout(() => {
        router.push('/auth/login');
      }, generalToastOptions.timeout);
    }
    call(setIsAuthProcessLoading, false);
    return response;
  }

  const signout = async () => {
    call(setIsAuthProcessLoading, true);
    const response = await AuthFirebaseService.signout();
    if (!response.error) {
      call(setUserInfo, null);
      call(setAccessToken, null);
      useToast().success('Вы успешно вышли из аккаунта');
    }
    call(setIsAuthProcessLoading, false);
    return response;
  };

  return {
    signup, login, signout
  };
};