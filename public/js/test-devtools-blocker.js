/**
 * Test Script per Verificare l'Efficacia del DevTools Blocker
 *
 * Esegui questo script nella console del browser per testare
 * se il sistema di rimozione del bottone Next.js Dev Tools funziona correttamente.
 *
 * Uso:
 * 1. Apri DevTools (F12)
 * 2. Vai nella tab Console
 * 3. Copia e incolla questo intero script
 * 4. Premi Enter
 */

(function() {
  console.log('=== TEST DEVTOOLS BLOCKER ===\n');

  const tests = [];
  let passedTests = 0;
  let failedTests = 0;

  // Utility per test
  function test(name, testFn) {
    try {
      const result = testFn();
      if (result) {
        passedTests++;
        console.log(`✅ PASS: ${name}`);
      } else {
        failedTests++;
        console.log(`❌ FAIL: ${name}`);
      }
      tests.push({ name, passed: result });
    } catch (error) {
      failedTests++;
      console.log(`❌ ERROR: ${name} - ${error.message}`);
      tests.push({ name, passed: false, error: error.message });
    }
  }

  // TEST 1: Verifica che il bottone non esista nel DOM
  test('Il bottone #next-logo non è presente nel DOM', () => {
    const button = document.querySelector('#next-logo');
    return button === null;
  });

  // TEST 2: Verifica con data-nextjs-dev-tools-button
  test('Nessun elemento con data-nextjs-dev-tools-button', () => {
    const elements = document.querySelectorAll('[data-nextjs-dev-tools-button]');
    return elements.length === 0;
  });

  // TEST 3: Verifica con data-next-mark
  test('Nessun elemento con data-next-mark', () => {
    const elements = document.querySelectorAll('[data-next-mark]');
    return elements.length === 0;
  });

  // TEST 4: Verifica che appendChild sia stato overridden
  test('appendChild è stato modificato', () => {
    const original = Element.prototype.appendChild.toString();
    return original.includes('next-logo') || original.includes('DevTools');
  });

  // TEST 5: Verifica che insertBefore sia stato overridden
  test('insertBefore è stato modificato', () => {
    const original = Element.prototype.insertBefore.toString();
    return original.includes('next-logo') || original.includes('DevTools');
  });

  // TEST 6: Prova a creare il bottone manualmente
  console.log('\n=== TEST DI INSERIMENTO MANUALE ===');
  console.log('Tentativo di inserire il bottone manualmente...');

  const testButton = document.createElement('button');
  testButton.id = 'next-logo';
  testButton.setAttribute('data-nextjs-dev-tools-button', 'true');
  testButton.textContent = 'Test Button';

  try {
    document.body.appendChild(testButton);

    // Aspetta un momento per i controlli periodici
    setTimeout(() => {
      test('Il bottone inserito manualmente viene rimosso', () => {
        const found = document.querySelector('#next-logo');
        return found === null;
      });

      // REPORT FINALE
      console.log('\n=== REPORT FINALE ===');
      console.log(`✅ Test passati: ${passedTests}`);
      console.log(`❌ Test falliti: ${failedTests}`);
      console.log(`📊 Percentuale successo: ${Math.round((passedTests / (passedTests + failedTests)) * 100)}%`);

      if (failedTests === 0) {
        console.log('\n🎉 TUTTI I TEST SUPERATI!');
        console.log('Il sistema DevTools Blocker funziona correttamente.');
      } else {
        console.log('\n⚠️ ALCUNI TEST FALLITI');
        console.log('Verifica la configurazione del blocker.');
        console.log('\nTest falliti:');
        tests.filter(t => !t.passed).forEach(t => {
          console.log(`- ${t.name}${t.error ? ` (${t.error})` : ''}`);
        });
      }

      // Info aggiuntive
      console.log('\n=== INFORMAZIONI SISTEMA ===');
      console.log(`Browser: ${navigator.userAgent}`);
      console.log(`URL: ${window.location.href}`);
      console.log(`NODE_ENV: ${process?.env?.NODE_ENV || 'Non disponibile'}`);

      // Cerca script blocker
      const blockerScript = document.querySelector('#remove-nextjs-devtools-aggressive');
      console.log(`Script Blocker presente: ${blockerScript ? '✅ Sì' : '❌ No'}`);

    }, 1500); // Aspetta 1.5 secondi per i controlli periodici

  } catch (error) {
    console.error('❌ Errore durante il test di inserimento:', error);
  }

})();
