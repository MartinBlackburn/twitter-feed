#Twitter Feed

### This will no longer work as of 11th June 2013 due to Twitter updating their API.
Please see this [post on my website](http://www.martinblackburn.co.uk/blog/creating-a-custom-twitter-feed.html) for an alternative solution.

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

If you exclude retweets and replies you may get less then the number you specified

###Notes
This was written using jQuery 1.8.2
