$(document).ready(function () {
    
    $('#save-staff').on('click', () => {
        var staff_id = $('#txtMemberID').val();
        var first_name = $('#txtFirstName').val();
        var last_name = $('#txtLastName').val();
        var designation = $('#txtDesignation').val();
        var email = $('#txtEmail').val();
        var role = $('#txtRole').val();
        var gender = $('#txtGender').val();
        var joined_date = $('#txtJoinedDate').val();
        var dob = $('#txtDateOfBirth').val();
        var address_01 = $('#txtAddressLine1').val();
        var address_02 = $('#txtAddressLine2').val();
        var address_03 = $('#txtAddressLine3').val();
        var address_04 = $('#txtAddressLine4').val();
        var address_05 = $('#txtAddressLine5').val();
        var phone_no = $('#txtPhoneNumber').val();


        const staffData = {
           staff_id: staff_id,
           first_name: first_name,
           last_name: last_name,
           designation: designation,
           email: email,
           role: role,
           gender: gender,
           joined_date: joined_date,
           dob: dob,
           address_01: address_01,
           address_02: address_02,
           address_03: address_03,
           address_04: address_04,
           address_05: address_05,
           phone_no: phone_no,
       }
       const staffJSON = JSON.stringify(staffData);
       console.log(staffJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff',
            type: 'POST',
            data: staffJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
            },
            error: (res) => {
                console.error(res);
            }
        });
    });
});