// ==UserScript==
// @name         TypeRacer Hide Other Players
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A userscript for TypeRacer that hides all other players
// @author       Yevhenii Ushtyk (https://github.com/yevheniiushtyk)
// @match        https://play.typeracer.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideOtherPlayers() {
        const rows = document.querySelectorAll('.scoreboard .row');
        rows.forEach((row, index) => {
            if (index !== 0) {
                row.style.display = 'none';
            }
        });
    }

    function observeScoreboard() {
        const scoreboardContainer = document.querySelector('.scoreboardContainer');
        if (scoreboardContainer) {
            hideOtherPlayers();
            const observer = new MutationObserver(hideOtherPlayers);
            observer.observe(scoreboardContainer, { childList: true, subtree: true });
        }
    }

    window.addEventListener('load', function() {
        const bodyObserver = new MutationObserver(() => {
            if (document.querySelector('.scoreboardContainer')) {
                observeScoreboard();
                bodyObserver.disconnect();
            }
        });

        bodyObserver.observe(document.body, { childList: true, subtree: true });
    });

    const raceObserver = new MutationObserver(() => {
        if (document.querySelector('.scoreboardContainer')) {
            observeScoreboard();
        }
    });

    raceObserver.observe(document.body, { childList: true, subtree: true });
})();
