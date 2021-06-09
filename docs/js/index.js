document.addEventListener('DOMContentLoaded', function() {

    M.AutoInit(); 
    M.Carousel.init({
      fullWidth: true,
      indicators: true
    });

});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'up',
    hoverEnabled: false
  });
  instances.close()
});

