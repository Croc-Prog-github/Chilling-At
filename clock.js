document.addEventListener('DOMContentLoaded', function() {
  const clockContainer = document.querySelector('[name="clock"]');
  const clockTypeSelector = clockContainer.querySelector('select');
  const hoursElem = clockContainer.querySelector('[name="ore"]');
  const minutesElem = clockContainer.querySelector('[name="minuti"]');
  const secondsElem = clockContainer.querySelector('[name="secondi"]');
  
  // Imposta il tipo di orologio predefinito
  clockContainer.classList.add('scrolling');
  
  // Aggiorna il display degli orologi
  function updateClockDisplay() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Formato 12 ore
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const clockType = clockTypeSelector.value || 'scrolling';
    
    // Aggiorna in base al tipo di orologio
    switch(clockType) {
      case 'scrolling':
        updateScrollingClock(hours, minutes, seconds);
        break;
      case 'segment':
        updateSegmentClock(hours, minutes, seconds);
        break;
      case 'led':
        updateLEDClock(hours, minutes, seconds);
        break;
      case 'analogic':
        // L'orologio analogico è gestito dalle animazioni CSS
        // Sincronizziamo solo le posizioni iniziali
        updateAnalogicClock(hours, minutes, seconds);
        break;
    }
  }
  
  // Gestisce l'orologio a scorrimento
  function updateScrollingClock(hours, minutes, seconds) {
    hoursElem.innerHTML = `<span>${hours.toString().padStart(2, '0')}</span>`;
    minutesElem.innerHTML = `<span>${minutes.toString().padStart(2, '0')}</span>`;
    secondsElem.innerHTML = `<span>${seconds.toString().padStart(2, '0')}</span>`;
  }
  
  // Gestisce l'orologio a 7 segmenti
  function updateSegmentClock(hours, minutes, seconds) {
    // Pulisci precedenti segmenti
    clearClockElements();
    
    // Crea segmenti per ogni elemento
    createSegmentsForDigit(hoursElem, hours);
    createSegmentsForDigit(minutesElem, minutes);
    createSegmentsForDigit(secondsElem, seconds);
  }
  
  // Crea i segmenti per ogni cifra
  function createSegmentsForDigit(element, number) {
    const strNumber = number.toString().padStart(2, '0');
    
    // Mappa di quali segmenti devono essere accesi per ogni numero
    const segmentMaps = {
      '0': [true, true, true, true, true, true, false],
      '1': [false, true, true, false, false, false, false],
      '2': [true, true, false, true, true, false, true],
      '3': [true, true, true, true, false, false, true],
      '4': [false, true, true, false, false, true, true],
      '5': [true, false, true, true, false, true, true],
      '6': [true, false, true, true, true, true, true],
      '7': [true, true, true, false, false, false, false],
      '8': [true, true, true, true, true, true, true],
      '9': [true, true, true, true, false, true, true]
    };
    
    // Primo carattere
    const firstDigit = strNumber[0];
    const firstSegments = segmentMaps[firstDigit];
    
    // Crea i segmenti
    const segmentNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    
    // Crea i 7 segmenti
    for (let i = 0; i < 7; i++) {
      const segment = document.createElement('div');
      segment.className = `segment-${segmentNames[i]}`;
      if (firstSegments[i]) {
        segment.classList.add('segment-on');
      }
      element.appendChild(segment);
    }
  }
  
  // Gestisce l'orologio LED
  function updateLEDClock(hours, minutes, seconds) {
    // Pulisci precedenti LED
    clearClockElements();
    
    // Crea matrice LED per ogni elemento
    createLEDMatrixForDigit(hoursElem, hours);
    createLEDMatrixForDigit(minutesElem, minutes);
    createLEDMatrixForDigit(secondsElem, seconds);
  }
  
  // Crea matrice LED per ogni cifra
  function createLEDMatrixForDigit(element, number) {
    const strNumber = number.toString().padStart(2, '0');
    
    // Matrice di quali LED devono essere accesi per ogni numero (5x7 matrice)
    const ledMatrices = {
      '0': [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0]
      ],
      '1': [
        [0,0,1,0,0],
        [0,1,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,1,1,1,0]
      ],
      // Matrice per le altre cifre (similari a quelle sopra)
      '2': [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [0,0,0,0,1],
        [0,0,1,1,0],
        [0,1,0,0,0],
        [1,0,0,0,0],
        [1,1,1,1,1]
      ],
      '3': [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [0,0,0,0,1],
        [0,0,1,1,0],
        [0,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0]
      ],
      '4': [
        [0,0,0,1,0],
        [0,0,1,1,0],
        [0,1,0,1,0],
        [1,0,0,1,0],
        [1,1,1,1,1],
        [0,0,0,1,0],
        [0,0,0,1,0]
      ],
      '5': [
        [1,1,1,1,1],
        [1,0,0,0,0],
        [1,1,1,1,0],
        [0,0,0,0,1],
        [0,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0]
      ],
      '6': [
        [0,1,1,1,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0]
      ],
      '7': [
        [1,1,1,1,1],
        [0,0,0,0,1],
        [0,0,0,1,0],
        [0,0,1,0,0],
        [0,1,0,0,0],
        [0,1,0,0,0],
        [0,1,0,0,0]
      ],
      '8': [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0]
      ],
      '9': [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,1],
        [0,0,0,0,1],
        [0,0,0,0,1],
        [0,1,1,1,0]
      ]
    };
    
    // Primo carattere
    const firstDigit = strNumber[0];
    const firstLEDs = ledMatrices[firstDigit];
    
    // Crea i LED
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        const led = document.createElement('div');
        led.className = 'led-dot';
        if (firstLEDs[row][col] === 1) {
          led.classList.add('led-on');
        }
        element.appendChild(led);
      }
    }
  }
  
  // Gestisce l'orologio analogico
  function updateAnalogicClock(hours, minutes, seconds) {
    // Calcola gli angoli per le lancette
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;
    
    // Applica gli angoli direttamente come stili inline
    // Questo sovrascrive le animazioni CSS, ma sincronizza l'ora iniziale
    hoursElem.style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
    minutesElem.style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    secondsElem.style.transform = `translate(-50%, -100%) rotate(${secondAngle}deg)`;
    
    // Rimuovi gli stili dopo un breve delay per lasciare che le animazioni CSS riprendano
    setTimeout(() => {
      hoursElem.style.transform = '';
      minutesElem.style.transform = '';
      secondsElem.style.transform = '';
    }, 1000);
  }
  
  // Pulisci elementi dell'orologio
  function clearClockElements() {
    hoursElem.innerHTML = '';
    minutesElem.innerHTML = '';
    secondsElem.innerHTML = '';
  }
  
  // Gestisci il cambio del tipo di orologio
  clockTypeSelector.addEventListener('change', function() {
    // Rimuovi tutte le classi di tipo
    clockContainer.classList.remove('scrolling', 'segment', 'led', 'analogic');
    
    // Aggiungi la classe in base al valore selezionato
    const selectedType = this.value || 'scrolling';
    clockContainer.classList.add(selectedType);
    
    // Aggiorna l'orologio
    updateClockDisplay();
  });
  
  // Imposta i valori corretti nel selettore
  clockTypeSelector.options[0].value = 'scrolling';
  clockTypeSelector.options[1].value = 'segment';
  clockTypeSelector.options[2].value = 'led';
  clockTypeSelector.options[3].value = 'analogic';
  
  // Aggiorna l'orologio ogni secondo
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);
});