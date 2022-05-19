import { QueryCache, QueryClient } from 'react-query';

const RETRY_DELAY = 1000;
const STALE_TIME = 60_000;
const RETRY_TIMES = 1;

export const useQueryClientConfig = () => {
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			//TODO: global error handling
		}),
		defaultOptions: {
			queries: {
				retry: RETRY_TIMES,
				retryDelay: RETRY_DELAY,
				staleTime: STALE_TIME,
			},
		},
	});
	return { queryClient };
};
