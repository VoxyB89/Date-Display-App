document.getElementById('showFullDateBtn').addEventListener('click', function() {
    displayFullDate();
});

document.getElementById('showDaysBtn').addEventListener('click', function() {
    displayDays();
});

document.getElementById('showMonthsBtn').addEventListener('click', function() {
    displayMonths();
});

document.getElementById('showYearsBtn').addEventListener('click', function() {
    displayYears();
});

function displayFullDate() {
    const endDateInput = document.getElementById('endDate').value;
    const fullDateDisplay = document.getElementById('fullDateDisplay');

    if (!endDateInput) {
        fullDateDisplay.textContent = "Please select an end date.";
        return;
    }

    const endDate = new Date(endDateInput);
    const today = new Date();
    const result = [];

    // Ensure the end date is after today
    if (endDate < today) {
        fullDateDisplay.textContent = "The end date must be after today.";
        return;
    }

    // Display all days from today to the end date
    while (today <= endDate) {
        const dayOfWeek = today.toLocaleString('default', { weekday: 'long' });
        const month = today.toLocaleString('default', { month: 'long' });
        const dayOfMonth = today.getDate();
        const year = today.getFullYear();
        const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

        result.push(`${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix}, ${year}`);
        today.setDate(today.getDate() + 1);
    }

    fullDateDisplay.textContent = result.join(', ');
}

function displayDays() {
    const endDateInput = document.getElementById('endDate').value;
    const daysDisplay = document.getElementById('daysDisplay');

    if (!endDateInput) {
        daysDisplay.textContent = "Please select an end date.";
        return;
    }

    const endDate = new Date(endDateInput);
    const today = new Date();
    const result = [];

    // Ensure the end date is after today
    if (endDate < today) {
        daysDisplay.textContent = "The end date must be after today.";
        return;
    }

    // Display all days from today to the end date
    while (today <= endDate) {
        const dayOfMonth = today.getDate();
        result.push(dayOfMonth);
        today.setDate(today.getDate() + 1);
    }

    daysDisplay.textContent = result.join(', ');
}

function displayMonths() {
    const endDateInput = document.getElementById('endDate').value;
    const monthsDisplay = document.getElementById('monthsDisplay');

    if (!endDateInput) {
        monthsDisplay.textContent = "Please select an end date.";
        return;
    }

    const endDate = new Date(endDateInput);
    const today = new Date();
    const result = [];

    // Ensure the end date is after today
    if (endDate < today) {
        monthsDisplay.textContent = "The end date must be after today.";
        return;
    }

    // Display all months from today to the end date
    while (today <= endDate) {
        const month = today.toLocaleString('default', { month: 'long' });
        const monthIndex = today.getMonth() + 1; // Months are 0-indexed
        result.push(`${monthIndex}. ${month}`);
        today.setMonth(today.getMonth() + 1);
    }

    monthsDisplay.textContent = result.join(', ');
}

function displayYears() {
    const endDateInput = document.getElementById('endDate').value;
    const yearsDisplay = document.getElementById('yearsDisplay');

    if (!endDateInput) {
        yearsDisplay.textContent = "Please select an end date.";
        return;
    }

    const endDate = new Date(endDateInput);
    const today = new Date();
    const result = [];

    // Ensure the end date is after today
    if (endDate < today) {
        yearsDisplay.textContent = "The end date must be after today.";
        return;
    }

    // Display all years from today to the end date
    while (today <= endDate) {
        const year = today.getFullYear();
        result.push(`${year}`);
        today.setFullYear(today.getFullYear() + 1);
    }

    yearsDisplay.textContent = result.join(', ');
}

function getOrdinalSuffix(day) {
    if (day % 10 === 1 && day % 100 !== 11) {
        return 'st';
    } else if (day % 10 === 2 && day % 100 !== 12) {
        return 'nd';
    } else if (day % 10 === 3 && day % 100 !== 13) {
        return 'rd';
    } else {
        return 'th';
    }
}