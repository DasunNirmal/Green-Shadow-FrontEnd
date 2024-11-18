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
       $(welcomeTextOne).addClass('text-01-left');
       $(welcomeTextTwo).addClass('text-02-left');
       boxLogin.removeClass("animate__zoomIn").hide();
       boxLogin.show().addClass("animate__zoomIn");
       welcomeTextOne.removeClass("animate__lightSpeedInRight").hide();
       welcomeTextOne.show().addClass("animate__lightSpeedInRight");
       welcomeTextTwo.removeClass("animate__lightSpeedInLeft").hide();
       welcomeTextTwo.show().addClass("animate__lightSpeedInLeft");
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
        $(welcomeTextOne).removeClass('text-01-left');
        $(welcomeTextTwo).removeClass('text-02-left');
        boxLogin.removeClass("animate__zoomIn").hide();
        boxLogin.show().addClass("animate__zoomIn");
        welcomeTextOne.removeClass("animate__lightSpeedInRight").hide();
        welcomeTextOne.show().addClass("animate__lightSpeedInRight");
        welcomeTextTwo.removeClass("animate__lightSpeedInLeft").hide();
        welcomeTextTwo.show().addClass("animate__lightSpeedInLeft");
    });
});