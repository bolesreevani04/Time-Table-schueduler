document.getElementById('timetable-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const startTime = document.getElementById('startTime').value;
    const totalTime = parseInt(document.getElementById('totalTime').value) * 60; // convert hours to minutes
    const numberOfChapters = parseInt(document.getElementById('chapters').value);

    const scheduleList = document.getElementById('schedule-list');
    scheduleList.innerHTML = ''; // Clear the previous schedule

    let studySession = 45; // 45 minutes study session
    let breakSession = 10; // 10 minutes break
    let totalMinutes = 0;
    let chaptersCovered = 0;
    let currentTime = new Date(`1970-01-01T${startTime}:00`); // starting time

    while (totalMinutes < totalTime && chaptersCovered < numberOfChapters) {
        let start = formatTime(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + studySession);
        let end = formatTime(currentTime);
        chaptersCovered++;
        totalMinutes += studySession;

        const listItem = document.createElement('li');
        listItem.textContent = `Study Chapter ${chaptersCovered} from ${start} to ${end}.`;

        scheduleList.appendChild(listItem);

        if (totalMinutes < totalTime && chaptersCovered < numberOfChapters) {
            currentTime.setMinutes(currentTime.getMinutes() + breakSession);
            totalMinutes += breakSession;
        }
    }

    document.getElementById('timetable-form').reset();
});

function formatTime(date) {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
