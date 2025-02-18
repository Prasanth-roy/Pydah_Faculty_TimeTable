document.addEventListener("DOMContentLoaded", function () {
    let searchBox = document.getElementById("searchBox");
    let rows = document.querySelectorAll("#facultyTable tr");

    searchBox.addEventListener("keyup", function () {
        let filter = searchBox.value.toLowerCase();

        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header row
            
            let facultyName = row.cells[0]?.textContent.toLowerCase();
            
            if (facultyName.includes(filter)) {
                row.style.display = "";
                row.classList.add("highlight-row"); // Highlight effect
            } else {
                row.style.display = "none";
                row.classList.remove("highlight-row");
            }
        });

        // Remove highlight after 1 second
        setTimeout(() => {
            document.querySelectorAll(".highlight-row").forEach(row => {
                row.classList.remove("highlight-row");
            });
        }, 1000);
    });

    // Function to Show Only Selected Department
    window.showDepartment = function (dept) {
        rows.forEach(row => {
            if (row.classList.contains(dept) || row.querySelector("th")) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    };

    // Faculty Wise Weekly Timetable Data
    const facultyTimetables = {

        krishna: [
            { day: "Monday", subject: "CSE AI A (3-2)" , time:" CSE-A (2-2)", third:"-", fourth:"-", fifth:"-", sixth:"-",seventh:"-"},
            { day: "Tuesday", subject: "CSE AI A (3-2)",  time:"-" , third:"-", fourth:"-", fifth:"-", sixth:"-",seventh:"-"},
            { day: "Wednesday", subject: " -",time: "CSEAI A (3-2)",third:"CSE-A (2-2)F_S LAB", fourth:"CSE-A (2-2)F_S LAB", fifth:"CSE-A (2-2)", sixth:"-",seventh:"-" },
            { day: "Thursday", subject: "-",time:"-",third:"", fourth:"-", fifth:"CSE AI A (3-2)DLT LAB", sixth:"CSE AI A (3-2)DLT LAB",seventh:"CSE AI A (3-2)DLT LAB" },
            { day: "Friday", subject: " CSE-A (2-2)" ,time:"-",third:"", fourth:"-", fifth:"-", sixth:"-",seventh:" CSE-A (2-2)"},
            { day: "Saturday", subject: "-", time: "-",third:"CSE AI A (3-2)", fourth:"-", fifth:"-", sixth:"CSE-A (2-2)",seventh:"-" }
        ],
        swapna: [
            { day: "Monday", subject: "CSE AI A (3-2)" , time:" CSE-A (2-2)", third:"-", fourth:"-", fifth:"-", sixth:"-",seventh:"-"},
            { day: "Tuesday", subject: "CSE AI A (3-2)",  time:"-" , third:"-", fourth:"-", fifth:"-", sixth:"-",seventh:"-"},
            { day: "Wednesday", subject: " -",time: "CSEAI A (3-2)",third:"CSE-A (2-2)F_S LAB", fourth:"CSE-A (2-2)F_S LAB", fifth:"CSE-A (2-2)", sixth:"-",seventh:"-" },
            { day: "Thursday", subject: "-",time:"-",third:"", fourth:"-", fifth:"CSE AI A (3-2)DLT LAB", sixth:"CSE AI A (3-2)DLT LAB",seventh:"CSE AI A (3-2)DLT LAB" },
            { day: "Friday", subject: " CSE-A (2-2)" ,time:"-",third:"", fourth:"-", fifth:"-", sixth:"-",seventh:" CSE-A (2-2)"},
            { day: "Saturday", subject: "-", time: "-",third:"CSE AI A (3-2)", fourth:"-", fifth:"-", sixth:"CSE-A (2-2)",seventh:"-" }
        ],
        arjun: [
            { day: "Monday", subject: "Data Structures", time: "9:00 AM - 10:00 AM" },
            { day: "Friday", subject: "Algorithms", time: "11:00 AM - 12:00 PM" }
        ],
        suresh: [
            { day: "Wednesday", subject: "AI & ML", time: "12:00 PM - 1:00 PM" },
            { day: "Friday", subject: "Deep Learning", time: "2:00 PM - 3:00 PM" }
        ]
    };

    // Show Weekly Timetable on Click
    window.showTimetable = function (faculty) {
        let weeklyData = facultyTimetables[faculty];
        let tableBody = document.getElementById("weeklyData");
        let facultyName = document.getElementById("facultyName");

        facultyName.textContent = `Timetable for ${faculty.charAt(0).toUpperCase() + faculty.slice(1)}`;

        // Clear existing data
        tableBody.innerHTML = "";

        // Add new data
        weeklyData.forEach(entry => {
            let row = `<tr>
                <td>${entry.day}</td>
                <td>${entry.subject}</td>
                <td>${entry.time}</td>
                <td>${entry.third}</td>
                   <td>${entry.fourth}</td>
                      <td>${entry.fifth}</td>
                         <td>${entry.sixth}</td>
                            <td>${entry.seventh}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });

     // Scroll to Weekly Timetable Section with smooth scroll
         document.getElementById("weeklyTimetable").scrollIntoView({ 
         behavior: 'smooth' 
     });


        // Show the Weekly Timetable Section
        document.getElementById("weeklyTimetable").style.display = "block";
    };


    // Function to Download Timetable as PDF
    document.getElementById("downloadPDF").addEventListener("click", function () {
    let pdf = new jspdf();
    let facultyName = document.getElementById("facultyName").textContent;
    
    pdf.text(facultyName, 10, 10); // Faculty Name in PDF
    
    let rows = document.querySelectorAll("#weeklyData tr");
    let tableData = [];

    rows.forEach(row => {
        let rowData = [];
        row.querySelectorAll("td").forEach(cell => {
            rowData.push(cell.textContent);
        });
        tableData.push(rowData);
    });

    pdf.autoTable({
        head: [["Day", "Subject", "Time Slot"]],
        body: tableData
    });

    pdf.save($`{facultyName}`.pdf);
});

document.getElementById("downloadPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf; // ✅ Correct way to use jsPDF

    let doc = new jsPDF();
    doc.text("Faculty Timetable", 10, 10);
    doc.save("faculty_timetable.pdf");
});

document.getElementById("downloadPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.text("Faculty Timetable", 10, 10);

    // 🔹 AutoTable Plugin Use cheyyi
    doc.autoTable({
        html: "#weeklyTimetable table", // ✅ Table ni directly PDF ki add cheyyi
        startY: 20, 
        theme: "grid"
    });

    doc.save("faculty_timetable.pdf");
});



});