/** layui-v2.3.0-rc1-lmf-1.1.0 MIT License By https://www.layui.com */
 ;layui.define("jquery",function(e){"use strict";var o=layui.$,a=layui.hint(),i="layui-tree-enter",r=function(e){this.options=e},t={arrow:["&#xe623;","&#xe625;"],checkbox:["&#xe626;","&#xe627;"],radio:["&#xe62b;","&#xe62a;"],branch:["&#xe622;","&#xe624;"],leaf:"&#xe621;"};r.prototype.init=function(e){var o=this;e.addClass("layui-box layui-tree"),o.options.skin&&e.addClass("layui-tree-skin-"+o.options.skin),o.tree(e),o.on(e)},r.prototype.tree=function(e,a){var i=this,r=i.options,n=a||r.nodes;layui.each(n,function(a,n){var l=n.children&&n.children.length>0,c=o('<ul class="'+(n.spread?"layui-show":"")+'"></ul>'),s=o(["<li "+(n.spread?'data-spread="'+n.spread+'"':"")+">",function(){return l?'<i class="layui-icon layui-tree-spread">'+(n.spread?t.arrow[1]:t.arrow[0])+"</i>":""}(),function(){return r.check?'<i class="layui-icon layui-tree-check">'+("checkbox"===r.check?t.checkbox[0]:"radio"===r.check?t.radio[0]:"")+"</i>":""}(),function(){return'<a href="'+(n.href||"javascript:;")+'" '+(r.target&&n.href?'target="'+r.target+'"':"")+">"+('<i class="layui-icon layui-tree-'+(l?"branch":"leaf")+'">'+(l?n.spread?t.branch[1]:t.branch[0]:t.leaf)+"</i>")+("<cite>"+(n.name||"未命名")+"</cite></a>")}(),"</li>"].join(""));l&&(s.append(c),i.tree(c,n.children)),e.append(s),"function"==typeof r.click&&i.click(s,n),i.spread(s,n),r.drag&&i.drag(s,n)})},r.prototype.click=function(e,o){var a=this,i=a.options;e.children("a").on("click",function(e){layui.stope(e),i.click(o)})},r.prototype.spread=function(e,o){var a=this,i=(a.options,e.children(".layui-tree-spread")),r=e.children("ul"),n=e.children("a"),l=function(){e.data("spread")?(e.data("spread",null),r.removeClass("layui-show"),i.html(t.arrow[0]),n.find(".layui-icon").html(t.branch[0])):(e.data("spread",!0),r.addClass("layui-show"),i.html(t.arrow[1]),n.find(".layui-icon").html(t.branch[1]))};r[0]&&(i.on("click",l),n.on("dblclick",l))},r.prototype.on=function(e){var a=this,r=a.options,t="layui-tree-drag";e.find("i").on("selectstart",function(e){return!1}),r.drag&&o(document).on("mousemove",function(e){var i=a.move;if(i.from){var r=(i.to,o('<div class="layui-box '+t+'"></div>'));e.preventDefault(),o("."+t)[0]||o("body").append(r);var n=o("."+t)[0]?o("."+t):r;n.addClass("layui-show").html(i.from.elem.children("a").html()),n.css({left:e.pageX+10,top:e.pageY+10})}}).on("mouseup",function(){var e=a.move;e.from&&(e.from.elem.children("a").removeClass(i),e.to&&e.to.elem.children("a").removeClass(i),a.move={},o("."+t).remove())})},r.prototype.move={},r.prototype.drag=function(e,a){var r=this,t=(r.options,e.children("a")),n=function(){var t=o(this),n=r.move;n.from&&(n.to={item:a,elem:e},t.addClass(i))};t.on("mousedown",function(){var o=r.move;o.from={item:a,elem:e}}),t.on("mouseenter",n).on("mousemove",n).on("mouseleave",function(){var e=o(this),a=r.move;a.from&&(delete a.to,e.removeClass(i))})},e("tree",function(e){var i=new r(e=e||{}),t=o(e.elem);return t[0]?void i.init(t):a.error("layui.tree 没有找到"+e.elem+"元素")})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxheS9tb2R1bGVzL3RyZWUuanMiXSwibmFtZXMiOlsibGF5dWkiLCJkZWZpbmUiLCJleHBvcnRzIiwiJCIsImhpbnQiLCJlbnRlclNraW4iLCJUcmVlIiwib3B0aW9ucyIsInRoaXMiLCJpY29uIiwiYXJyb3ciLCJjaGVja2JveCIsInJhZGlvIiwiYnJhbmNoIiwibGVhZiIsInByb3RvdHlwZSIsImluaXQiLCJlbGVtIiwidGhhdCIsImFkZENsYXNzIiwic2tpbiIsInRyZWUiLCJvbiIsImNoaWxkcmVuIiwibm9kZXMiLCJlYWNoIiwiaW5kZXgiLCJpdGVtIiwiaGFzQ2hpbGQiLCJsZW5ndGgiLCJ1bCIsInNwcmVhZCIsImxpIiwiY2hlY2siLCJocmVmIiwidGFyZ2V0IiwibmFtZSIsImpvaW4iLCJhcHBlbmQiLCJjbGljayIsImRyYWciLCJlIiwic3RvcGUiLCJhIiwib3BlbiIsImRhdGEiLCJyZW1vdmVDbGFzcyIsImh0bWwiLCJmaW5kIiwiZHJhZ1N0ciIsImRvY3VtZW50IiwibW92ZSIsImZyb20iLCJ0cmVlTW92ZSIsInRvIiwicHJldmVudERlZmF1bHQiLCJkcmFnRWxlbSIsImNzcyIsImxlZnQiLCJwYWdlWCIsInRvcCIsInBhZ2VZIiwicmVtb3ZlIiwibW91c2VlbnRlciIsIm90aGlzIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7RUFTQUEsTUFBTUMsT0FBTyxTQUFVLFNBQVNDLEdBQzlCLFlBRUEsSUFBSUMsR0FBSUgsTUFBTUcsRUFDYkMsRUFBT0osTUFBTUksT0FFVkMsRUFBWSxtQkFBb0JDLEVBQU8sU0FBU0MsR0FDbERDLEtBQUtELFFBQVVBLEdBSWJFLEdBQ0ZDLE9BQVEsV0FBWSxZQUNuQkMsVUFBVyxXQUFZLFlBQ3ZCQyxPQUFRLFdBQVksWUFDcEJDLFFBQVMsV0FBWSxZQUNyQkMsS0FBTSxXQUlUUixHQUFLUyxVQUFVQyxLQUFPLFNBQVNDLEdBQzdCLEdBQUlDLEdBQU9WLElBQ1hTLEdBQUtFLFNBQVMsd0JBQ1hELEVBQUtYLFFBQVFh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TFYsS0FBTUEsS0FHWDBCLEVBQUVyQixHQUFHLGFBQWN5QyxHQUFZekMsR0FBRyxZQUFheUMsR0FDOUN6QyxHQUFHLGFBQWMsV0FDaEIsR0FBSTBDLEdBQVE3RCxFQUFFSyxNQUFPMkMsRUFBT2pDLEVBQUtpQyxJQUM5QkEsR0FBS0MsYUFDQ0QsR0FBS0csR0FDWlUsRUFBTWxCLFlBQVl6QyxPQU14QkgsRUFBUSxPQUFRLFNBQVNLLEdBQ3ZCLEdBQUljLEdBQU8sR0FBSWYsR0FBS0MsRUFBVUEsT0FDMUJVLEVBQU9kLEVBQUVJLEVBQVFVLEtBQ3JCLE9BQUlBLEdBQUssT0FHVEksR0FBS0wsS0FBS0MsR0FGRGIsRUFBSzZELE1BQU0sa0JBQW1CMUQsRUFBUVUsS0FBTSIsImZpbGUiOiJsYXkvbW9kdWxlcy90cmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG5cbiBATmFtZe+8mmxheXVpLnRyZWUg5qCR57uE5Lu2XG4gQEF1dGhvcu+8mui0pOW/g1xuIEBMaWNlbnNl77yaTUlUXG4gICAgXG4gKi9cbiBcbiBcbmxheXVpLmRlZmluZSgnanF1ZXJ5JywgZnVuY3Rpb24oZXhwb3J0cyl7XG4gIFwidXNlIHN0cmljdFwiO1xuICBcbiAgdmFyICQgPSBsYXl1aS4kXG4gICxoaW50ID0gbGF5dWkuaGludCgpO1xuICBcbiAgdmFyIGVudGVyU2tpbiA9ICdsYXl1aS10cmVlLWVudGVyJywgVHJlZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH07XG4gIFxuICAvL+Wbvuagh1xuICB2YXIgaWNvbiA9IHtcbiAgICBhcnJvdzogWycmI3hlNjIzOycsICcmI3hlNjI1OyddIC8v566t5aS0XG4gICAgLGNoZWNrYm94OiBbJyYjeGU2MjY7JywgJyYjeGU2Mjc7J10gLy/lpI3pgInmoYZcbiAgICAscmFkaW86IFsnJiN4ZTYyYjsnLCAnJiN4ZTYyYTsnXSAvL+WNlemAieahhlxuICAgICxicmFuY2g6IFsnJiN4ZTYyMjsnLCAnJiN4ZTYyNDsnXSAvL+eItuiKgueCuVxuICAgICxsZWFmOiAnJiN4ZTYyMTsnIC8v5Y+26IqC54K5XG4gIH07XG4gIFxuICAvL+WIneWni+WMllxuICBUcmVlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oZWxlbSl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGVsZW0uYWRkQ2xhc3MoJ2xheXVpLWJveCBsYXl1aS10cmVlJyk7IC8v5re75YqgdHJlZeagt+W8j1xuICAgIGlmKHRoYXQub3B0aW9ucy5za2luKXtcbiAgICAgIGVsZW0uYWRkQ2xhc3MoJ2xheXVpLXRyZWUtc2tpbi0nKyB0aGF0Lm9wdGlvbnMuc2tpbik7XG4gICAgfVxuICAgIHRoYXQudHJlZShlbGVtKTtcbiAgICB0aGF0Lm9uKGVsZW0pO1xuICB9O1xuICBcbiAgLy/moJHoioLngrnop6PmnpBcbiAgVHJlZS5wcm90b3R5cGUudHJlZSA9IGZ1bmN0aW9uKGVsZW0sIGNoaWxkcmVuKXtcbiAgICB2YXIgdGhhdCA9IHRoaXMsIG9wdGlvbnMgPSB0aGF0Lm9wdGlvbnNcbiAgICB2YXIgbm9kZXMgPSBjaGlsZHJlbiB8fCBvcHRpb25zLm5vZGVzO1xuICAgIFxuICAgIGxheXVpLmVhY2gobm9kZXMsIGZ1bmN0aW9uKGluZGV4LCBpdGVtKXtcbiAgICAgIHZhciBoYXNDaGlsZCA9IGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgICAgdmFyIHVsID0gJCgnPHVsIGNsYXNzPVwiJysgKGl0ZW0uc3ByZWFkID8gXCJsYXl1aS1zaG93XCIgOiBcIlwiKSArJ1wiPjwvdWw+Jyk7XG4gICAgICB2YXIgbGkgPSAkKFsnPGxpICcrIChpdGVtLnNwcmVhZCA/ICdkYXRhLXNwcmVhZD1cIicrIGl0ZW0uc3ByZWFkICsnXCInIDogJycpICsnPidcbiAgICAgICAgLy/lsZXlvIDnrq3lpLRcbiAgICAgICAgLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmV0dXJuIGhhc0NoaWxkID8gJzxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS10cmVlLXNwcmVhZFwiPicrIChcbiAgICAgICAgICAgIGl0ZW0uc3ByZWFkID8gaWNvbi5hcnJvd1sxXSA6IGljb24uYXJyb3dbMF1cbiAgICAgICAgICApICsnPC9pPicgOiAnJztcbiAgICAgICAgfSgpXG4gICAgICAgIFxuICAgICAgICAvL+WkjemAieahhi/ljZXpgInmoYZcbiAgICAgICAgLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuY2hlY2sgPyAoXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLXRyZWUtY2hlY2tcIj4nKyAoXG4gICAgICAgICAgICAgIG9wdGlvbnMuY2hlY2sgPT09ICdjaGVja2JveCcgPyBpY29uLmNoZWNrYm94WzBdIDogKFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2hlY2sgPT09ICdyYWRpbycgPyBpY29uLnJhZGlvWzBdIDogJydcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSArJzwvaT4nXG4gICAgICAgICAgKSA6ICcnO1xuICAgICAgICB9KClcbiAgICAgICAgXG4gICAgICAgIC8v6IqC54K5XG4gICAgICAgICxmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybiAnPGEgaHJlZj1cIicrIChpdGVtLmhyZWYgfHwgJ2phdmFzY3JpcHQ6OycpICsnXCIgJysgKFxuICAgICAgICAgICAgb3B0aW9ucy50YXJnZXQgJiYgaXRlbS5ocmVmID8gJ3RhcmdldD1cXFwiJysgb3B0aW9ucy50YXJnZXQgKydcXFwiJyA6ICcnXG4gICAgICAgICAgKSArJz4nXG4gICAgICAgICAgKyAoJzxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS10cmVlLScrIChoYXNDaGlsZCA/IFwiYnJhbmNoXCIgOiBcImxlYWZcIikgKydcIj4nKyAoXG4gICAgICAgICAgICBoYXNDaGlsZCA/IChcbiAgICAgICAgICAgICAgaXRlbS5zcHJlYWQgPyBpY29uLmJyYW5jaFsxXSA6IGljb24uYnJhbmNoWzBdXG4gICAgICAgICAgICApIDogaWNvbi5sZWFmXG4gICAgICAgICAgKSArJzwvaT4nKSAvL+iKgueCueWbvuagh1xuICAgICAgICAgICsgKCc8Y2l0ZT4nKyAoaXRlbS5uYW1lfHwn5pyq5ZG95ZCNJykgKyc8L2NpdGU+PC9hPicpO1xuICAgICAgICB9KClcbiAgICAgIFxuICAgICAgLCc8L2xpPiddLmpvaW4oJycpKTtcbiAgICAgIFxuICAgICAgLy/lpoLmnpzmnInlrZDoioLngrnvvIzliJnpgJLlvZLnu6fnu63nlJ/miJDmoJFcbiAgICAgIGlmKGhhc0NoaWxkKXtcbiAgICAgICAgbGkuYXBwZW5kKHVsKTtcbiAgICAgICAgdGhhdC50cmVlKHVsLCBpdGVtLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgZWxlbS5hcHBlbmQobGkpO1xuICAgICAgXG4gICAgICAvL+inpuWPkeeCueWHu+iKgueCueWbnuiwg1xuICAgICAgdHlwZW9mIG9wdGlvbnMuY2xpY2sgPT09ICdmdW5jdGlvbicgJiYgdGhhdC5jbGljayhsaSwgaXRlbSk7IFxuICAgICAgXG4gICAgICAvL+S8uOWxleiKgueCuVxuICAgICAgdGhhdC5zcHJlYWQobGksIGl0ZW0pO1xuICAgICAgXG4gICAgICAvL+aLluaLveiKgueCuVxuICAgICAgb3B0aW9ucy5kcmFnICYmIHRoYXQuZHJhZyhsaSwgaXRlbSk7IFxuICAgIH0pO1xuICB9O1xuICBcbiAgLy/ngrnlh7voioLngrnlm57osINcbiAgVHJlZS5wcm90b3R5cGUuY2xpY2sgPSBmdW5jdGlvbihlbGVtLCBpdGVtKXtcbiAgICB2YXIgdGhhdCA9IHRoaXMsIG9wdGlvbnMgPSB0aGF0Lm9wdGlvbnM7XG4gICAgZWxlbS5jaGlsZHJlbignYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgbGF5dWkuc3RvcGUoZSk7XG4gICAgICBvcHRpb25zLmNsaWNrKGl0ZW0pXG4gICAgfSk7XG4gIH07XG4gIFxuICAvL+S8uOWxleiKgueCuVxuICBUcmVlLnByb3RvdHlwZS5zcHJlYWQgPSBmdW5jdGlvbihlbGVtLCBpdGVtKXtcbiAgICB2YXIgdGhhdCA9IHRoaXMsIG9wdGlvbnMgPSB0aGF0Lm9wdGlvbnM7XG4gICAgdmFyIGFycm93ID0gZWxlbS5jaGlsZHJlbignLmxheXVpLXRyZWUtc3ByZWFkJylcbiAgICB2YXIgdWwgPSBlbGVtLmNoaWxkcmVuKCd1bCcpLCBhID0gZWxlbS5jaGlsZHJlbignYScpO1xuICAgIFxuICAgIC8v5omn6KGM5Ly45bGVXG4gICAgdmFyIG9wZW4gPSBmdW5jdGlvbigpe1xuICAgICAgaWYoZWxlbS5kYXRhKCdzcHJlYWQnKSl7XG4gICAgICAgIGVsZW0uZGF0YSgnc3ByZWFkJywgbnVsbClcbiAgICAgICAgdWwucmVtb3ZlQ2xhc3MoJ2xheXVpLXNob3cnKTtcbiAgICAgICAgYXJyb3cuaHRtbChpY29uLmFycm93WzBdKTtcbiAgICAgICAgYS5maW5kKCcubGF5dWktaWNvbicpLmh0bWwoaWNvbi5icmFuY2hbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbS5kYXRhKCdzcHJlYWQnLCB0cnVlKTtcbiAgICAgICAgdWwuYWRkQ2xhc3MoJ2xheXVpLXNob3cnKTtcbiAgICAgICAgYXJyb3cuaHRtbChpY29uLmFycm93WzFdKTtcbiAgICAgICAgYS5maW5kKCcubGF5dWktaWNvbicpLmh0bWwoaWNvbi5icmFuY2hbMV0pO1xuICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgLy/lpoLmnpzmsqHmnInlrZDoioLngrnvvIzliJnkuI3miafooYxcbiAgICBpZighdWxbMF0pIHJldHVybjtcbiAgICBcbiAgICBhcnJvdy5vbignY2xpY2snLCBvcGVuKTtcbiAgICBhLm9uKCdkYmxjbGljaycsIG9wZW4pO1xuICB9XG4gIFxuICAvL+mAmueUqOS6i+S7tlxuICBUcmVlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGVsZW0pe1xuICAgIHZhciB0aGF0ID0gdGhpcywgb3B0aW9ucyA9IHRoYXQub3B0aW9ucztcbiAgICB2YXIgZHJhZ1N0ciA9ICdsYXl1aS10cmVlLWRyYWcnO1xuICAgIFxuICAgIC8v5bGP6JS96YCJ5Lit5paH5a2XXG4gICAgZWxlbS5maW5kKCdpJykub24oJ3NlbGVjdHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9KTtcbiAgICBcbiAgICAvL+aLluaLvVxuICAgIGlmKG9wdGlvbnMuZHJhZyl7XG4gICAgICAkKGRvY3VtZW50KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBtb3ZlID0gdGhhdC5tb3ZlO1xuICAgICAgICBpZihtb3ZlLmZyb20pe1xuICAgICAgICAgIHZhciB0byA9IG1vdmUudG8sIHRyZWVNb3ZlID0gJCgnPGRpdiBjbGFzcz1cImxheXVpLWJveCAnKyBkcmFnU3RyICsnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICQoJy4nICsgZHJhZ1N0cilbMF0gfHwgJCgnYm9keScpLmFwcGVuZCh0cmVlTW92ZSk7XG4gICAgICAgICAgdmFyIGRyYWdFbGVtID0gJCgnLicgKyBkcmFnU3RyKVswXSA/ICQoJy4nICsgZHJhZ1N0cikgOiB0cmVlTW92ZTtcbiAgICAgICAgICAoZHJhZ0VsZW0pLmFkZENsYXNzKCdsYXl1aS1zaG93JykuaHRtbChtb3ZlLmZyb20uZWxlbS5jaGlsZHJlbignYScpLmh0bWwoKSk7XG4gICAgICAgICAgZHJhZ0VsZW0uY3NzKHtcbiAgICAgICAgICAgIGxlZnQ6IGUucGFnZVggKyAxMFxuICAgICAgICAgICAgLHRvcDogZS5wYWdlWSArIDEwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSkub24oJ21vdXNldXAnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbW92ZSA9IHRoYXQubW92ZTtcbiAgICAgICAgaWYobW92ZS5mcm9tKXtcbiAgICAgICAgICBtb3ZlLmZyb20uZWxlbS5jaGlsZHJlbignYScpLnJlbW92ZUNsYXNzKGVudGVyU2tpbik7XG4gICAgICAgICAgbW92ZS50byAmJiBtb3ZlLnRvLmVsZW0uY2hpbGRyZW4oJ2EnKS5yZW1vdmVDbGFzcyhlbnRlclNraW4pO1xuICAgICAgICAgIHRoYXQubW92ZSA9IHt9O1xuICAgICAgICAgICQoJy4nICsgZHJhZ1N0cikucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgICBcbiAgLy/mi5bmi73oioLngrlcbiAgVHJlZS5wcm90b3R5cGUubW92ZSA9IHt9O1xuICBUcmVlLnByb3RvdHlwZS5kcmFnID0gZnVuY3Rpb24oZWxlbSwgaXRlbSl7XG4gICAgdmFyIHRoYXQgPSB0aGlzLCBvcHRpb25zID0gdGhhdC5vcHRpb25zO1xuICAgIHZhciBhID0gZWxlbS5jaGlsZHJlbignYScpLCBtb3VzZWVudGVyID0gZnVuY3Rpb24oKXtcbiAgICAgIHZhciBvdGhpcyA9ICQodGhpcyksIG1vdmUgPSB0aGF0Lm1vdmU7XG4gICAgICBpZihtb3ZlLmZyb20pe1xuICAgICAgICBtb3ZlLnRvID0ge1xuICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAsZWxlbTogZWxlbVxuICAgICAgICB9O1xuICAgICAgICBvdGhpcy5hZGRDbGFzcyhlbnRlclNraW4pO1xuICAgICAgfVxuICAgIH07XG4gICAgYS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBtb3ZlID0gdGhhdC5tb3ZlXG4gICAgICBtb3ZlLmZyb20gPSB7XG4gICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgLGVsZW06IGVsZW1cbiAgICAgIH07XG4gICAgfSk7XG4gICAgYS5vbignbW91c2VlbnRlcicsIG1vdXNlZW50ZXIpLm9uKCdtb3VzZW1vdmUnLCBtb3VzZWVudGVyKVxuICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgb3RoaXMgPSAkKHRoaXMpLCBtb3ZlID0gdGhhdC5tb3ZlO1xuICAgICAgaWYobW92ZS5mcm9tKXtcbiAgICAgICAgZGVsZXRlIG1vdmUudG87XG4gICAgICAgIG90aGlzLnJlbW92ZUNsYXNzKGVudGVyU2tpbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIFxuICAvL+aatOmcsuaOpeWPo1xuICBleHBvcnRzKCd0cmVlJywgZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgdmFyIHRyZWUgPSBuZXcgVHJlZShvcHRpb25zID0gb3B0aW9ucyB8fCB7fSk7XG4gICAgdmFyIGVsZW0gPSAkKG9wdGlvbnMuZWxlbSk7XG4gICAgaWYoIWVsZW1bMF0pe1xuICAgICAgcmV0dXJuIGhpbnQuZXJyb3IoJ2xheXVpLnRyZWUg5rKh5pyJ5om+5YiwJysgb3B0aW9ucy5lbGVtICsn5YWD57SgJyk7XG4gICAgfVxuICAgIHRyZWUuaW5pdChlbGVtKTtcbiAgfSk7XG59KTtcbiJdfQ==