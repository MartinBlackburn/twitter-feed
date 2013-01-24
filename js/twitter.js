TwitterFeed = function() 
{   
    //variables
    var user = "walking_fishy";
    var tweetCount = 3;
    var excludeReplies = false;
    var includeRetweets = false;
    var twitterContainer;
    
    //set user
    TwitterFeed.prototype.setUser = function(value)
    {
        user = value;
    }
    
    
    //set number of tweets
    TwitterFeed.prototype.setTweetCount = function(value)
    {
        tweetCount = value;
    }
    
    
    //set exclude replies or not
    TwitterFeed.prototype.excludeReplies = function()
    {
        excludeReplies = true;
    }
    TwitterFeed.prototype.includeReplies = function()
    {
        excludeReplies = false;
    }
    
    
    //set include retweets or not
    TwitterFeed.prototype.includeRetweets = function()
    {
        includeRetweets = true;
    }
    TwitterFeed.prototype.excludeRetweets = function()
    {
        includeRetweets = false;
    }
    
    
    //set element to draw tweets into
    TwitterFeed.prototype.setTwitterElement = function(element)
    {
        twitterContainer = element.get(0);
    }
    
    
    //Get tweets
    TwitterFeed.prototype.getTweets = function()
    {
        //if no map container, output an error
        if(!twitterContainer) 
        {  
            err("The twitter container needs setting.");
            return false;
        }
        
        //set request string
        var requestString = "https://api.twitter.com/1/statuses/user_timeline.json?" +
        "&screen_name=" + user + 
        "&count=" + tweetCount + 
        "&exclude_replies=" + excludeReplies + 
        "&include_rts=" + includeRetweets +
        "&callback=?";
        
        //get json
        $.ajax({
            url: requestString,
            dataType: 'json',
            async: true,
            success: function(data, textStatus, request) {
                buildTweetList(data);
            },
            error: function(request, status, error) {
                err("AJAX request failed");
                return false;
            },
        });
    }
    
    
    //formats tweets into a list, then adds it to the page
    function buildTweetList(data)  
    {  
        //make sure the container is empty
        $(twitterContainer).empty();
        
        //add UL to tweet container
        var tweetList = $('<ul/>').appendTo(twitterContainer);
        
        $.each(data, function(index, tweetObject)
        {   
            var tweetID = tweetObject.id_str;
            var time = relativeTime(tweetObject.created_at);
            var tweet = tweetObject.text;
            var username = tweetObject.user.screen_name;
            
            //format any links in the tweet
            tweet = tweet.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
                return '<a href="' + url + '">' + url + '</a>';
            });
                    
            //format any user to a link
            tweet = tweet.replace(/(^|\s)@(\w+)/ig, function(reply) {
                return reply.charAt(0) + '<a href="http://twitter.com/' + reply.substring(2) + '">' + reply.substring(1) + '</a>';
            });
            
            //format any hashtag to a link
            tweet = tweet.replace(/(^|\s)#(\w+)/ig, function(reply) {
                return reply.charAt(0) + '<a href="http://twitter.com/search?q=%23' + reply.substring(2) + '">' + reply.substring(1) + '</a>';
            });
            
            //add tweet to the list
            var tweetHTML = '<li><div class="tweet">' + tweet + '</div>' +
                            '<a class="time" href="http://twitter.com/' + username + '/status/' + tweetID + '">' + time + '</a></li>';
            $(tweetHTML).appendTo(tweetList);
        });
    }
    
    
    //get relative time
    function relativeTime(time_value) 
    {
        var values = time_value.split(" ");
        time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
        var parsed_date = Date.parse(time_value);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        delta = delta + (relative_to.getTimezoneOffset() * 60);
    
        if (delta < 60) {
            return 'less than a minute ago';
        } else if(delta < 120) {
            return 'about a minute ago';
        } else if(delta < (60*60)) {
            return (parseInt(delta / 60)).toString() + ' minutes ago';
        } else if(delta < (120*60)) {
            return 'about an hour ago';
        } else if(delta < (24*60*60)) {
            return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
        } else if(delta < (48*60*60)) {
            return '1 day ago';
        } else {
            return (parseInt(delta / 86400)).toString() + ' days ago';
        }
    }
    
    
    //output an error to the console
    function err(message)  
    {  
        var err = new Error();  
        err.name = "Twitter Feed"; 
        err.message = message;  
        throw(err);  
    } 
};