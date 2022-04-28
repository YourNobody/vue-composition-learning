import {AuthFirebaseService} from '@/services';

export const useFirebase = () => {
  const login = async data => {
    console.log('login');
    const response = await AuthFirebaseService.login(data);
    console.log(response);
    return response;
  }

  const signup = async data => {
    console.log('signUp');
    const response = await AuthFirebaseService.signup(data);
    console.log(response);
    return response;
  }

  return {
    signup, login
  };
};