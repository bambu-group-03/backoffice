export const BASE_TEST_URL = "http://localhost:8000/api/auth/";

export const BASE_REAL_URL = 'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/';
export const BASE_INTERACTION_URL = 'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/interactions/';


export const IDENTITY_FILTER = "https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/filter/";

export const DEFAULT_IMG_LINK = "https://robohash.org/hicveldicta.png"

// Other userfull URL
//const url =  'https://jsonplaceholder.typicode.com/users';
export const DUMMY_URL = "https://dummyjson.com/users";

export const BASE_TESTS_TWEETS_URL = "http://localhost:8000/api/tweets/";

export const BASE_TWEET_URL = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/"
export const BASE_TWEET_VISIBILITY = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/"

/////////////////// Statistics //////////////////////
export const BASE_USER_STATS_URL = "https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/metrics";
export const BASE_SNAP_STATS_URL = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/snaps/stats";
export const BASE_SNAP_METRICS_URL = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/metrics";

// User URLs
export const URL_USER_STATS =  BASE_USER_STATS_URL + "/get_user_rates" ;
export const URL_LOCATILY_STATS = BASE_USER_STATS_URL + "/get_ubication_count" ;
export const URL_LOGIN_STATS = BASE_USER_STATS_URL + "/get_log_in_rates";
export const URL_SIGNUP_STATS = BASE_USER_STATS_URL + "/get_sign_up_rates";
export const URL_USERS_PER_MONTH = BASE_USER_STATS_URL + "/get_user_by_month_count";

// Snap URLs
export const URL_SNAP_STATS = BASE_SNAP_METRICS_URL + "/get_snap_rates"; 
export const URL_SNAPS_PER_MONTH = BASE_SNAP_STATS_URL + "/frequency/daily/number_of_points/4";