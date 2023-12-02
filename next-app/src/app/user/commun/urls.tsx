export const BASE_TEST_URL = "http://localhost:8000/api/auth/";

export const BASE_REAL_URL = 'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/';

export const IDENTITY_FILTER = "https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/filter/";

export const DEFAULT_IMG_LINK = "https://robohash.org/hicveldicta.png"
export const DEFAULT_NEW_ADMIN_IMG_LINK = "https://www.wallpaperup.com/uploads/wallpapers/2014/06/05/364432/39372972d5deb4cdbab6ef65380cb54f.jpg"

// Other userfull URL
//const url =  'https://jsonplaceholder.typicode.com/users';
export const DUMMY_URL = "https://dummyjson.com/users";

export const BASE_TESTS_TWEETS_URL = "http://localhost:8000/api/tweets/";

export const BASE_TWEET_URL = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/"
export const BASE_TWEET_VISIBILITY = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/interactions/"

/////////////////// Statistics //////////////////////
export const BASE_USER_STATS_URL = "https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/metrics";
export const BASE_SNAP_STATS_URL = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/snaps/stats";

// User URLs
export const URL_USER_STATS =  BASE_USER_STATS_URL + "/get_user_rates" ;
export const URL_LOCATILY_STATS = BASE_USER_STATS_URL + "/get_ubication_count" ;
export const URL_LOGIN_STATS = BASE_USER_STATS_URL + "/get_log_in_rates";
export const URL_SIGNUP_STATS = BASE_USER_STATS_URL + "/get_sign_up_rates";
export const URL_USERS_PER_MONTH = BASE_USER_STATS_URL + "/"; // To Do

// Snap URLs
export const URL_SNAP_STATS = BASE_SNAP_STATS_URL + "/"; // To Do