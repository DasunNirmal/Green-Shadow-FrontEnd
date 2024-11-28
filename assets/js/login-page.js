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
    $('#email-input').keypress((e) => {
        if (e.which === 13) {
            $('#password-input').focus();
        }
    });

    $('#check-box-login').on('click', () => {
        const passwordField = $('#password-input');
        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
        } else {
            passwordField.attr('type', 'password');
        }
    });

    $('#login-button').on('click', () => {
        $('#login-section').hide();
        $('#registration-section').hide();
        $('#box-login').hide();
        $('#image-login').hide();
        $('#welcome-text').hide();
        $('#welcome-text-2').hide();
        $('#dashboard-section').show();
        $('#navigation-bar').show().addClass('animate__animated animate__slideInDown');
        $('body').addClass('color-dashboard').addClass('allowOverFlow-y');
        $('#home').addClass('active-page');
        $('#field').removeClass('active-page');
        $('#crop').removeClass('active-page');
        $('#staff').removeClass('active-page');
        $('#vehicle').removeClass('active-page');
        $('#logs').removeClass('active-page');
        $('#equipment').removeClass('active-page');
    });
});