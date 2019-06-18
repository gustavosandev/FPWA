if ('serviceWorker' in navigator) { //Verifica se consegue registrar o SW
    navigator.serviceWorker.register('/FPWA/sw.js')
      .then(function () {
        console.log('service worker registered');  
      })
      
  }
// Aqui faremos o botão aparecer
  let deferredPrompt;
	const addBtn = document.querySelector('.add-button');
	addBtn.style.display = 'none';

	window.addEventListener('beforeinstallprompt', (e) => {
	  // Prevent Chrome 67 and earlier from automatically showing the prompt
	  e.preventDefault();
	  // Stash the event so it can be triggered later.
	  deferredPrompt = e;
	  // Mostra a notificação para o usuário
	  addBtn.style.display = 'block';

	  addBtn.addEventListener('click', (e) => {
	    // hide our user interface that shows our A2HS button
	    addBtn.style.display = 'none';
	    // Show the prompt
	    deferredPrompt.prompt();
	    // Wait for the user to respond to the prompt
	    deferredPrompt.userChoice.then((choiceResult) => {
	        if (choiceResult.outcome === 'accepted') {
	          console.log('Usuário aceito baixar');
	        } else {
	          console.log('Usuário negou');
	        }
	        deferredPrompt = null;
	      });
	  });
	});



	// Aqui vai a brincadeira de mudar cor a cada clique

	var cores = ['blue', 'red', 'yellow', 'pink', 'green', 'wheat'];

	function mudarCor() {
	  var el = document.getElementById('trocar');
	  var proximoIndex = Math.floor(Math.random() * cores.length);
	  var cor = cores[proximoIndex];
	  el.style.backgroundColor = cor;
	}
