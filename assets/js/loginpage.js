$(document).ready(function(){
   $('#email-input').focus(function(){
       $('#email-logo').addClass('focused');
   });
   $('#email-input').blur(function () {
        $('#email-logo').removeClass('focused');
   });
   $('#email-input').on('input', function () {
        if ($(this).val().length > 30) {
            $('#email-logo').addClass('vanished');
        } else {
            $('#email-logo').removeClass('vanished');
        }
   });

    $('#password-input').focus(function(){
        $('#password-logo').addClass('focused');
    });
    $('#password-input').blur(function () {
        $('#password-logo').removeClass('focused');
    });
    $('#password-input').on('input', function () {
        if ($(this).val().length > 30) {
            $('#password-logo').addClass('vanished');
        } else {
            $('#password-logo').removeClass('vanished');
        }
    });
});