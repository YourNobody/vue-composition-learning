import {defineStore} from 'pinia';
import {useJsonPlaceholder} from '@/hooks';
import {indexOf} from '@/helpers';

const filterOptions = {
  all: 'Вce',
  name: 'По имени',
  city: 'По городу',
  companyName: 'По компании'
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    filterActiveOption: 'all',
    filterLine: '',
    isLoading: false,
    filterOptions
  }),
  getters: {
    filteredByOptions() {
      return [...this.users].sort((user1, user2) => {
        if (this.filterActiveOption === 'companyName') return user1.company.name?.localeCompare(user2.company.name);
        else if (user1[this.filterActiveOption]) return user1[this.filterActiveOption]?.localeCompare(user2[this.filterActiveOption]);
        else if (user1.address[this.filterActiveOption]) return user1.address[this.filterActiveOption]?.localeCompare(user2.address[this.filterActiveOption]);
      });
    },
    filteredByOptionsAndLine() {
      if (!this.filterLine) return this.filteredByOptions;
      return this.filteredByOptions.reduce((acc, user) => {
        if (this.filterActiveOption === 'companyName') indexOf(user.company.name, this.filterLine) && acc.push(user);
        else if (user[this.filterActiveOption]) {
          if (indexOf(user[this.filterActiveOption], this.filterLine)) acc.push(user);
        } else if (user.address[this.filterActiveOption]) {
          if (indexOf(user.address[this.filterActiveOption], this.filterLine)) acc.push(user);
        } else {
          if (indexOf(user.name, this.filterLine)) acc.push(user);
        }
        return acc;
      }, []);
    }
  },
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      const {getAll} = useJsonPlaceholder('/users');
      const data = await getAll();
      if (!data) return;
      setTimeout(() => {
        this.users = data;
        this.isLoading = false;
      }, 1500);
    }
  }
});
