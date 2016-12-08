$(function () {
  const form = $('#form');
  let sendForm = function(e){


  };
  form.on('submit', function(e){
    e.preventDefault();
    let data = $(this).serializeArray(),
      url = $(this).attr('action');
    console.log(data+' '+url);
    $.ajax({
      url: url,
      type:'post',
      dataType: 'json',
      data: data,
      success: function () {
        $('.success').slideDown();
        $('.button-send').text('Enviado').attr('disabled', 'true').css({background: '#ccc', color: 'green', cursor: 'none'})
      },
      error: function () {
        $('.error').slideDown();
      }
    });
  });
  const inputGroup = $('.input-group input, .input-group textarea');
  inputGroup.blur(function () {
    let _t=$(this);
    if (_t.val()!=''){
      _t.parent().addClass('input-full');
    }else{
      _t.parent().removeClass('input-full');
    }
  });
  const phone = $('#phone');
  phone.on('keypress', (e)=>{
  let keynum = window.event ? window.event.keyCode : e.which;
  if ( keynum == 8 ) return true;
  return /\d/.test(String.fromCharCode(keynum));
  });
});

