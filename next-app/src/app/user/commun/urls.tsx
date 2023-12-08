export const BASE_TEST_URL = "http://localhost:8000/api/auth/";

export const BASE_REAL_URL = '/api/auth/';
export const BASE_INTERACTION_URL = '/api/interactions/';


export const IDENTITY_FILTER = "/api/filter/admin/";
export const SNAP_FILTER = "/api/filter/admin/";

export const DEFAULT_IMG_LINK = "https://robohash.org/hicveldicta.png"

// Other userfull URL
//const url =  'https://jsonplaceholder.typicode.com/users';
export const DUMMY_URL = "https://dummyjson.com/users";

export const BASE_TESTS_TWEETS_URL = "http://localhost:8000/api/tweets/";

export const BASE_TWEET_URL = "/api/feed/"
export const BASE_TWEET_VISIBILITY = "/api/interactions/"

/////////////////// Statistics //////////////////////
export const BASE_USER_STATS_URL = "/api/metrics/";
export const BASE_SNAP_STATS_URL = "/api/feed/snaps/stats/";
export const BASE_SNAP_METRICS_URL = "/api/metrics/";

// User URLs
export const URL_USER_STATS =  BASE_USER_STATS_URL + "get_user_rates" ;
export const URL_LOCATILY_STATS = BASE_USER_STATS_URL + "get_ubication_count" ;
export const URL_LOGIN_STATS = BASE_USER_STATS_URL + "get_log_in_rates";
export const URL_SIGNUP_STATS = BASE_USER_STATS_URL + "get_sign_up_rates";
export const URL_USERS_PER_MONTH = BASE_USER_STATS_URL + "get_user_by_month_count";
export const URL_RESET_PASSWORD_STATS = BASE_USER_STATS_URL + "get_reset_password_rates";

// Snap URLs
export const URL_SNAP_STATS = BASE_SNAP_METRICS_URL + "get_snap_rates"; 
export const URL_SNAPS_PER_MONTH = BASE_SNAP_STATS_URL + "monthly_frequency";


// Certificate
export const URL_CERTIFICATE_BASE = "/api/certified_request/"