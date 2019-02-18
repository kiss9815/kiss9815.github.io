  $(function() {
  var body = $('#starshine'),
      template = $('.template.shine'),
      stars = 300,
      sparkle = 20;
  
    
  var size = 'small';
  var createStar = function() {
    template.clone().removeAttr('id').css({
      top: (Math.random() * 100) + '%',
      left: (Math.random() * 100) + '%',
      webkitAnimationDelay: (Math.random() * sparkle) + 's',
      mozAnimationDelay: (Math.random() * sparkle) + 's'
    }).addClass(size).appendTo(body);
  };
  var width = $( window ).width();
  for(var i = 0; i < stars; i++) {
    if(width<800){
      size = 'small';
    }else{
      if(i % 2 === 0) {
        size = 'small';
      } else if(i % 3 === 0) {
        size = 'medium';
      } else {
        size = 'medium';
        // size = 'large';
      }
    }
    
    createStar();
  }
});