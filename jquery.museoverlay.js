/*
 Copyright 2011-2017 Adobe Systems Incorporated. All Rights Reserved.
*/
(function(c){"function"===typeof define&&define.amd&&define.amd.jQuery?define(["jquery","museutils"],c):c(jQuery)})(function(c){c.fn.museOverlay=function(b){var d=c.extend({autoOpen:!0,offsetLeft:0,offsetTop:0,$overlaySlice:c(),$slides:c(),$overlayWedge:c(),duration:300,overlayExtraWidth:0,overlayExtraHeight:0,$elasticContent:c()},b);return this.each(function(){var a=c(this).data("museOverlay");if(a&&a[b]!==void 0)return a[b].apply(this,Array.prototype.slice.call(arguments,1));var a=d.slideshow.options.isResponsive,
f=(d.slideshow.options.slideClassName=="Container"||d.slideshow.options.slideClassName=="SSSlide")&&a,h=c("body"),g=c("<div/>").appendTo(h).css({position:"fixed",top:0,left:0,zIndex:100001}).hide(),j=c("<div/>").append(d.$overlaySlice).appendTo(g).css({position:"absolute",top:0,left:0});c(this).css({position:"absolute",left:0,top:0,outline:"none"}).attr({role:"dialog",tabindex:"0"});Muse.Utils.appendChildren(g,c(this));var k=c(this);a&&(Muse.Utils.moveElementsOutsideViewport(d.slideshow.$element.parents()),
k.css({width:d.slideshow.$element.width()+"px"}),Muse.Utils.moveElementsInsideViewport(d.slideshow.$element.parents()));var l=g.siblings("div"),i=c(window),m,n,q=null,a=g.find("a, button, [tabindex], input, textarea, [contenteditable]"),o=a[0],p=a[a.length-1],r=d.$elasticContent,s=r.length?parseInt(r.css("padding-left"))+parseInt(r.css("padding-right"))+parseInt(r.css("border-left-width"))+parseInt(r.css("border-right-width")):0,w=r.length?parseInt(r.css("padding-top"))+parseInt(r.css("padding-bottom"))+
parseInt(r.css("border-top-width"))+parseInt(r.css("border-bottom-width")):0,y=d.$overlaySlice.outerWidth(),u=d.$overlaySlice.outerHeight(),t={isOpen:!1,reuseAcrossBPs:function(){d.reuseAcrossBPs=!0},handleClose:function(){t.close()},open:function(){if(!t.isOpen){if(!d.reuseAcrossBPs&&d.slideshow.$bp){if(!d.slideshow.$bp.hasClass("active"))return;d.slideshow.breakpoint.swapPlaceholderNodesRecursively(g);d.slideshow.breakpoint.activateIDs(g);c(window).trigger("lightboxresize")}Muse.Utils.showWidgetsWhenReady(g);
m=i.width();n=i.height();t.positionContent(m,n);g.show();j.css({opacity:0}).stop(!0);k.css({opacity:0}).stop(!0);l.attr("aria-hidden","true");window.setTimeout(function(){j.bind("click",t.handleClose)},300);j.animate({opacity:0.99},{queue:!1,duration:d.duration,complete:function(){j.css({opacity:""});k.animate({opacity:1},{queue:!1,duration:d.duration,complete:function(){k.css({opacity:""});t.applyPageDimensions();window.setTimeout(function(){k[0].focus()},void 0)}})}});c(document).bind("keydown",
t.onKeyDown);t.doLayout(m,n);t.isOpen=!0;i.bind("resize",t.onWindowResize);c("body").bind("muse_bp_deactivate",t.onBreakpointChange);t.onWindowResize(null,!0)}},close:function(a){j.unbind("click",t.handleClose);i.unbind("resize",t.onWindowResize);c("body").unbind("muse_bp_deactivate",t.onBreakpointChange);c(document).unbind("keydown",t.onKeyDown);if(d.onClose)d.onClose();j.css({opacity:0.99}).stop(!0);k.css({opacity:0.99}).stop(!0);k.animate({opacity:0},{queue:!1,duration:a?0:d.duration,complete:function(){j.animate({opacity:0},
{queue:!1,duration:a?0:d.duration,complete:function(){g.hide();k.css({opacity:""});j.css({opacity:""});l.removeAttr("aria-hidden")}})}});t.isOpen=!1},next:function(){if(d.onNext)d.onNext()},previous:function(){if(d.onPrevious)d.onPrevious()},focusTrap:function(a){a.keyCode===9&&(a.shiftKey?a.target===o&&p.focus():a.target===p&&o.focus())},onBreakpointChange:function(){t.close(!0)},onKeyDown:function(a){switch(a.which||a.keyCode){case 37:case 38:k.is(":focus")&&t.previous();break;case 39:case 41:k.is(":focus")&&
t.next();break;case 27:t.close()}t.focusTrap(a)},onWindowResize:function(a,b){var c=i.width(),d=i.height();(b||m!=c||n!=d)&&q==null&&(q=setTimeout(function(){m=i.width();n=i.height();t.doLayout(m,n);t.positionContent(m,n);q=null},10))},doLayout:function(a,b){g.css({width:0,height:0});d.$overlayWedge.css({width:0,height:0});var c=a-s,f=b-w;r.length&&r.hasClass("fullwidth")&&(r.width(c),d.resizeSlidesFn&&d.resizeSlidesFn(c,f));t.applyPageDimensions();Muse.Utils.updateSlideshow_fstpOffsetSize(d.slideshow)},
applyPageDimensions:function(){function a(){var b=document.createElement("div");b.style.overflow="scroll";b.style.visibility="hidden";b.style.position="absolute";b.style.width="100px";b.style.height="100px";document.body.appendChild(b);var c=b.offsetWidth-b.clientWidth;document.body.removeChild(b);return{width:c}}var b=c(document),h=b.width(),i=b.height(),b=k[0],j=c(b).find("."+d.slideshow.options.viewClassName),j=c(j[0]),l=document.documentElement||document.body;l.clientWidth!=l.offsetWidth&&(h=
l.scrollWidth-1);l.clientHeight!=l.offsetHeight&&i<l.scrollHeight&&(i=l.scrollHeight-1);g.css({width:h,height:i});d.$overlayWedge.css({width:h-y,height:i-u});f||k.css("height","");Muse.Utils.moveElementsOutsideViewport(d.slideshow.slides.$element);Muse.Utils.resizeImages(k,d.slideshow.$element.attr("id"));Muse.Utils.adjustTargetAndSlideHeights(j,d.slideshow.options.contentLayout_runtime);d.slideshow.options.elastic!="fullScreen"&&(h=j.closest(".popup_anchor"),i=c(h.children()[0]),h.height(i.outerHeight()));
Muse.Utils.moveElementsInsideViewport(d.slideshow.slides.$element);h=k.css("width");f?(Muse.Utils.moveElementsOutsideViewport(d.slideshow.$element.parents()),k.css("width",d.slideshow.$element.width()+"px"),Muse.Utils.moveElementsInsideViewport(d.slideshow.$element.parents())):(k.css("width",d.slideshow.$element.width()+"px"),k.css("height",d.slideshow.$element.height()+"px"));var i=d.$elasticContent,o,p;d.slideshow.options.contentLayout_runtime=="lightbox"&&i.length&&i.hasClass("fullwidth")&&(o=
i.length?parseInt(i.css("padding-left"))+parseInt(i.css("padding-right"))+parseInt(i.css("border-left-width"))+parseInt(i.css("border-right-width")):0,p=i.length?parseInt(i.css("padding-top"))+parseInt(i.css("padding-bottom"))+parseInt(i.css("border-top-width"))+parseInt(i.css("border-bottom-width")):0,o=c(window).width()-o,p=c(window).height()-p);d.slideshow.$clip&&c(d.slideshow.$clip[0]).height(d.slideshow.slides.$element.outerHeight()+"px");d.slideshow.$view&&d.slideshow.$view.height(d.slideshow.slides.$element.outerHeight()+
"px");d.slideshow._fstpPositionSlides&&(d.slideshow.options.contentLayout_runtime=="lightbox"&&i.length&&i.hasClass("fullwidth")?d.slideshow._fstpPositionSlides(o,p):d.slideshow._fstpPositionSlides());o=d.slideshow.options.isResponsive;b=c(c(b).find("."+d.slideshow.options.viewClassName)[0]);if(b.length)o?(b.attr("data-slidewidth"),p=c(k[0]).width()*parseFloat(b.attr("data-slidewidth"))/100):p=d.slideshow.slides.$element.outerWidth(),i=d.slideshow.slides.$element.outerHeight(),d.slideshow.options&&
d.slideshow.options.transitionStyle&&d.slideshow.options.transitionStyle!=="vertical"&&i&&i>c(window).height()?(i=a(),o=o?(p+i.width)/c(k[0]).width()*100+"%":p+i.width+"px",b.width(o),b.parent().hasClass("wp-slideshow-clip")?b.parent().css({maxHeight:"100vh",overflowY:"auto"}):b.css({maxHeight:"100vh",overflowY:"auto"})):o?b.width(p/c(k[0]).width()*100+"%"):b.width=p+"px";h!=k.css("width")&&(c(window).trigger("lightboxresize"),t.doLayout(m,n),t.positionContent(m,n))},positionContent:function(a,b){var g=
0,h=0;d.slideshow.options.isResponsive?(h=d.$slides.filter(".wp-panel-active"),f&&h!==void 0&&h.length>0?(g=-(d.$slides.outerWidth()/2+(h.offset().left-k.offset().left)),h=-(d.$slides.outerHeight()/2+(h.offset().top-k.offset().top))):(g=-k.outerWidth()/2,h=-k.outerHeight()/2)):(g=-d.$slides.outerWidth()/2,h=-d.$slides.outerHeight()/2);g=Math.max(0,a/2+g);h=Math.max(0,b/2+h);d.$slides.outerHeight()>b&&(h=0);k.css({top:h,left:g});r.length&&r.hasClass("fullwidth")&&r.css("left",-g);g=a-s;h=b-w;if(r.length){r.width(g);
r.hasClass("fullscreen")&&r.height(h);if(d.slideshow.options.contentLayout_runtime==="lightbox"&&d.slideshow.options.elastic==="fullScreen"&&!d.slideshow.options.isResponsive){var i=c(k[0]).find("."+d.slideshow.options.viewClassName),i=c(i[0]);Muse.Utils.adjustTargetAndSlideHeights(i,d.slideshow.options.contentLayout_runtime)}d.resizeSlidesFn&&d.resizeSlidesFn(g,h)}}};k.data("museOverlay",t);d.autoShow&&t.open()})}});
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var c=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery.museoverlay.js");if(-1!=c){Muse.assets.required.splice(c,1);for(var c=document.getElementsByTagName("meta"),b=0,d=c.length;b<d;b++){var a=c[b];if("generator"==a.getAttribute("name")){"2018.1.1.386"!=a.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.museoverlay.js");break}}}}})();
