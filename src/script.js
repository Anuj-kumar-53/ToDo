document.addEventListener("DOMContentLoaded", function () {
    initializeEventListeners();

    loadTheme();

    handleFormSubmission();
});

function initializeEventListeners() {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskBox = document.getElementById("taskBox");
    const cancelTaskBtn = document.getElementById("cancelTaskBtn");

    console.log({ addTaskBtn, taskBox, cancelTaskBtn });

    if (addTaskBtn && taskBox && cancelTaskBtn) {
        addTaskBtn.addEventListener("click", () => toggleVisibility(taskBox, false));
        cancelTaskBtn.addEventListener("click", () => toggleVisibility(taskBox, true));
    } else {
        console.error("One or more elements are missing from the DOM.");
    }

    const calendarInput = document.getElementById("calendarInput");
    const selectedDate = document.getElementById("selectedDate");

    console.log({ calendarInput, selectedDate });

    if (calendarInput && selectedDate) {
        calendarInput.addEventListener("change", () => updateSelectedValue(calendarInput, selectedDate, "Date"));
    }

    const priorityDropdownBtn = document.getElementById("priorityDropdownBtn");
    const priorityDropdown = document.getElementById("priorityDropdown");
    const selectedPriority = document.getElementById("selectedPriority");

    console.log({ priorityDropdownBtn, priorityDropdown, selectedPriority });

    if (priorityDropdownBtn && priorityDropdown && selectedPriority) {
        priorityDropdownBtn.addEventListener("click", (e) => toggleDropdown(e, priorityDropdown));
        document.querySelectorAll("#priorityDropdown li").forEach(item => {
            item.addEventListener("click", () => updateSelectedValue(item, selectedPriority, "Priority", "value"));
        });
    }
}

function toggleVisibility(element, hide) {
    if (hide) {
        element.classList.add("hidden");
    } else {
        element.classList.remove("hidden");
    }
}

function toggleDropdown(event, dropdown) {
    event.stopPropagation();
    dropdown.classList.toggle("hidden");
}

function updateSelectedValue(inputElement, targetElement, defaultValue, customValue = null) {
    if (customValue) {
        targetElement.textContent = customValue;
    } else {
        targetElement.textContent = inputElement.value || defaultValue;
    }
    inputElement.closest(".relative").querySelector(".hidden").classList.add("hidden");
}

function formatTime(timeString) {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const amPm = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12}:${minutes} ${amPm}`;
}

function resetForm(selectedDate, selectedPriority, selectedReminder) {
    selectedDate.textContent = "Date";
    selectedPriority.textContent = "Priority";
    selectedReminder.textContent = "Reminders";
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
}

function closeDropdowns(event, ...dropdowns) {
    dropdowns.forEach((dropdown, index) => {
        if (!dropdown.contains(event.target) && !dropdowns[index + 1]?.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
}

function handleFormSubmission() {
    const taskForm = document.getElementById("taskForm");

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();


        const formData = new FormData(this);
        const title = formData.get("title");
        const description = formData.get("description");
        const dueDate = formData.get("due_date");
        const priority = formData.get("priority");
        const reminderTime = formData.get("reminder_time");


        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Due Date:", dueDate);
        console.log("Priority:", priority);
        console.log("Reminder Time:", reminderTime);


        fetch("http://localhost/toDo/src/save_task.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                if (data.status === "success") {

                    this.reset();
                    toggleVisibility(document.getElementById("taskBox"), true);
                    resetForm(
                        document.getElementById("selectedDate"),
                        document.getElementById("selectedPriority"),
                        document.getElementById("selectedReminder")
                    );
                }
            })
            .catch((error) => console.error("Error:", error));
    });
}