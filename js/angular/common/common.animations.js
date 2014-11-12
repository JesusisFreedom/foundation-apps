angular.module('foundation.common.animations', ['ngAnimate']);

angular.module('foundation.common.animations')
  .animation('.ui-animation', ['$state', function($state) {
    var events = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend',
                  'webkitTransitionEnd', 'otransitionend', 'transitionend'];
    var active = 'is-active';
    var parentStyle = 'position-absolute';
    var enter = 'ng-enter';
    var enterActive = 'ng-enter-active';
    var leave = 'ng-leave';
    var leaveActive = 'ng-leave-active';

    return {
      enter: function(element, done) {
        var scope = element.scope();

        if(scope.vars && scope.vars.animationIn) {

          var animationIn = scope.vars.animationIn;
          var animationOut = scope.vars.animationOut || '';

          //reset possible failed animations and bugs
          element.parent().addClass(parentStyle);
          element.removeClass(enter + ' ' + leave + ' ' + animationIn + ' ' + animationOut);

          element.addClass(animationIn);

          setTimeout(function() {
            element.addClass(enter);
          }, 100);

          element.one(events.join(' '), function() {
            //cleanup
            element.removeClass(enter + ' ' + leave + ' ' + animationIn + ' ' + animationOut);
            element.parent().removeClass(parentStyle);
            done();
          });
        } else {
          done();
        }

        return function(isCancelled) {

        };
      },
      leave: function(element, done) {
        var scope = element.scope();

        if(scope.vars && scope.vars.animationOut) {
          var animationIn = scope.vars.animationIn || '';
          var animationOut = scope.vars.animationOut;

          //reset possible failed animations and bugs
          element.parent().addClass(parentStyle);
          element.removeClass(enter + ' ' + leave + ' ' + animationIn + ' ' + animationOut);

          element.addClass(animationOut);

          setTimeout(function() {
            element.addClass(leave);
          });


          element.one(events.join(' '), function(){
            //cleanup
            element.removeClass(enter + ' ' + leave + ' ' + animationIn + ' ' + animationOut);
            element.parent().removeClass(parentStyle);
            done();
          });


        } else {
          done();
        }

        return function(isCancelled) {

        };
       }
    };


  }]);
