function Doctor(firstName, lastName, pictureUrl, specialization, description) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.pictureUrl = pictureUrl;
    this.specialization = specialization;
    this.description = description;
}
const Doctors = new Array(
    new Doctor("Sophia", "Bennett", "", "Cardiologist", "Dr. Bennett specializes in interventional cardiology, performing complex heart procedures like stent placements. She is known for her compassionate approach and dedication to patient care. Outside of work, she volunteers in heart health awareness programs."),
    new Doctor("Ryan", "Mitchell", "", "Neurologist", "With a focus on neurodegenerative diseases, Dr. Mitchell helps patients suffering from Alzheimer's and Parkinson's disease. He is passionate about finding new treatments to slow disease progression. He also runs a support group for families of patients."),
    new Doctor("Michael", "Chang", "", "Cardiologist", "With expertise in pediatric cardiology, Dr. Chang treats heart defects in children and newborns. He believes in using the latest medical technology to improve patient outcomes. His work has helped develop new techniques for non-invasive heart surgeries."),
    new Doctor("James", "Patterson", "", "Cardiologist", "Dr. Patterson has over 15 years of experience treating heart conditions such as arrhythmia and heart failure. He is passionate about preventive care and educating patients on maintaining a healthy heart. His research on hypertension has been published in leading medical journals."),
    new Doctor("Hannah", "Foster", "", "Orthopedic Surgeon", "With a background in pediatric orthopedics, Dr. Foster helps children with bone deformities and fractures. She believes in making the hospital experience less intimidating for young patients. Her research on bone growth abnormalities has been widely recognized."),
    new Doctor("Ethan", "Walker", "", "Cardiologist", "Dr. Walker has spent over a decade treating patients with coronary artery disease. He is dedicated to creating personalized treatment plans that improve his patients' quality of life. His latest research focuses on the impact of stress on heart health."),
    new Doctor("Olivia", "Rodriguez", "", "Cardiologist", "Dr. Rodriguez is a leader in heart disease prevention, focusing on lifestyle changes and innovative treatments. She frequently speaks at international medical conferences on cardiovascular health. Her friendly nature makes her a favorite among her patients."),
    new Doctor("Nathaniel", "Brooks", "", "Neurologist", "Specializing in stroke recovery, Dr. Brooks works closely with rehabilitation teams to help patients regain mobility. He advocates for early intervention and advanced stroke treatments. His recent study on stroke prevention gained international recognition."),
    new Doctor("Isabella", "Khan", "", "Neurologist", "Dr. Khan is an expert in migraine treatment and chronic pain management. She believes in a holistic approach, combining medication with lifestyle modifications. Her empathetic nature makes her a trusted doctor among her patients."),
    new Doctor("Daniel", "Roberts", "", "Orthopedic Surgeon", "Dr. Roberts is an expert in spinal surgeries, treating conditions like herniated discs and scoliosis. He stays updated with the latest robotic-assisted surgical techniques. His goal is to minimize recovery time while ensuring long-term pain relief."),
    new Doctor("Lily", "Evans", "", "Neurologist", "Dr. Evans is known for her work in multiple sclerosis (MS) treatment. She has developed innovative therapy programs to improve the daily lives of MS patients. Her dedication to research has led to breakthroughs in personalized treatments."),
    new Doctor("Vanessa", "Kim", "", "Orthopedic Surgeon", "Dr. Kim focuses on joint replacement surgeries, particularly for knees and hips. She has performed over 1,000 successful surgeries and is known for her precision. Her patients appreciate her thorough explanations and kind demeanor."),
    new Doctor("Emily", "Carter", "", "Neurologist", "Dr. Carter specializes in treating epilepsy and other seizure disorders. She is committed to using cutting-edge treatments to help patients live normal lives. Her research in neurology has led to advancements in early detection techniques."),
    new Doctor("Christopher", "Adams", "", "Orthopedic Surgeon", "Dr. Adams specializes in sports injuries, helping athletes recover from fractures and ligament tears. He has worked with professional sports teams to improve rehabilitation techniques. His goal is to get patients back to their active lifestyles as quickly as possible."),
    new Doctor("Eric", "Thompson", "", "Orthopedic Surgeon", "Dr. Thompson specializes in trauma-related orthopedic surgeries, treating severe fractures and injuries. He has worked in emergency settings, providing life-saving surgical care. His ability to remain calm under pressure has earned him great respect in his field.")
)

const LastNames = [];
for (let doctor of Doctors) {
    LastNames.push(doctor.lastName);
}

function printingDoctor(doctor) {
    $("#cardContainer").append(`
        <div class="card mb-3 align-self-center" style="max-width: 900px;">
            <div class="row g-0">
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${"Dr. " + doctor.firstName + " " + doctor.lastName}</h5>
                        <p class="card-text"><small class="text-body-secondary">${doctor.specialization}</small></p>
                        <p class="card-text">${doctor.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}

$(document).ready(function () {
    $("#lastNameInput").autocomplete({
        source: LastNames
    });


});
$(document).ready(function () {
    for (let doctor of Doctors) {
        printingDoctor(doctor);
    }
});

$("#Select").mouseout(function () {
    selectedOption = $(this).val()
    
    if (selectedOption == 0) {
        $("#cardContainer").empty();
        for (let doctor of Doctors) {
            printingDoctor(doctor);
        }
    }
    if (selectedOption == 1) {

        $("#cardContainer").empty();
        for (let doctor of Doctors) {
            if (doctor.specialization == "Cardiologist") {
                printingDoctor(doctor);
            }
        }
    }
    if (selectedOption == 2) {
        $("#cardContainer").empty();
        for (let doctor of Doctors) {
            if (doctor.specialization == "Neurologist") {
                printingDoctor(doctor);
            }
        }
    }
    if (selectedOption == 3) {
        $("#cardContainer").empty();
        for (let doctor of Doctors) {
            if (doctor.specialization == "Orthopedic Surgeon") {
                printingDoctor(doctor);
            }
        }
    }
});


var timer = '';

$('#lastNameInput').keypress(function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
        text = $('#lastNameInput').val()
        if (text.length == 0) {
            return
        }

        $("#cardContainer").empty();
        for (let doctor of Doctors) {
            if (doctor.lastName == String(text)) {
                printingDoctor(doctor)
            }
        }
    }, 1000); //Waits for 3 seconds after last keypress to execute the above lines of code
});
