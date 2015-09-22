$(function() {
  urlsafe = function(str) {
    return str.toLowerCase().replace(/\ /g, "-")
  }

  // attach ids + toc
  headers = $('#cont h1, #cont h2, #cont h3, #cont h4')
  $toc = $('#toc')
  $nav = $('#nav')

  // remove title and abstract
  cont = $('#cont div').children()
  for(i=0;i<cont.length;i++){
    $e = $(cont[i])
    if($e.text() == 'Scope')
      break;
    $e.remove()
  }

  headers = $('#cont h1, #cont h2, #cont h3, #cont h4')
  for(i=0;i<headers.length;i++) {
    $l = $(headers[i]).clone()
    $e=$(headers[i])
    id = urlsafe($e.text())
    $e.attr('id',id)

    $a = $("<a href=\"#"+id+"\">"+$l.text()+"</a>")
    $l.html($a)
    $toc.append($l)
    $nav.append($l.clone())
  }

  // catch # if there was one
  if(document.location.hash.length > 0) {
    $e = $(document.location.hash)
    if($e.length > 0) {
      $(window).scrollTop($e.offset().top)
    }
  }

  // watch scrolling
  setupScrolling = function() {
    to = $('#cont').offset().top
    $body = $('body')

    $(window).on('scroll', function(e) {
      st = $(window).scrollTop()
      $body.toggleClass('scrolling', (st>to))
    })
  }
  setTimeout(setupScrolling,0)
})