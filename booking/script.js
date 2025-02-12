$(document).ready(function () {
    let bookedSlots = {};

    function fetchBookedSlots() {
        console.log("Fetching booked slots...");
        $.get("http://127.0.0.1:5000/get_booked_slots", function (data) {
            bookedSlots = data;
            loadAvailableSlots();
        }).fail(function () {
            alert("Error fetching booked slots!");
        });
    }

    $("#appointment-date").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: 0,
        onSelect: function () {
            loadAvailableSlots();
        }
    });

    $("#doctor-select").on("change", function () {
        loadAvailableSlots();
    });

    function loadAvailableSlots() {
        let doctor = $("#doctor-select").val();
        let date = $("#appointment-date").val();
        let times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

        if (!date) {
            $("#slots-container").slideUp();
            return;
        }

        $("#time-slots").empty();
        times.forEach(time => {
            let isBooked = bookedSlots[doctor]?.[date]?.includes(time);
            let slot = $(`<div class="slot ${isBooked ? 'booked' : ''}" data-time="${time}">${time}</div>`);

            if (!isBooked) {
                slot.on("click", function () {
                    openBookingForm(doctor, date, time);
                });
            }
            $("#time-slots").append(slot);
        });

        $("#slots-container").slideDown();
    }

    function openBookingForm(doctor, date, time) {
        if (bookedSlots[doctor]?.[date]?.includes(time)) {
            alert(`This time slot is already booked for ${doctor} on ${date}.`);
            return;
        }

        $("#bookingFormModal").modal("show");
        $("#booking-info").text(`You are booking an appointment with ${doctor} on ${date} at ${time}.`);

        $("#first-name, #last-name, #phone, #details").val("");

        $("#booking-form").off("submit").on("submit", function (e) {
            e.preventDefault();

            let formData = {
                doctor: doctor,
                date: date,
                time: time,
                first_name: $("#first-name").val().trim(),
                last_name: $("#last-name").val().trim(),
                phone: $("#phone").val().trim(),
                details: $("#details").val().trim()
            };

            if (!formData.first_name || !formData.last_name || !formData.phone) {
                alert("Please fill in all required fields!");
                return;
            }

            if (bookedSlots[doctor]?.[date]?.includes(time)) {
                alert("This time slot has just been booked. Please choose another time.");
                return;
            }

            $.ajax({
                url: "http://127.0.0.1:5000/book_appointment",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(formData),
                beforeSend: function () {
                    $("#booking-form button").prop("disabled", true).text("Booking...");
                },
                success: function (response) {
                    alert(response.message);
                    $("#bookingFormModal").modal("hide");
                    fetchBookedSlots();
                },
                error: function (xhr) {
                    alert("Error: " + xhr.responseJSON.error);
                },
                complete: function () {
                    $("#booking-form button").prop("disabled", false).text("Confirm Appointment");
                }
            });
        });
    }

    fetchBookedSlots();
});
