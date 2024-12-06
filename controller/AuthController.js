import { loadFieldTable } from "./FieldController.js";
import { loadCropTable } from "./CropController.js";
import { loadStaffTable } from "./StaffController.js";
import { loadEquipmentTable } from "./EquipmentController.js";
import { loadFieldLogsTable } from "./FieldLogController.js";
import { loadVehicleTable } from "./VehicleController.js";
import { loadCropLogsTable } from "./CropLogController.js";
import { loadStaffLogsTable } from "./StaffLogController.js";

$('#login-button-reg').on('click', () => {
        const email = $('#email-input-reg').val();
        const password = $('#password-input-reg').val();
        const name = $('#name-input-reg').val();
        const role = $('#role-input-reg').val();

        if (!email || !password || !name) {
            if (!email) {
                $('#email-input-reg').addClass('inValidData');
                $('#email-label-reg').addClass('label-color-red');
            } else {
                $('#email-input-reg').removeClass('inValidData');
                $('#email-label-reg').removeClass('label-color-red');
            }

            if (!password) {
                $('#password-input-reg').addClass('inValidData');
                $('#password-label-reg').addClass('label-color-red');
            } else {
                $('#password-input-reg').removeClass('inValidData');
                $('#password-label-reg').removeClass('label-color-red');
            }

            if (!name) {
                $('#name-input-reg').addClass('inValidData');
                $('#name-label-reg').addClass('label-color-red');
            } else {
                $('#name-input-reg').removeClass('inValidData');
                $('#name-label-reg').removeClass('label-color-red');
            }

            return; // Prevent form submission if any field is empty
        }
        var userData = new FormData();
        userData.append('email', email);
        userData.append('password', password);
        userData.append('role', role);

        $.ajax({
            url: "http://localhost:8081/greenShadow/api/v1/auth/signup",
            type: "POST",
            data: userData,
            processData: false,
            contentType: false,
            success: function (response) {
                const token = response.token;
                if (token) {
                    document.cookie = "token= "+token;
                    localStorage.setItem("jwtToken", token);
                    console.log("Token received: ", token);
                } else {
                    alert("Signup successful, token not recieved.");
                }
            },
            error: function () {
                alert("Signup failed, please try again.");
            },
        });
    });

    $('#email-input-reg, #password-input-reg, #name-input-reg, #email-input, #password-input').on('input', function () {
        $(this).removeClass('inValidData');

        if ($(this).attr('id') === 'email-input-reg' || $(this).attr('id') === 'email-input') {
            $('#email-label-reg').removeClass('label-color-red');
            $('#email-label').removeClass('label-color-red');
        } else if ($(this).attr('id') === 'password-input-reg' || $(this).attr('id') === 'password-input') {
            $('#password-label-reg').removeClass('label-color-red');
            $('#password-label').removeClass('label-color-red');
        } else if ($(this).attr('id') === 'name-input-reg') {
            $('#name-label-reg').removeClass('label-color-red');
        }
    });


    $('#login-button').on('click', () => {
        const email = $('#email-input').val();
        const password = $('#password-input').val();

        if (!email) {
            $('#email-input').addClass('inValidData');
            $('#email-label').addClass('label-color-red');
        } else {
            $('#email-input').removeClass('inValidData');
            $('#email-label').removeClass('label-color-red');
        }

        if (!password) {
            $('#password-input').addClass('inValidData');
            $('#password-label').addClass('label-color-red');
        } else {
            $('#password-input').removeClass('inValidData');
            $('#password-label').removeClass('label-color-red');
        }

        if (!email || !password) {
            return;
        }

        const userData = {
            email: email,
            password: password
        }
        const userJSON = JSON.stringify(userData);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/auth/signIn',
            type: 'POST',
            data: userJSON,
            contentType: 'application/json',
            success: (res) => {
                const token = res.token;
                if (token) {
                    document.cookie = "token= "+token;
                    console.log("Token received: ", token);
                    loadFieldTable();
                    loadCropTable();
                    loadStaffTable();
                    loadEquipmentTable();
                    loadFieldLogsTable();
                    loadVehicleTable();
                    loadCropLogsTable();
                    loadStaffLogsTable();
                    $('#txtLogCodeCrop').val("CL");
                    $('#txtLogCode').val("FL");
                    $('#txtLogCodeStaff').val("SL");
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
                } else {
                    alert("Login successful, token not recieved.");
                }
            },
            error: (res) => {
                console.error(res);
            }
        });
    });

