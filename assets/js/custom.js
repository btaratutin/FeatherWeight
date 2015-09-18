
console.log("custom js works");

function pastelColors(){
    var r = (Math.round(Math.random()* 170) + 30).toString(16);
    var g = (Math.round(Math.random()* 170) + 30).toString(16);
    var b = (Math.round(Math.random()* 170) + 30).toString(16);
    return '#' + r + g + b;
}


var $ = jQuery;

/*
    don't let the fixed nav. conflict with the header
*/
function checkNavHeaderConflict(window_pos) {
    var header_height = jQuery('#site-head').outerHeight(true); // ~70px
    var diff = Math.max(0, (header_height - window_pos)); // Calculate difference between the header height and the window pos
    
    // conflict only possible if we're scrolling around the header
    if (window_pos < header_height) {
        jQuery('.fixed-nav').css({top: diff + 40}); // If chance of conflict, add difference to header base height
    } else {
        jQuery('.fixed-nav').css('top', '40px');
    }
}


$(document).ready(function(){
    
    $('c').each(function() {
        $(this).css({color: pastelColors()});
    });
    
    
});



function buildNav(selector) {
    
    selector = '.content ' + selector;
    console.log("selector: " + selector);
    var i = 1;
    $(selector).each(function () {
        console.log("This a selector: ", this);
			var t = $(this).text();
			var index = $(this).parents(selector).index();
			$('.fixed-nav').append("<a class='fn-item' item_index='"+i+"'>"+t+"</a>")
            $(this).addClass(' index-' + i);
            
            console.log($('.fixed-nav'));
//			$(this).parents('article').attr('id',t.toLowerCase().split(' ').join('-'));
        
			$('.fn-item').click(function () {
				var i = $(this).attr('item_index');
				//var s = $(selector + "[item_index='"+i+"']");
                var s = $('.index-' + i);
//                console.log(s);
//                console.log(s.offset());

				$('html, body').animate({
					scrollTop: s.offset().top
				}, 400);

			});
        
            i += 1;
		});
}