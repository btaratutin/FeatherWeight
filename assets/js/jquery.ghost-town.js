/*!
 * @package jquery.ghostTown
 * @version 0.1.0
 * @Copyright (C) 2014 Kris Van Houten (krivaten@gmail.com)
 * @License MIT
 */
;(function($) {

    defaults = {
        feed: '/rss',
        limit: 0,
        content: function(post) {
            return '<li><a href="' + post.url + '""><strong>' + post.title + '</strong><br /><img src="' + post.img + '"/><br /><small>' + post.pubDate + '</small></a></li>';
        }
    }

    // Set up necessary element and properties
    function GhostTown(element, options) {
        // Empty element and get tag name
        this.tag = $(element).empty().data('tag');

        // Set element
        this.element = element;

        // Establish options
        this.options = $.extend({}, defaults, options);

        // Go get the RSS feed of the specified tag
        this.fetchTagRss();
    };

    // Render tag contents
    GhostTown.prototype.displayTagContents = function(posts) {
        var self = this,
            limit = self.options.limit,
            liClass = self.options.liClass,
            aClass = self.options.aClass,
            content = self.options.content,
            count = 0;

        // Append posts to element
        posts.forEach(function(post) {
            if (!limit || count < self.options.limit) {
                $(self.element).append($(content(post)));
            }
            count++;
        });

        // Notify if no posts present
        if (count == 0) {
            $(this.element).append($('<li class="' + liClass + '">No posts found with tag: <strong>' +  this.tag + '</strong></li>'));
        }
    };

    // Go get the RSS feed of the specified tag
    GhostTown.prototype.fetchTagRss = function() {
        var feeds = [],
            self = this;

        $.ajax({
            url: '/tag/' + this.tag + this.options.feed,
            type: 'GET'
        })
        .done(function(data, textStatus, xhr) {
            var posts;

            // Collect posts
            posts = self.extractPosts(new Array(data));
            
            console.log("posts: ", posts);

            // Render tag contents
//            self.displayTagContents(posts);
        })
        .fail(function(error) {
            $(self.element).append($('<li class="' + self.options.liClass + '">' + error.statusText + '</li>'));
        });
    };
    
    

    // Extract posts from RSS feed
    GhostTown.prototype.extractPosts = function(feeds) {
        var posts = [], items = [], self = this;

        feeds.forEach(function(feed) {
            items = $.merge(items, $(feed).find('item'));
        });

        for (var i = 0; i < items.length; i++) {
            var item = $(items[i]);

            // Extract necessary properties
            if (item.find('title').text()) {
                
                
                var post_url = item.find('link').text();
                
                console.log("found post_url: ", post_url);
                console.log('self1: ', self);
                
//                var img = '';
//                
//                posts.push({
//                        title: item.find('title').text(),
//                        url: post_url,
//                        pubDate: item.find('pubDate').text(),
//                        img: img
//                    });
                
                $.ajax({
                    url: post_url,
                    type: 'GET'
                })
                .done(function(data, textStatus, xhr) {
                    var posts = [];
                    var img;
                    var response = jQuery(data);
                    var img_obj = jQuery(response.find('img')[0]);
                    img = img_obj.attr('src');
                    console.log(img);

                    // Collect posts
//                    img = jQuery(response.find('img')[0]).attr('src');

//                    console.log(img);
                    
                    posts.push({
                        title: item.find('title').text(),
                        url: post_url,
                        pubDate: item.find('pubDate').text(),
                        img: img
                    });
                    
                    console.log('self: ', self);
                    self.displayTagContents(posts);

                    // Render tag contents
//                    self.displayTagContents(posts);
                });
                
                
            }
        }

        return posts;
    };

    // Instantiate ghostTown
    $.fn.ghostTown = function(options) {
        return this.each(function() {
            new GhostTown(this, options);
        });
    };


})(jQuery);


//(function(e){function t(t,n){this.tag=e(t).empty().data("tag");this.element=t;this.options=e.extend({},defaults,n);this.fetchTagRss()}defaults={feed:"/rss",liClass:"",aClass:"",limit:0,content:function(e){return"<strong>"+e.title+"</strong><br /><small>"+e.pubDate+"</small>"}};t.prototype.displayTagContents=function(t){var n=this,r=n.options.limit,i=n.options.liClass,s=n.options.aClass,o=n.options.content,u=0;t.forEach(function(t){if(!r||u<n.options.limit){e(n.element).append(e('<li class="'+i+'"><a class="'+s+'" href="'+t.url+'">'+o(t)+"</a></li>"))}u++});if(u==0){e(this.element).append(e('<li class="'+i+'">No posts found with tag: <strong>'+this.tag+"</strong></li>"))}};t.prototype.fetchTagRss=function(){var t=[],n=this;e.ajax({url:"/tag/"+this.tag+this.options.feed,type:"GET"}).done(function(e,t,r){var i;i=n.extractPosts(new Array(e));n.displayTagContents(i)}).fail(function(t){e(n.element).append(e('<li class="'+n.options.liClass+'">'+t.statusText+"</li>"))})};t.prototype.extractPosts=function(t){var n=[],r=[];t.forEach(function(t){r=e.merge(r,e(t).find("item"))});for(var i=0;i<r.length;i++){var s=e(r[i]);if(s.find("title").text()){n.push({title:s.find("title").text(),url:s.find("link").text(),pubDate:s.find("pubDate").text()})}}return n};e.fn.ghostTown=function(e){return this.each(function(){new t(this,e)})}})(jQuery)
