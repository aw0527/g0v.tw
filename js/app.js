require.register("config.jsenv",function(e,t,n){n.exports={BUILD:"git-9709ce4"}});var deferSrcSetters,show;deferSrcSetters=[],angular.element(document).ready(function(){var e,t,n,r,o=[];for(e=0,n=(t=deferSrcSetters).length;n>e;++e)r=t[e],o.push(r());return o}),angular.module("g0v.tw",["firebase","btford.markdown"]).config(["$httpProvider",function(e){var t,n;return e.defaults.useXDomain=!0,n=(t=e.defaults.headers.common)["X-Requested-With"],delete t["X-Requested-With"],n}]).factory({fireRoot:["angularFireCollection"].concat(function(){var e;return e="https://g0vsite.firebaseio.com",new Firebase(e)})}).factory({eventsPromise:["$http"].concat(function(e){var t,n;return t="http://www.kimonolabs.com/api/dzdrrgx6",n={params:{apikey:"c626b7443a0cbcb5525f492411d10567",callback:"JSON_CALLBACK"}},e.jsonp(t,n).then(function(e){var t,n,r,o;return t=e.data.results,n=function(e){return{link:e.event.href,title:e.event.text}},r=t.recent.map(n),o=t.past.map(n),{recent:r,past:o}})})}).directive("deferSrc",function(){return{restrict:"A",link:function(e,t){var n;return n=t.attr("defer-src"),deferSrcSetters.push(function(){return t.attr("src",n)})}}}).controller({EventCtrl:["$scope","eventsPromise"].concat(function(e,t){return t.then(function(t){var n,r;return n=t.recent.map(function(e){return e.finished=!1,e}),r=t.past.map(function(e){return e.finished=!0,e}),e.events=n.concat(r)})})}).controller({BlogCtrl:["$scope","angularFireCollection","fireRoot"].concat(function(e,t,n){return e.articles=t(n.child("feed/blog/articles").limit(4))})}).controller({FeaturedCtrl:["$scope","angularFireCollection","$timeout"].concat(function(e,t,n){var r;return r=new Firebase("https://g0vhub.firebaseio.com/projects"),e.projects=t(r),e.nextProject=function(){return void 0!==e.idx?($("#prj-img").css("opacity",0),++e.idx,e.idx%=e.featured.length):void 0},e.$watch("projects.length",function(){var t,n,r,o,i;for(t=[],n=0,o=(r=e.projects).length;o>n;++n)i=r[n],i.thumbnail&&t.push(i);return e.featured=t,e.idx=Math.floor(Math.random()*e.featured.length)}),e.$watch("idx",function(t,n){return void 0!==n?e.project=e.featured[n]:void 0}),e.onTimeout=function(){return e.nextProject(),n(e.onTimeout,1e4)},n(e.onTimeout,15e3)})}).controller({CommuniqueCtrl:["$scope","$http","$element","$timeout"].concat(function(e,t,n,r){return t.get("http://g0v-communique-api.herokuapp.com/api/1.0/entry/all?limit=50").success(function(t){return e.communiques=t,e.check=0,e.idx=0,e.nextCommunique=function(){return void 0!==e.idx?(++e.idx,e.idx%=e.communiques.length):void 0},e.$watch("idx",function(t,r){var o,i,c,u;for(0===e.check?e.check=1:r++,r%=e.communiques.length,void 0!==r&&(e.communique=e.communiques[r]),o=0,c=(i=e.communique.urls).length;c>o;++o)u=i[o],e.communique.content=e.communique.content.replace(u.name,'<a target="_blank" href="'+u.url+'">'+u.name+"</a>");return n.find(".description").html(e.communique.content)}),e.onTimeout=function(){return e.nextCommunique(),r(e.onTimeout,1e4)},r(e.onTimeout,15e3)}).error(function(t,n){return e.message=n})})}).controller({BuildIdCtrl:["$scope"].concat(function(e){var t;return t=require("config.jsenv"),e.buildId=t.BUILD})}),show=function(){var e,t;return e=$("#prj-img"),e.animate({opacity:1},500),t=[40+e.height()][0],$("#prj-img-div").animate({height:t+"px"},500)},$(function(){return $(".ui.dropdown").dropdown({on:"hover",transition:"fade"})});