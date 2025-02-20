
function taskBoxPreview() {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskBox = document.getElementById("taskBox");
    const cancelTaskBtn = document.getElementById("cancelTaskBtn");
    addTaskBtn.addEventListener("click", () => {
        taskBox.classList.remove("hidden");
    })

    cancelTaskBtn.addEventListener("click", () => {
        taskBox.classList.add("hidden");
    })
}
taskBoxPreview();

function datePicker() {
    document.getElementById("dateDropdownBtn").addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents event bubbling
        let dropdown = document.getElementById("dateDropdown");

        dropdown.classList.toggle("hidden");
    });

    document.getElementById("calendarInput").addEventListener("change", function () {
        document.getElementById("dateDropdownBtn").querySelector("h6").textContent = this.value;
        document.getElementById("dateDropdown").classList.add("hidden"); // Hide dropdown after selection
    });

    document.addEventListener("click", function (event) {
        let dropdown = document.getElementById("dateDropdown");
        let btn = document.getElementById("dateDropdownBtn");

        if (!btn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
}
datePicker();

function priorityDropdownToggle() {
    document.querySelector("#priorityDropdownBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        let dropdown = document.getElementById("priorityDropdown");

        dropdown.classList.toggle("hidden");
    });

    document.querySelectorAll("#priorityDropdown li").forEach(item => {
        item.addEventListener("click", function () {
            document.getElementById("priorityDropdownBtn").querySelector("h6").textContent = this.dataset.value;
            document.getElementById("priorityDropdown").classList.add("hidden");
        })
    });

    document.addEventListener("click", (e) => {
        let dropdown = document.getElementById("priorityDropdown");
        let priorityDropdownBtn = document.getElementById("priorityDropdownBtn");

        if (!priorityDropdownBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add("hidden");
        }
    })

}
priorityDropdownToggle();


function reminder(){

    document.getElementById("reminderBtn").addEventListener("click", function () {
        const dropdown = document.getElementById("reminderDropdown");
        dropdown.classList.toggle("hidden"); 
    });

    document.getElementById("timeInput").addEventListener("change", function () {
        let timeValue = this.value;
        let [hours, minutes] = timeValue.split(":");
        hours = parseInt(hours); 
    
        let amPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
    
        let formattedTime = `${hours}:${minutes} ${amPm}`;
    
        document.getElementById("reminderBtn").querySelector("h6").textContent = formattedTime;
        document.getElementById("reminderDropdown").classList.add("hidden");
    });        
    
    document.addEventListener("click", function (event) {
        const dropdown = document.getElementById("reminderDropdown");
        const reminderBtn = document.getElementById("reminderBtn");
    
        if (!dropdown.contains(event.target) && !reminderBtn.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });    
 }

reminder();

function resetBtn() {
    document.getElementById("resetBtn").addEventListener("click", function () {
        // Reset Task Title & Description
        document.querySelector("input[name='newtask']").value = "";

        let descriptionField = document.querySelector("input[name='newtask']:nth-of-type(2)");
        if (descriptionField) {
            descriptionField.value = "";
        }

        // Reset Date (Fix for calendar input)
        let calendarInput = document.getElementById("calendarInput");
        if (calendarInput) {
            calendarInput.value = "";
            calendarInput.type = "text";
            calendarInput.type = "date";

            document.getElementById("dateDropdownBtn").querySelector("h6").textContent = "Select Date";
        }

        document.getElementById("priorityDropdownBtn").querySelector("h6").textContent = "Priority";
    });
}
resetBtn();

function themeToggle() {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    document.getElementById("settingsBtn").addEventListener("click", function(e) {
        e.stopPropagation();
        document.getElementById("settingsDropdown").classList.toggle("hidden");
    });

    document.getElementById("darkModeToggle").addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");

        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}
document.addEventListener("DOMContentLoaded", themeToggle);


function taskSubmit(){
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector("#submitBtn").addEventListener("click", function (event) {
            event.preventDefault();
    
            let title = document.querySelector("input[name='newtask']").value;
            let description = document.querySelector("input[placeholder='Description']").value;
            let due_date = document.getElementById("calendarInput").value;
            let priority = document.querySelector("#priorityDropdownBtn h6").textContent;
            let reminder_time = document.getElementById("timeInput").value;
    
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("due_date", due_date);
            formData.append("priority", priority);
            formData.append("reminder_time", reminder_time);
    
            fetch("http://localhost/save_task.php", {
                method: "POST",
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.status === "success") {
                        document.querySelector("form").reset();
                    }
                })
                .catch(error => console.error("Error:", error));
        });
    });
    
}
taskSubmit();