(function() {
    'use strict';

    window.addEventListener('load', init);

    function init() {
    let randBtn = id('randomize-btn');
    randBtn.addEventListener('click', refreshPokemon);
    let startButton = id('start-btn');
    startButton.addEventListener('click', startGenerator);

    }

    //Hides start button and loads cards

    function startGenerator(){
        let game = id('board');
        let title = id('title-view');
        let start = id('start-btn')
        game.classList.remove('hidden');
        title.classList.add('hidden');
        start.classList.add('hidden');

        randomizePokemon();
    }

    //Removes all cards and replaces with new ones

    function refreshPokemon() {
        const mat = id('mat');
        const cards = qsa('.card');
    
        cards.forEach(card => mat.removeChild(card)); 
    
        randomizePokemon(); 
    }

    //  1st api functions. Gets one of each pokemon type
    
    function randomizePokemon(){
        for(let i=1; i<=18; i++){

        fetch(url+i)
            .then(statusCheck)
            .then((response) => response.json())
            .then(addPokemon)
            .catch(pokemonError);
        }
    }

    // 2nd api function. Picks a random pokemon from the type given then pulls an image of it

    function addPokemon(response) {
        let mat = id('mat');
        let pals = response.pokemon;
        let pal = pals[Math.floor(Math.random() * pals.length)];
        let pokemonName = pal.pokemon.name;
    
        
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add(`${response.name}`);
    
        
        mat.appendChild(card);
    
    
    
        fetch(url2+pokemonName)
            .then(statusCheck)
            .then(res => res.json())
            .then(data => addImgAndName(data, card))
            .catch(pokemonError);
    }

    // Adds image and name to the card
    
    function addImgAndName(response, card) {
        let img = document.createElement('img');
        img.src = response.sprites.front_default;
        img.alt = response.name;
        card.appendChild(img);
    
        let name = document.createElement('p');
        name.textContent = response.name
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // <= got help with this part from chat gpt, it makes the names 
            .join(' ');                                                 //    capitalized and replaces dashes with spaces
        card.appendChild(name);
    }


    function pokemonError(error){
        console.log(error);
    }

    /////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
   
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();