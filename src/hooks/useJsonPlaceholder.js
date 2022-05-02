import JsonPlaceholderService from '@/services/JsonPlaceholder.service';

export const useJsonPlaceholder = (url) => {
	const service = new JsonPlaceholderService(url);
	return service;
};