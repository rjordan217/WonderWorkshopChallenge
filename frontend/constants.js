export const OAUTH_URI = "https://oauth.reddit.com";
export const ALL_MY_SUBSCRIPS = "/subreddits/mine/subscriber";
// export const SEARCH_SUBS = "/api/search_subreddits";
export const SEARCH_PATH = "/search";
export const USER_PATH = "/api/v1/me"
export const ACCESS_TOKEN_URI = "https://www.reddit.com/api/v1/access_token";
export const REFRESH_TOKEN_URI = "https://www.reddit.com/api/v1/access_token";
export const REVOKE_TOKEN_URI = "https://www.reddit.com/api/v1/revoke_token";
export const APP_SCOPE = "identity mysubreddits read subscribe";
export const CLIENT_ID = "CtDAr5_MfgZqAg";
export const REDIRECT_URI = "http://localhost:8080";

// REDIRECT_URI: "https://rjordan217.github.io/coding_challenges/reddit_integrator.html"
// GET [/r/subreddit]/search
// after:	fullname of a thing
// before:	fullname of a thing
// count:	a positive integer (default: 0)
// include_facets:	boolean value
// limit:	the maximum number of items desired (default: 25, maximum: 100)
// q:	a string no longer than 512 characters
// restrict_sr:	boolean value
// show:	(optional) the string all
// sort:	one of (relevance, hot, top, new, comments)
// sr_detail:	(optional) expand subreddits
// syntax:	one of (cloudsearch, lucene, plain)
// t:	one of (hour, day, week, month, year, all)
// type:	(optional) comma-delimited list of result types (sr, link, user)
