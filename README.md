#Twitter Feed

A twitter feed using jQuery and the Twitter API

##How it works
Include the twitter.js, then set it up using the following.

```javascript
//setup twitter feed
var twitterFeed = new TwitterFeed();

//pass the element to draw the tweets in
twitterFeed.setTwitterElement($(".tweets"));

//set the user
twitterFeed.setUser("walking_fishy");

//set number of tweets
twitterFeed.setTweetCount(5);

//include or exclude replies
//twitterFeed.includeReplies();
twitterFeed.excludeReplies();

//include or exclude retweets
//twitterFeed.includeRetweets();
twitterFeed.excludeRetweets();

//getTweets
twitterFeed.getTweets();
```

[View it in action here](http://martinblackburn.github.com/twitter-feed/)

###Notes
This was written using jQuery 1.8.2