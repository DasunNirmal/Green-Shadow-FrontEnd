$(document).ready(function () {
   $('#sign-up-button').on('click',() => {
       $('#login-section').hide();
       $('#image-login').hide();
       $('#registration-section').show();
       $('#box-login').addClass('rotate-and-color');
       $('body').addClass('color');
       const boxLogin = $("#box-login");
       const welcomeTextOne = $('#welcome-text');
       const welcomeTextTwo = $('#welcome-text-2');
       welcomeTextOne.html("We're so glad to<br>have you on board !");
       welcomeTextTwo.html("Welcome to Green Shadow !");
       $(welcomeTextOne).addClass('text-01-left');
       $(welcomeTextTwo).addClass('text-02-left');
       boxLogin.removeClass("animate__zoomIn").hide();
       boxLogin.show().addClass("animate__zoomIn");
       welcomeTextOne.removeClass("animate__lightSpeedInRight").hide();
       welcomeTextOne.show().addClass("animate__lightSpeedInLeft");
       welcomeTextTwo.removeClass("animate__lightSpeedInLeft").hide();
       welcomeTextTwo.show().addClass("animate__lightSpeedInRight");
   });
    $('#sign-up-button-2').on('click',() => {
        $('#login-section').show();
        $('#image-login').show();
        $('#registration-section').hide();
        $('#box-login').removeClass('rotate-and-color');
        $('body').removeClass('color');
        const boxLogin = $("#box-login");
        const welcomeTextOne = $('#welcome-text');
        const welcomeTextTwo = $('#welcome-text-2');
        welcomeTextOne.html("Welcome Back !");
        welcomeTextTwo.html("Pickup Where Your Left Off");
        $(welcomeTextOne).removeClass('text-01-left');
        $(welcomeTextTwo).removeClass('text-02-left');
        boxLogin.removeClass("animate__zoomIn").hide();
        boxLogin.show().addClass("animate__zoomIn");
        welcomeTextOne.removeClass("animate__lightSpeedInLeft").hide();
        welcomeTextOne.show().addClass("animate__lightSpeedInRight");
        welcomeTextTwo.removeClass("animate__lightSpeedInLeft").hide();
        welcomeTextTwo.show().addClass("animate__lightSpeedInLeft");
    });
    $('#name-input-reg').focus(function(){
        $('#user-logo-reg').addClass('focused');
    });
    $('#name-input-reg').blur(function () {
        $('#user-logo-reg').removeClass('focused');
    });
    $('#name-input-reg').on('input', function () {
        if ($(this).val().length > 30) {
            $('#user-logo-reg').addClass('vanished');
        } else {
            $('#user-logo-reg').removeClass('vanished');
        }
    });

    $('#email-input-reg').focus(function(){
        $('#email-logo-reg').addClass('focused');
    });
    $('#email-input-reg').blur(function () {
        $('#email-logo-reg').removeClass('focused');
    });
    $('#email-input-reg').on('input', function () {
        if ($(this).val().length > 30) {
            $('#email-logo-reg').addClass('vanished');
        } else {
            $('#email-logo-reg').removeClass('vanished');
        }
    });

    $('#password-input-reg').focus(function(){
        $('#password-logo-reg').addClass('focused');
    });
    $('#password-input-reg').blur(function () {
        $('#password-logo-reg').removeClass('focused');
    });
    $('#password-input-reg').on('input', function () {
        if ($(this).val().length > 30) {
            $('#password-logo-reg').addClass('vanished');
        } else {
            $('#password-logo-reg').removeClass('vanished');
        }
    });

    $('#confirm-password-input').focus(function(){
        $('#confirm-password-logo').addClass('focused');
    });
    $('#confirm-password-input').blur(function () {
        $('#confirm-password-logo').removeClass('focused');
    });
    $('#confirm-password-input').on('input', function () {
        if ($(this).val().length > 30) {
            $('#confirm-password-logo').addClass('vanished');
        } else {
            $('#confirm-password-logo').removeClass('vanished');
        }
    });

    $('#name-input-reg').keypress((e) => {
        if (e.which === 13) {
            $('#email-input-reg').focus();
        }
    });
    $('#email-input-reg').keypress((e) => {
        if (e.which === 13) {
            $('#password-input-reg').focus();
        }
    });
    $('#password-input-reg').keypress((e) => {
        if (e.which === 13) {
            $('#confirm-password-input').focus();
        }
    });
});