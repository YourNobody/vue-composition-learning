import {AuthFirebaseService} from '@/services';
import {useToast} from 'vue-toastification';
import {generalToastOptions} from '@/configs';
import {useRouter} from 'vue-router';
import {useVuex} from '@/hooks/useVuex';
import {UserFirebaseDto} from '@/dto/UserFirebaseDto';
import {LS} from '@/helpers';

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
      const userDto = new UserFirebaseDto(response);

      const {set} = LS('user');
      set(userDto);

      call(setAccessToken, userDto.session.accessToken);
      call(setUserInfo, userDto);
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

  const defineAuthStateListener = () => {
    call(setIsAuthProcessLoading, true);
    const updateStore = user => {
      call(setUserInfo, user ? new UserFirebaseDto(user) : null);
      call(setAccessToken, user ? new UserFirebaseDto(user).session.accessToken : null);
      call(setIsAuthProcessLoading, false);
    };

    AuthFirebaseService.defineAuthStateListener(updateStore);
  };

  return {
    signup, login, signout,
    defineAuthStateListener
  };
};