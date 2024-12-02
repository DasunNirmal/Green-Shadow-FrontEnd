$(document).ready(function(){


    $('#btnSearchEmploys').on('click', function() {
        const searchQuery = $('#txtSearchEmploys').val();
        searchStaffByID(searchQuery);
    });

    function searchStaffByID(query) {
        const staff_id = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff?staff_id=' + staff_id,
            type: 'GET',
            dataType: 'json',
            success: (staffResponse) => {
                console.log('staff data:', staffResponse);
                for (let i = 0; i < staffResponse.length; i++) {
                    if (staff_id === staffResponse[i].staff_id) {
                        var staff = staffResponse[i];
                        break;
                    }
                }

                if (staff) {
                    console.log('Staff retrieved successfully:', staff);
                    $('#txtVehicleMemberID').val(staff.staff_id);
                    $('#txtVehicleFirstName').val(staff.first_name);
                    $('#txtVehicleEmail').val(staff.email);
                    $('#txtVehicleRole').val(staff.role);
                    $('#txtVehiclePhoneNumber').val(staff.phone_no);
                } else {
                    console.error('Staff not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }

    $('#save-vehicles').on('click', () => {
        var vehicle_code = $('#txtVehicleCode').val();
        var license_plate = $('#txtLicensePlate').val();
        var fuel_type = $('#txtFuelType').val();
        var vehicle_category = $('#txtVehicleCategory').val();
        var remarks = $('#txtRemarks').val();
        var status = $('#txtStatus').val();

        var isAvailable = status === "Available";
        var role = isAvailable ? $('#txtVehicleRole').val() : "Not Available";
        var first_name = isAvailable ? $('#txtVehicleFirstName').val() : "Not Available";
        var phone_no = isAvailable ? $('#txtVehiclePhoneNumber').val() : "Not Available";
        var email = isAvailable ? $('#txtVehicleEmail').val() : "Not Available";
        var staff_id = isAvailable ? $('#txtVehicleMemberID').val() : null;

        const vehicleData = {
            vehicle_code:vehicle_code,
            license_plate:license_plate,
            fuel_type:fuel_type,
            role:role,
            remarks:remarks,
            vehicle_category:vehicle_category,
            status:status,
            first_name:first_name,
            phone_no:phone_no,
            email:email,
            staff_id:staff_id
        };

        const vehicleJSON = JSON.stringify(vehicleData);
        console.log(vehicleJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/vehicle',
            type: 'POST',
            data: vehicleJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Vehicle saved successfully.");
            },
            error: (err) => {
                console.error("Error saving vehicle:", err);
            }
        });
    });

});