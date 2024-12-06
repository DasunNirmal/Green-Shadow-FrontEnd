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
        const role = $('#role-input-reg').val();

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

    $('#login-button').on('click', () => {
        const email = $('#email-input').val();
        const password = $('#password-input').val();

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
                } else {
                    alert("Login successful, token not recieved.");
                }
            },
            error: (res) => {
                console.error(res);
            }
        });
    });

