document.addEventListener('DOMContentLoaded', function() {
  const clockContainer = document.querySelector('[name="clock"]');
  const clockTypeSelector = clockContainer.querySelector('select');
  
  // Imposta il tipo di orologio predefinito
  clockContainer.classList.add('flip');
  
  // Riferimenti ai contenitori delle cifre
  const hourDigits = {
    first: {
      top: {
        front: document.querySelector('[name="ore"] .digit-container:first-child .digit-top:not(.flip) .front'),
        back: document.querySelector('[name="ore"] .digit-container:first-child .digit-top.flip .back')
      },
      bottom: {
        front: document.querySelector('[name="ore"] .digit-container:first-child .digit-bottom:not(.flip) .front'),
        back: document.querySelector('[name="ore"] .digit-container:first-child .digit-bottom.flip .back')
      },
      flipTop: document.querySelector('[name="ore"] .digit-container:first-child .digit-top.flip'),
      flipBottom: document.querySelector('[name="ore"] .digit-container:first-child .digit-bottom.flip')
    },
    second: {
      top: {
        front: document.querySelector('[name="ore"] .digit-container:last-child .digit-top:not(.flip) .front'),
        back: document.querySelector('[name="ore"] .digit-container:last-child .digit-top.flip .back')
      },
      bottom: {
        front: document.querySelector('[name="ore"] .digit-container:last-child .digit-bottom:not(.flip) .front'),
        back: document.querySelector('[name="ore"] .digit-container:last-child .digit-bottom.flip .back')
      },
      flipTop: document.querySelector('[name="ore"] .digit-container:last-child .digit-top.flip'),
      flipBottom: document.querySelector('[name="ore"] .digit-container:last-child .digit-bottom.flip')
    }
  };
  
  const minuteDigits = {
    first: {
      top: {
        front: document.querySelector('[name="minuti"] .digit-container:first-child .digit-top:not(.flip) .front'),
        back: document.querySelector('[name="minuti"] .digit-container:first-child .digit-top.flip .back')
      },
      bottom: {
        front: document.querySelector('[name="minuti"] .digit-container:first-child .digit-bottom:not(.flip) .front'),
        back: document.querySelector('[name="minuti"] .digit-container:first-child .digit-bottom.flip .back')
      },
      flipTop: document.querySelector('[name="minuti"] .digit-container:first-child .digit-top.flip'),
      flipBottom: document.querySelector('[name="minuti"] .digit-container:first-child .digit-bottom.flip')
    },
    second: {
      top: {
        front: document.querySelector('[name="minuti"] .digit-container:last-child .digit-top:not(.flip) .front'),
        back: document.querySelector('[name="minuti"] .digit-container:last-child .digit-top.flip .back')
      },
      bottom: {
        front: document.querySelector('[name="minuti"] .digit-container:last-child .digit-bottom:not(.flip) .front'),
        back: document.querySelector('[name="minuti"] .digit-container:last-child .digit-bottom.flip .back')
      },
      flipTop: document.querySelector('[name="minuti"] .digit-container:last-child .digit-top.flip'),
      flipBottom: document.querySelector('[name="minuti"] .digit-container:last-child .digit-bottom.flip')
    }
  };
  
  const secondDigits = {
    first: {
      top: {
        front: document.querySelector('[name="secondi"] .digit-container:first-child .digit-top:not(.flip) .front'),
        back: document.querySelector('[name="secondi"] .digit-container:first-child .digit-top.flip .back')
      },
      bottom: {
        front: document.querySelector('[name="secondi"] .digit-container:first-child .digit-bottom:not(.flip) .front'),
        back: document.querySelector('[name="secondi"] .digit-container:first-child .digit-bottom.flip .back')
      },
      flipTop: document.querySelector('[name="secondi"] .digit-container:first-child .digit-top.flip'),
      flipBottom: document.querySelector('[name="secondi"] .digit-container:first-child .digit-bottom.flip')
    },
    second: {
      top: {
        front: document.querySelector('[name="secondi"] .digit-container:last-child .digit-top:not(.flip) .front'),
        back: document.querySelector('[name="secondi"] .digit-container:last-child .digit-top.flip .back')
      },
      bottom: {
        front: document.querySelector('[name="secondi"] .digit-container:last-child .digit-bottom:not(.flip) .front'),
        back: document.querySelector('[name="secondi"] .digit-container:last-child .digit-bottom.flip .back')
      },
      flipTop: document.querySelector('[name="secondi"] .digit-container:last-child .digit-top.flip'),
      flipBottom: document.querySelector('[name="secondi"] .digit-container:last-child .digit-bottom.flip')
    }
  };
  
  // Variabili per tenere traccia del tempo corrente
  let currentHour = -1;
  let currentMinute = -1;
  let currentSecond = -1;
  
  // Aggiorna il display dell'orologio
  function updateClockDisplay() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Formato 12 ore
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const clockType = clockTypeSelector.value || 'flip';
    
    // Controlla se è necessario creare elementi dinamici per altri tipi di orologi
    if (clockType !== 'flip') {
      setupAlternativeClockType(clockType);
    } else {
      updateFlipClock(hours, minutes, seconds);
    }
  }
  
  // Aggiorna il flip clock
  function updateFlipClock(hours, minutes, seconds) {
    // Formato a due cifre
    const hourStr = hours.toString().padStart(2, '0');
    const minuteStr = minutes.toString().padStart(2, '0');
    const secondStr = seconds.toString().padStart(2, '0');
    
    // Aggiorna ore se cambiate
    if (parseInt(hourStr[0]) !== Math.floor(currentHour / 10)) {
      flipDigit(hourDigits.first, parseInt(hourStr[0]));
    }
    if (parseInt(hourStr[1]) !== currentHour % 10) {
      flipDigit(hourDigits.second, parseInt(hourStr[1]));
    }
    
    // Aggiorna minuti se cambiati
    if (parseInt(minuteStr[0]) !== Math.floor(currentMinute / 10)) {
      flipDigit(minuteDigits.first, parseInt(minuteStr[0]));
    }
    if (parseInt(minuteStr[1]) !== currentMinute % 10) {
      flipDigit(minuteDigits.second, parseInt(minuteStr[1]));
    }
    
    // Aggiorna secondi se cambiati
    if (parseInt(secondStr[0]) !== Math.floor(currentSecond / 10)) {
      flipDigit(secondDigits.first, parseInt(secondStr[0]));
    }
    if (parseInt(secondStr[1]) !== currentSecond % 10) {
      flipDigit(secondDigits.second, parseInt(secondStr[1]));
    }
    
    // Aggiorna valori correnti
    currentHour = hours;
    currentMinute = minutes;
    currentSecond = seconds;
  }
  
  // Funzione per animare il flip di una cifra
  function flipDigit(digitObj, newValue) {
    // Imposta il nuovo valore sul retro del flip top
    digitObj.top.back.textContent = newValue;
    digitObj.bottom.back.textContent = newValue;
    
    // Aggiungi la classe per attivare l'animazione
    digitObj.flipTop.classList.add('flipping');
    digitObj.flipBottom.classList.add('flipping');
    
    // Attendi il completamento dell'animazione
    setTimeout(() => {
      // Aggiorna il valore frontale
      digitObj.top.front.textContent = newValue;
      digitObj.bottom.front.textContent = newValue;
      
      // Rimuovi la classe di animazione
      digitObj.flipTop.classList.remove('flipping');
      digitObj.flipBottom.classList.remove('flipping');
    }, 600); // Durata totale delle due animazioni
  }
  
  // Configura altri tipi di orologio
  function setupAlternativeClockType(clockType) {
    // Rimuovi tutte le classi di tipo
    clockContainer.classList.remove('flip', 'segment', 'led', 'analogic');
    
    // Aggiungi la classe in base al valore selezionato
    clockContainer.classList.add(clockType);
    
    // Configura in base al tipo
    switch(clockType) {
      case 'segment':
        setupSegmentClock();
        break;
      case 'led':
        setupLEDClock();
        break;
      case 'analogic':
        setupAnalogicClock();
        break;
    }
  }
  
  // Configurazione per 7 segment clock
  function setupSegmentClock() {
    // Implementazione per l'orologio a 7 segmenti
    // ...
  }
  
  // Configurazione per LED clock
  function setupLEDClock() {
    // Implementazione per l'orologio LED
    // ...
  }
  
  // Configurazione per Analogic clock
  function setupAnalogicClock() {
    // Implementazione per l'orologio analogico
    // ...
  }
  
  // Gestisci il cambio del tipo di orologio
  clockTypeSelector.addEventListener('change', function() {
    const selectedType = this.value || 'flip';
    setupAlternativeClockType(selectedType);
  });
  
  // Imposta i valori corretti nel selettore
  clockTypeSelector.options[0].value = 'flip';
  clockTypeSelector.options[1].value = 'segment';
  clockTypeSelector.options[2].value = 'led';
  clockTypeSelector.options[3].value = 'analogic';
  
  // Inizializza l'orologio
  updateClockDisplay();
  
  // Aggiorna l'orologio ogni secondo
  setInterval(updateClockDisplay, 1000);
  
  // Aggiungi una classe CSS per l'animazione iniziale
  document.querySelectorAll('.digit-top:not(.flip), .digit-bottom:not(.flip), .digit-top.flip, .digit-bottom.flip').forEach(el => {
    el.textContent = '0';
  });
});

// Funzione ausiliaria per aggiungere un listener per la fine dell'animazione
function onAnimationEnd(element, callback) {
  const animations = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  };

  for (const animation in animations) {
    if (element.style[animation] !== undefined) {
      element.addEventListener(animations[animation], callback);
      return;
    }
  }
}