//Calendar script (generation & changing)
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendarAPI');

  // Dichiarazione delle variabili e cambiamento della vista
  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();

  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  async function fetchNationalHolidays(year) {
    const response = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${year}/IT`);
    if (!response.ok) {
    console.error("Failed to fetch holidays");
    return [];
    }
    const holidays = await response.json();
    return holidays.map(holiday => {
    const date = new Date(holiday.date);
    return { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
    });
  }

  var viewSelector = document.getElementById('viewSelector');
  viewSelector.addEventListener('change', function (){
    switch (this.value) {
    case 'daily':
    generateDailyView();
    break;
    case 'weekly':
    generateWeeklyView();
    break;
    case 'yearly':
    generateYearlyView(currentYear);
    break;
    default:
      generateCalendar(currentYear, currentMonth);
    }
  });

  // Funzioni per generare il calendario----------------------------------
  async function generateCalendar(year, month) {
    calendarEl.innerHTML = ""; // Cancella il calendario precedente

    const holidays = await fetchNationalHolidays(year);

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    // Crea l'intestazione
    var header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '10px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';

    var prevButton = document.createElement('span');
    prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>';
    prevButton.style.cursor = 'pointer';
    prevButton.classList.add('arrow');
    prevButton.onclick = function () {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentYear, currentMonth);
    };

    var nextButton = document.createElement('span');
    nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>';
    nextButton.style.cursor = 'pointer';
    nextButton.classList.add('arrow');
    nextButton.onclick = function () {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentYear, currentMonth);
    };

    var title = document.createElement('strong');
    title.textContent = `${monthNames[month]} ${year}`;

    header.appendChild(prevButton);
    header.appendChild(title);
    header.appendChild(nextButton);

    calendarEl.appendChild(header);

    // Crea i giorni della settimana
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var daysRow = document.createElement('div');
    daysRow.style.display = 'flex';
    daysRow.style.justifyContent = 'space-between';
    daysRow.style.fontWeight = 'bold';
    daysRow.style.borderBottom = '1px solid #ccc';
    daysOfWeek.forEach(day => {
    var dayEl = document.createElement('div');
    dayEl.style.flex = '1';
    dayEl.style.textAlign = 'center';
    dayEl.textContent = day;
    daysRow.appendChild(dayEl);
    });
    calendarEl.appendChild(daysRow);

    // Crea la griglia del calendario
    var grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    grid.style.gap = '1px';

    // Aggiungi spazi vuoti per i giorni prima del primo giorno del mese
    for (var i = 0; i < firstDay; i++) {
    var emptySlot = document.createElement('div');
    emptySlot.style.height = '40px';
    grid.appendChild(emptySlot);
    }

    // Aggiungi i giorni del mese
    for (var day = 1; day <= daysInMonth; day++) {
      var daySlot = document.createElement('div');
      daySlot.style.height = '40px';
      daySlot.style.textAlign = 'center';
      daySlot.style.lineHeight = '40px';
      daySlot.style.border = '1px solid #ccc';
      daySlot.textContent = day;

      // Controlla se il giorno è una festività
      if (holidays.some(holiday => holiday.day === day && holiday.month === month && holiday.year === year)) {
        daySlot.style.textDecoration = 'underline red';
      }

      // Controlla se il giorno è oggi
      if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        daySlot.style.textDecoration = 'underline';
        daySlot.style.textDecorationStyle = 'double';
        daySlot.style.textDecorationColor = 'dodgerblue';
      }

      grid.appendChild(daySlot);
    }

    calendarEl.appendChild(grid);
  }

  function generateDailyView() {  // Genera e posiziona la vista giornaliera
    calendarEl.innerHTML = ""; // Cancella la vista precedente
    var header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '10px';
    header.innerHTML = `<strong>${today.toDateString()}</strong>`;
    calendarEl.appendChild(header);

    var hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    var currentHour = today.getHours();

    hours.forEach((hour, index) => {
    var hourSlot = document.createElement('div');
    hourSlot.style.border = '1px solid #ccc';
    hourSlot.style.height = '40px';
    hourSlot.style.lineHeight = '40px';
    hourSlot.style.position = 'relative';
    hourSlot.textContent = hour;

    // Aggiungi una linea per l'orario attuale
    if (index === currentHour) {
      var currentTimeLine = document.createElement('div');
      currentTimeLine.style.position = 'absolute';
      var currentMinutes = today.getMinutes();
      currentTimeLine.style.top = `${(currentMinutes / 60) * 100}%`; // Proporzione tra 100% e 60 minuti
      currentTimeLine.style.left = '0';
      currentTimeLine.style.width = '100%';
      currentTimeLine.style.height = '2px';
      currentTimeLine.style.backgroundColor = 'dodgerblue';
      currentTimeLine.style.transform = 'translateY(-50%)';
      hourSlot.appendChild(currentTimeLine);
    }

    calendarEl.appendChild(hourSlot);
    });
  }

  function generateWeeklyView() { // Genera e posiziona la vista settimanale
    calendarEl.innerHTML = ""; // Cancella la vista precedente
    var header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '10px';
    header.innerHTML = `<strong>Week of ${today.toDateString()}</strong>`;
    calendarEl.appendChild(header);

    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    grid.style.gap = '1px';

    daysOfWeek.forEach(day => {
    var daySlot = document.createElement('div');
    daySlot.style.border = '1px solid #ccc';
    daySlot.style.height = '40px';
    daySlot.style.textAlign = 'center';
    daySlot.style.lineHeight = '40px';
    daySlot.textContent = day;
    grid.appendChild(daySlot);
    });

    calendarEl.appendChild(grid);
  }

  function generateYearlyView(year) {  // Genera e posiziona la vista annuale
    calendarEl.innerHTML = ""; // Cancella la vista precedente
    var header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '10px';
    header.innerHTML = `<strong>${year}</strong>`;
    calendarEl.appendChild(header);

    var grid = document.createElement('div');
    grid.style.display = 'grid';
    var parentWidth = calendarEl.offsetWidth;
    var columns = Math.floor(parentWidth / 150); // Regola 150px come larghezza minima per una colonna
    grid.style.gridTemplateColumns = `repeat(${columns}, ${100 / columns}%)`;
    grid.style.gap = '10px';

    for (var month = 0; month < 12; month++) {
    var monthDiv = document.createElement('div');
    monthDiv.style.border = '1px solid rgb(204, 204, 204)';
    monthDiv.style.textAlign = 'center';
    monthDiv.style.alignContent = 'center';
    monthDiv.style.padding = '5px';
    monthDiv.innerHTML = `<strong>${monthNames[month]}</strong>`;
    grid.appendChild(monthDiv);
    }

    calendarEl.appendChild(grid);
  }

  generateCalendar(currentYear, currentMonth);
});