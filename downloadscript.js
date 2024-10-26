// downloadscript.js

// Function to download a file
function download(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to get the end date from input
function getEndDate() {
    const endDateInput = document.getElementById('endDate').value;
    return new Date(endDateInput);
}

// Function to display and download full date output
function downloadFullDate() {
    const endDate = getEndDate();
    const today = new Date();
    const result = [];

    if (endDate < today) {
        alert("The end date must be after today.");
        return;
    }

    while (today <= endDate) {
        const dayOfWeek = today.toLocaleString('default', { weekday: 'long' });
        const month = today.toLocaleString('default', { month: 'long' });
        const dayOfMonth = today.getDate();
        const year = today.getFullYear();
        const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

        result.push(`${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix}, ${year}`);
        today.setDate(today.getDate() + 1);
    }

    // Join results with newline character for vertical output
    download('full_date_output.txt', result.join('\n'));
}

// Function to display and download days output
function downloadDays() {
    const endDate = getEndDate();
    const today = new Date();
    const result = [];

    if (endDate < today) {
        alert("The end date must be after today.");
        return;
    }

    while (today <= endDate) {
        const dayOfMonth = today.getDate();
        result.push(dayOfMonth);
        today.setDate(today.getDate() + 1);
    }

    // Join results with newline character for vertical output
    download('days_output.txt', result.join('\n'));
}

// Function to display and download months output
function downloadMonths() {
    const endDate = getEndDate();
    const today = new Date();
    const result = [];

    if (endDate < today) {
        alert("The end date must be after today.");
        return;
    }

    while (today <= endDate) {
        const month = today.toLocaleString('default', { month: 'long' });
        const monthIndex = today.getMonth() + 1; // Months are 0-indexed
        result.push(`${monthIndex}. ${month}`);
        today.setMonth(today.getMonth() + 1);
    }

    // Join results with newline character for vertical output
    download('months_output.txt', result.join('\n'));
}

// Function to display and download years output
function downloadYears() {
    const endDate = getEndDate();
    const today = new Date();
    const result = [];

    if (endDate < today) {
        alert("The end date must be after today.");
        return;
    }

    while (today <= endDate) {
        const year = today.getFullYear();
        result.push(`${year}`);
        today.setFullYear(today.getFullYear() + 1);
    }

    // Join results with newline character for vertical output
    download('years_output.txt', result.join('\n'));
}

// Event listeners for download buttons
document.getElementById('downloadFullDateBtn').addEventListener('click', downloadFullDate);
document.getElementById('downloadDaysBtn').addEventListener('click', downloadDays);
document.getElementById('downloadMonthsBtn').addEventListener('click', downloadMonths);
document.getElementById('downloadYearsBtn').addEventListener('click', downloadYears);

// Function to get ordinal suffix
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