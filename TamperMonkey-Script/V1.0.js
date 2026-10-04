// ==UserScript==
// @name         SS ESP + AIMBOT
// @namespace    https://greasyfork.org/users/1603179-caringjellyemu
// @version      1.0
// @author       Sh0tgvn45Off || github
// @license      GPL-3.0-only
// @match        *://*.shellshock.io/*
// @match        *://*.algebra.best/*
// @match        *://*.algebra.monster/*
// @match        *://*.algebra.vip/*
// @match        *://*.biologyclass.club/*
// @match        *://*.combateggs.com/*
// @match        *://*.deadlyegg.com/*
// @match        *://*.deathegg.life/*
// @match        *://*.deathegg.world/*
// @match        *://*.eggbattle.com/*
// @match        *://*.eggboy.club/*
// @match        *://*.eggboy.me/*
// @match        *://*.eggboy.xyz/*
// @match        *://*.eggcombat.com/*
// @match        *://*.egg.dance/*
// @match        *://*.eggfacts.fun/*
// @match        *://*.egggames.best/*
// @match        *://*.egghead.institute/*
// @match        *://*.eggisthenewblack.com/*
// @match        *://*.eggsarecool.com/*
// @match        *://*.eggshock.com/*
// @match        *://*.eggshock.me/*
// @match        *://*.eggshock.net/*
// @match        *://*.eggshooter.best/*
// @match        *://*.eggshooter.com/*
// @match        *://*.eggwarfare.com/*
// @match        *://*.eggwars.io/*
// @match        *://*.geometry.best/*
// @match        *://*.geometry.monster/*
// @match        *://*.geometry.pw/*
// @match        *://*.geometry.report/*
// @match        *://*.hardboiled.life/*
// @match        *://*.hardshell.life/*
// @match        *://*.humanorganising.org/*
// @match        *://*.mathactivity.club/*
// @match        *://*.mathactivity.xyz/*
// @match        *://*.mathdrills.info/*
// @match        *://*.mathdrills.life/*
// @match        *://*.mathfun.rocks/*
// @match        *://*.mathgames.world/*
// @match        *://*.math.international/*
// @match        *://*.mathlete.fun/*
// @match        *://*.mathlete.pro/*
// @match        *://*.overeasy.club/*
// @match        *://*.risenegg.com/*
// @match        *://*.scrambled.tech/*
// @match        *://*.scrambled.today/*
// @match        *://*.scrambled.us/*
// @match        *://*.scrambled.world/*
// @match        *://*.shellgame.me/*
// @match        *://*.shellplay.live/*
// @match        *://*.shellshockers.best/*
// @match        *://*.shellshockers.ca/*
// @match        *://*.shellshockers.club/*
// @match        *://*.shellshockers.life/*
// @match        *://*.shellshockers.site/*
// @match        *://*.shellshockers.today/*
// @match        *://*.shellshockers.us/*
// @match        *://*.shellshockers.website/*
// @match        *://*.shellshockers.wiki/*
// @match        *://*.shellshockers.world/*
// @match        *://*.shellshockers.xyz/*
// @match        *://*.shellshock.guru/*
// @match        *://*.shellsocks.com/*
// @match        *://*.softboiled.club/*
// @match        *://*.urbanegger.com/*
// @match        *://*.violentegg.club/*
// @match        *://*.violentegg.fun/*
// @match        *://*.yolk.best/*
// @match        *://*.yolk.life/*
// @match        *://*.yolk.monster/*
// @match        *://*.yolk.rocks/*
// @match        *://*.yolk.tech/*
// @match        *://*.yolk.quest/*
// @match        *://*.yolk.today/*
// @match        *://*.zygote.cafe/*
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://cdn.jsdelivr.net/npm/babylonjs@7.15.0/babylon.min.js
// @description  shellshock.io aimbot. Hold RMB to snap to nearest enemy (with optional lead/prediction). Press V to toggle red wireframe ESP boxes + tracers (see through walls). Press ` (backtick) to show/hide the settings menu.
// @supportURL   https://greasyfork.org/users/1603179-caringjellyemu
// @downloadURL https://update.greasyfork.org/scripts/578477/Shell%20Shockers%20Aimbot%20%2B%20ESP.user.js
// @updateURL https://update.greasyfork.org/scripts/578477/Shell%20Shockers%20Aimbot%20%2B%20ESP.meta.js
// ==/UserScript==

/*
 * Shell Shockers Aimbot + ESP
 * Copyright (c) 2026 caringjellyemu. All rights reserved where applicable.
 *
 * Licensed under the GNU General Public License v3.0 only (GPL-3.0-only).
 * You are free to use, study, modify, and redistribute this software under
 * the terms of that license, PROVIDED THAT:
 *   1. This copyright notice and the attribution below are preserved intact
 *      in all copies and derivative works.
 *   2. Any redistribution or derivative work remains licensed under
 *      GPL-3.0-only and discloses its complete corresponding source.
 *   3. The original author(s) are credited and not misrepresented as the
 *      author of an unmodified or trivially-modified copy.
 *
 * Removing or altering these notices, or republishing this work (in whole or
 * in part) under different authorship, violates the GPL-3.0 license and is
 * grounds for a takedown / attribution complaint.
 *
 * ── Attribution / lineage ──────────────────────────────────────────────────
 * This script is a derivative work. Portions originate from:
 *   • onlypuppy7 — "LibertyMutualV1" (GPL-3.0)
 *       https://github.com/onlypuppy7/LibertyMutualShellShockers/
 *   • a reference client — `predictPosition` lead/gravity algorithm (ported)
 * Original authorship of the modifications and additions herein:
 *   • Sh0tgvn45Off — 2026
 * ────────────────────────────────────────────────────────────────────────────
 */

(function () {
    'use strict';

    // ────────────────────────────────────────────────────────────────────────
    // STATE + SETTINGS
    // ────────────────────────────────────────────────────────────────────────
    let RMB = false;
    let H = {};
    const ss = {};

    // Page-realm window. Tampermonkey (and any manager that runs the userscript
    // in an isolated "sandbox" world) gives us our OWN copies of HTMLElement /
    // EventTarget whose prototypes the game — running in the page realm — never
    // touches. Patching them there silently does nothing. unsafeWindow is the
    // page's real window, so it wont unsafeWindow.HTMLElement.prototype IS the prototype
    // the game uses. Under Violentmonkey's page-realm injection unsafeWindow ===
    // window, so this stays a no-op / backward compatible there.
    const PAGE = (typeof unsafeWindow !== 'undefined' && unsafeWindow) || window;

    // Per-frame snapshot. `hasLock` is true only on frames where RMB is held
    // and a valid enemy was picked — it drives the overlay's
    // "locked, idle / lead / waiting" state line. `me` is a cached reference
    // to the local player (used by the Nyx banner).
    const _aim = {
        hasLock: false,
        me: null,
        // Anti-bloom offset EMA (see predictBloomSmooth). Persists the applied
        // yaw/pitch correction across frames so, when Bloom Smooth is on, it
        // settles instead of leaping to a new random value every shot.
        bloomYaw: 0, bloomPitch: 0, bloomTarget: null,
    };
    const _pred = {
        enabled: false, active: false, airborne: false,
        speed: 0, t: 0, leadDist: 0, projSpeed: 0,
    };
    let nyxBannerEl = null;
    // Auto-chat state (see the per-frame sender further down).
    let _autoChatLast = 0;   // Date.now() of the last message we sent
    let _autoChatIdx  = 0;    // rotates through the pipe-separated message list
    let _autoChatPrev = '';   // last text sent, to dodge the dup-message filter
    let _chatPending  = '';   // a reply/spam line waiting for the send cooldown
    let _lastChatSeen = '';   // signature of the newest chat row we've handled
    // Tuning constants — picked, not exposed in the menu.
    const SENSITIVITY           = 0.0025; // mouse-pixels → yaw radians
    const PROJECTILE_SPEED      = 80;     // fallback bullet speed when weapon lookup fails
    // Prediction now runs in the game's native PER-TICK units inside
    // predictPositionSF (gravity -0.012/tick², terminal 0.29/tick, +1-tick lead
    // bias), reading the game's own velocity vector — no per-second conversion
    // or mesh-derived velocity tracking is needed anymore.

    const SETTINGS_KEY = 'ssh_settings_v1';
    const DEFAULT_SETTINGS = {
        aimEnabled:  true,
        autoAim:     false, // ON = aim continuously without holding RMB (holds it for you)
        crosshairTarget: false, // ON = target the enemy nearest your crosshair; OFF = nearest by distance
        onlyVisible: false, // ON = never target enemies behind walls; OFF = prioritise visible, fall back to nearest
        espEnabled:  false,
        predEnabled: true,
        antiBloom:   false, // ON = offset aim by the predicted bloom so the bloomed shot lands on target
        bloomSmooth: false, // ON (with antiBloom) = EMA-smooth the bloom offset so it settles instead of leaping every shot
        silentAim:   false, // ON = redirect the shot to target WITHOUT moving the camera (ported from a reference client)
        semiSilent:  false, // ON (with silentAim) = also snap the camera to target right AFTER the shot
        silentSync:  true, // ON = rewrite the netcode flush so silent-aim hits register (RISKY, needs reload)

        unlockSkins: true,
        itemEsp:     true,
        menuVisible: true,

        // ── Auto chat (spammer) ──
        // Ported idea from the a reference client: rotate through a list of
        // messages and send them into game chat on an interval.
        autoChat:      false,
        autoChatText:  'gg | nice shot | shellhax on top',
        autoChatDelay: 4000, // ms between messages (game flood-protects fast chat)
        // Trigger-word auto-reply: when someone's chat line contains a keyword,
        // fire back the matching canned response (ported from a reference client's mock).
        chatResponder: false,

        // ── ESP visuals ──
        espColor:      '#ff3333', // enemy box / tracer color
        nyxColor:      '#b34dff', // color for players whose name starts with "Nyx"
        espBoxStyle:   'full',    // 'full' | 'corners'
        nameTags:      false,     // enlarge the game's native name + see through walls

        // ── Menu theme ──
        themeAccent:   '#ff3b3b', // title + accents
        themeBg:       '#000000', // panel background color (blended with opacity)
        themeText:     '#ffffff', // menu text color
        themeBorder:   '#000000', // panel border color
        themeOpacity:  82,        // panel background opacity, percent (0..100)
        themeRadius:   6,         // corner radius, px (0 = sharp)
        themeBorderW:  1,         // border thickness, px (0 = none)
        themeFont:     'system',  // font family: system | mono | serif | rounded
        themeFontSize: 12,        // base text size, px
        themeBlur:     0,         // backdrop blur, px (frosted glass)
        themeGlow:     false,     // accent glow around the panel
        themeLeft:     null,      // saved menu position (drag to move)
        themeTop:      null,
    };
    const settings = Object.assign({}, DEFAULT_SETTINGS);
    try {
        const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
        Object.assign(settings, saved);
        delete settings.noSpread;        // removed: old spread-zero flag
        delete settings.antiBloomManual; // removed: anti-bloom manual mode
        if (typeof settings.antiBloom !== 'boolean') settings.antiBloom = false;
        if (typeof settings.bloomSmooth !== 'boolean') settings.bloomSmooth = false;
    } catch (e) {}
    function saveSettings() {
        try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
        // Mirror to the page's global so bundle-side patches can read these
        // flags without crossing the userscript sandbox.
        try { unsafeWindow.ssh_skinUnlock  = settings.unlockSkins; } catch (e) {}
    }
    try { unsafeWindow.ssh_skinUnlock = settings.unlockSkins; } catch (e) {}
    let refreshMenu = () => {}; // replaced by buildMenu() once DOM exists

    const log = (...a) =>
        console.log('%cShellhax', 'color:#000;background:#ff0;padding:2px 6px;border-radius:4px;font-weight:bold', ...a);
    log('started');

    // Robbie the rooster (the mascot). Photos embedded as downscaled data
    // URIs so the puzzle lock-screen works in a standalone userscript.
    const ROBBIE_PHOTOS = [
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAtKADAAQAAAABAAAA8AAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgA8AC0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABwcHBwcHDAcHDBEMDAwRFxEREREXHhcXFxcXHiQeHh4eHh4kJCQkJCQkJCsrKysrKzIyMjIyODg4ODg4ODg4OP/bAEMBCQkJDg0OGQ0NGTsoISg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//dAAQADP/aAAwDAQACEQMRAD8A6VTcRokc5TLjaxyyMT9w+5HAPWvBb6Job6aLLYDn0br+dewLds+2OBipb7xzu6+x56gd6818VRxRaq8kaqgdQwAyvv8ASuak1eyHe5z0hzgZGDxyOOf/AK9fRPgO4F1oUJIB2OAdrEH5129OB1FfPRyU3DPBBGCDwDmvYvhtcgWVxC2393843Ln7rcdPrXXSepFRaHd+dGpTJf5cAAgMBtbbyRk/rVWe0VlcxiEttcbgcN8rcev86oXVytvfXCRjADMVw38JGeh96uJqCPL5cucFjgOuRjbk88968id4yaQ0yozkTvtSQDewDZ35JXHvUbTRNB88oYhVIDDkEHHP/wCqpjscg24UsfL5RsYx145qhFC2zAlYAqSQ65B+bOOKyad9AsJJC8LLIY8Ll8FDjv8A57VX+0Fo32uT8sfyvwePXGP5VrvsYCFUXdvJGxsEHb6VRdMYQuyAxgMWXjg45I7VSV9RNEf7tV2iM48xs7G9fXpmnW1wxXCS4/dtnevv+FQxwPLK7xpmFZMbkbAz9KntEyvEjLsRwd49/UU0hWHzXEjxlCsTnYnPfHHqP61B5rolwBG6/Op4J9uwOKe8dr5ExjjRi4Q8HnHpmmRzxKZLdt4G9AcHI/Xmnzdv62EOWRG8wiYbjKoIfnHHtjn60+e4YI+9EkLSEYB5wDnuOOnrSSus3+jIVKs+QjDaeKzRbR+aBsKqHLnDckdOn40pLsDL3nLLbyyQq+SVAK9M8dhx7VFp/wBqSWRxLubKrgjpzntinGJojGsTtH5kjBlPPBzkjFSW9vcgrEpWQtIS2D0298fSm9NbFXVjRvLy6hmuPlV8KFGDnt+PrVF7ySK43wxlFSIAKmBjJwfuHnpWksLPbSwvHgzyYVlOcgHj09KoyW1xC0pgk+VjsG4dDwv0x+NX7NSWgbklpqiJ5UYkZCMuwbqSev3hnv610Fsb+4hVVuE3yEFvl6dW659cVzMojMroHVmUBBjse/TPrWhbxu0whWFSERiZM4yO56dRioUuWVh3IZrGa7md762Wd1YqHweg/D1zUf8AY8H/AD4J+R/+Jq5DYps/epMWJydrHGTye/qal+wwf88rj/vpv8aTgrlH/9CxKluFWRFPzDcOM9sjpz1BzXFeK4cJDOOQvykq2ensfYiu+WO3hCqeI1XjPHv95ffNcz4kt0l010cb2jwwJAOeo6jtjHWuKD967Jj3PNYSjJt45Hfj/PSvT/hjdKNQltxuy6EqFI9Md+vNeZwxhPl7E/Xv/wDXrqfB8qWGtwTtjbvBO7uAea7YOzKkro9T8RxiK+SWTP7xE+8PTIPI4rDLXT4+zE/MFPB3D0712XiKLYIZlwSm+Phs4wd38XFch8rI8nTbuAJGDnqOR/SuPER/eNGcWQJcXOTDOACmSA3GcH1rTF8FJKqyklyNhyO3b/61RCUSKZUJGwtnBDduOvNIsa+ashwzEpnjacEVjJReqKuba3lvNM0jhCEYMN42kkjHX/61ULuWZoWKbkxnp8wI3ce/6VniUD7m5RlBg8g89asxyoY9q4B2up2HuOc7TxU6CuWIFWQCzYpnzQxKnBGQfr+FXI/KYAwO8Y2sMMN2QD36/wA6rxLHKyhmVssgAkGDnb6//WpzSTxNHEoZFVXzg7sgHt1x+lSlYaHpaO8dwzJHLgR4CnHA/OqUsXk3ErTq6AyAgfe6A/XFa8Fys0bK5jk3CMBWGCPr1qeRU5eQMAJmCshyD17c8fhURaS1HoVUZpBA9vKkj7mDbxhgO/pj8qhutLkYQSW8O1yrjCnKke54OanZpZLQoSjB1dgp68/59KvJKFt0AUkrDwUOQDn+7/8AWq4Ss7gl1Oas77+z/J82Tc5DAF04UDgY7565NaUcq+ZBcXKo2/MjbcfdPGMe596uSrDNJIhZRGse1TKmCSMntjuahi06OISxqu8JGEUxv1DHnPTpVTafTQTS3C3ghV4BbyTKo3btw3YI6Y254Ge9PWFpoIh56M0hLEHBHOW6DBHNTzQyWplKzNH5cQT5xwS2QMcA9x3qtcXTRy4hVZgIixBGOW68c+lWpaczC5zraXqFtNG5VZElcnGemO/4gVbW/WKKRlV497BCueeOCcKT29q2Ec7kDwELFHng4Ax0OAR1APWrVraQ+RGtyzJn58EADJ4H3h3B9aaam9Ck7mJJ4l+yuY0d3ydxIKjGe3zDNM/4S5/+mn/fUda0XhHSNRU3ckiksTggdu3c9ql/4QPRP74/L/69X7NFWR//0dAhPJZCcbeSR6+hx+PaqFzbLNC6nB3qRuz7Y5x349Kuys4PmSjODyvOQPXsfWqzIZcbOSDg9yM/TBrgempOiPJACJCrHJ6Z/T+lW7SZ4blXi69R/hTtWgFrqU0K87WJGDuxnnr1qiXMc6Op756468/TrXYn1LPo7UJf7V0KO9ZWG8I+CAxG8YbJHTkVxzKQ37k8DBbnH3htxg11Wiy/bvCoJ+YrG6ZYZPy/N1H9a5Z1d3H91OWwQwwDkc1ni90+5itE0QmAwDZkJnackEEEdenbtUdveSSxO6K2AQOSCAQcVr3FphSgI4DLjO3J69D7VmlIoGIlGMk59MDkciudqyuU31JnVWBlUc7SRxt+6evoaryRTspuQgDMzffHbHPIrUaNHTjcR8x4O8Z649cU7eF2+Sgy2DgHu4xyDwKSshoz4/NjKHbgAoeDuA45p/mK7lhghQwAU7f0pUlDFA5+bjr8p+91zT4kga6eF3BBDnBGe/cj+pqWtRWIbFpNzbiSMqAHGc8e1WY5ZGuQsf3NznAbpj2qzEkSspQ/KGQEo3GSD2OBT4WRw7SKpVDJncMenfp/OplTWw7j2lnitoVfBBjOfMHOCfUVPiOMysq4cADKPjAPt071RZS8CAbkBVenzDr2B/wptx++dxujZmbaQAUIx/8AqpWXQE7mtFOs1vLbE7Yg6EeZ36AjNMEXluzAHJkCDy2xlevTpWbtKhS5cDechhkHr39Pxp9rITMr4V8EkMhxgf596yd3oHqdJLeK6squybpAh3Lk4QevQdKz57KG5aU2wiJklUZU9QME8/UNVA3ojZUYuhVS77huGT0yf/r1BFfhoEkAjYDc+OmCx75z703dbDRuzwmSOR0RldnWPKHcv5n8apJqzxNKGcq0YCAMM5PbrjuaqW11E0UYBZd5LFQ3AxyOM+p9Kkk8toEDynzJfnYMu1QoyeuB3xVpu4IbL4mtdPK27GJsKDlsZ9Ki/wCE0tPSD9P8ay2gRnY4jI3EAlQ3Q4PPPek+zp/di/79in7Jdx2R/9K9cXYCqZhl+F9fTPX6Hoaz7m7VZcrkZHPc56E881HbN84WU8BjjPt1/rS3Omm5m3eZtDDcAB+FcHK3uQovqcR4jG+6jnGfnTHPPI59jWGT8gOcY4POOldf4hsXh09ZWYnymGQeRzz71yCcxlRxg4479v8ACummrRsaI9z+Hjrc6LNAeQGAPBBAII6isd3EQ8sjeFPJxnHUdOtR/DC6+e4tm5yofjvjnHFaGsLHFqs8bLtO4nPryGHoelGKV4RZi7KTuIZsxck8YY4OSNwx3/lVcBJyxjZcnGOzcj0PFQh44jtVtwVicMOwPYH61WS4is5Ah4wcke47c+tcaTKNOVdz70fKnOCeo+XuRTnB3RxbtoKx843c47YqtHcLK+UXn5cEcY9cjkVoBomWO7YgMoJ9yQcdR39sU0tQ8iurZI80AqQAcfN0brzz+VWpUgty8kOEYqxYA7TjPoeKoxOhlBnZuRtViMjIOeSORVa+gluZisTF1CnjqB3zzzVK47MVJPMZWnxhWUHIPp68/oKtecYkaW1ZsMGZtpyMdO/JFYwlaDYJgV3EA4P5VpxCNLRZZmwrZGCMA9uorNJ3sCjcmNyYoTKTnJTIU4OPoKcBOjgyMcPJuG9eDjgdKaBvjZGO5QwxwCOB0/WokuGRo4IwyttYjnIz9D3pqKBM0VlEZhkbOzyyDsO4fkf8KcyKOPkJEW0gja3zdMdf6UxooWi2KQpKjI+6c5OAe1VHWRXbzjlDheRuGOvHvUruBblhV1lkcvwoUdGGSO+M9zURTzkZXCEjEfPA9ffpn0oLrLGBDgFnJBU9u3H4Co1cjbE5byzlyHGcrnj+lO6sJyGQskUsuARsGBg4HPXuP5Veiu8b7hmLGMcbh8o/HA7Vi+TCz7osbdxJ5x0//VVm3iM6LuDxq8mRg5BAyfb0xS5W3caXU12tbNcC4eN3wMn5h1+lN+z6b/0z/Nq0xpemXg866KsegLJzgde/rmj+wNC/6Z/98f8A163VMrQ//9MkSFSBGdxUfNx6dfzHt3qrJPIjAxNkc457/TtzWowiRHiIMRzwMcbvUdj37HpVCSG1hKsSWQ4Hye/XP/6xXNJXG9TKvHnubGSG53biCRn8+OnrXARMTKUPUjOfw/8ArV6fOsNwCse7bnkdgD/+v07V51PEIbxlPG1jx9efp/Kqho2gOv8Ah9cLB4hWJslZARj1J+vFdp4thdNWO4H95Grk/wDjuOcjjFeY+GpmsvEdpKvGZAv5nHb/AAr2HxpEym2uIF3nDA44OeG7Y9+orWpHmpNGcl7xxUMazygkYODwM8cZ9xVtrC2dlYs4zljxzgjj1HWn6bcFVw8exh8zZx0B7Y9jSXMnyqFOWOD5hznA4wDxXLTjbQtLQiihW3A25+XcSe59sipWSCW3HXknHGcYPtzWZDPLI45Lbzgk88Y9ePStU78tHEcscn1xkZ9BUu6kT1CKYuQJwWYFiWxnGOnT+tWZmsnRWllEIYEjccfMR3JwRz0p8UUUSBA48wDLDAzlhnBJ5/I04MZohDMmck9xj7vcHn9TWkI3d2UtClbC3vfLgkZXKuhGCMAD1BpUCFpUaSMcYRFYDGcjGOc8VKLCGaUSsi7/AJQMcEjHvUcdsYow6PkAKecjv09DV8qW47gi/YV8oAv8xIJBHy49ulLPCBGkhJyFGGxkfMT6c1CwlcbmUKG3cjjAHc81nRGeCWSW5YeVIQFHQ465zXPJX1Fa50MhMbM6OrBnXoc4AAOMHpUazqyG4bbiRznGVPGe1Nt5EbbCiiUKWPzKHx6dOahvSscQ8zhWTLAHPJ9utTGCejHyk5CoRtO4BM/MOmBx0qtNF5uFt2BCp/Ceo+nTnAqtbW/mzrHuIR8YzlQcc1qqYYM5Bzu24OCABwePQ4pKLs7itbcui2aC2CuxDJHgcAjJ+nOOKhhZI5ER4kBQE/IxHPU+vXFQteCRVSLAyeeSpIH/AOqiO7ea4zyodhuB+YbVHBwPp61XOmrIV+hLJfPbbYpJJIeOFxu4z1Jwec5qL+1h/wA/Mn/fH/1qoy6i0EhVrdX3YOfmA6Y7fTNR/wBsH/n0X/x+q0DU/9S3dSXe9HRNy5yM9Co9fwP605rYSyNcSgIOm0HGCOevpVW3W6nD3ByI1IPIwuOv09AK1I7d5g2SSCAVP9Mda5riuY1xFCxEUjMR1YgdMfXr3rz/AFxDHfNIp3bhkHGM49uT616teWotykcW9yxbJ6lQwIyBjH4+9cR4psJIrWK6bcQH2EsADyM5GBggnPPPStF3LOUEhilhnHVGDfkf/rV9E6nOZtBhvGGfunjnhgVzzn1FfOGd8Iz2/wA+9fQeiT/bvBSufnZYDkdeUHpzzx6VrHVNET0szjFkt0j4U5AGCfcfr0qVbyO4UhsBT19OOgx61Pb/AOkwiS3ZZlDHhOmT2cdR19Pxqf7Bb7nEsSF4z74HY47fpXMo9ykYbQRiZliDcMOM5x2ya14o5PLK9CxB98YI6d6oXEUDbpNzSgD5Qgz78kcVbgv5VBKkRRxqFLL1HPrz+mKlq0rh1IWhvDJsERcEq25BnPGCOlW7RLqRj9oidECk8g9MelNvGhllRpZGKqowcnsfxFKt9bxmFXUK/QNn2OOucenFaKzdwVrlK41V7Ha7L8oKklTgHHbHIqxCz6mvnQv5R2qAD0wT1/CuqXUdLvIlgvoQq5TKsu5enOGIIH5g1Tm0DTp1EllN5TEK2NxwTuxjn/GidO+pSj2Mh0W3KxzYZTvAKnksfUUSwQXgicqMDYoXuRjv0NW7rT7+1iaF0Ehy2CeM8joOc/gajtbZpG+1TnYA7AoBgqEHTB4z+NYqnK6JSZlJJFaSKkaAbiSCec5PHXFbv2QSQnzgM5VNpPbnuap31tGwEhCq21cc8c57cj88VWXUSrkW5+ZOSB9MZI6cVc4W94bLqSLFKVg5VSwyMg/L065GDXP3R+0Sh4uQAWbGOvrx1zVy2uVuAynMbYwSFOSckdRx0NUFjFreytKyyFyFfofl60mm07i1e5bLGMopydi5bPYt7GraW0bouz5dg7Ajk8dvwqHAkfy1Jw7cYPUDqCDVhbmMAR27BS7ZPO04Hr1H5VnypaoRHfZilWNEd9qAEqQR/TtiqXmSf88Zf/Hf8a6SKbaCyxlt53ZIHQ9Ome2Kk+0n/nify/8ArVrzD5mf/9XvX0a3uUW4sJdu4cEHIP0I7ZNZtza31m67oyYugZOfpnHSvn3SfEHiHRx52m3DGNcEjO5fxU16RpfxcIxHq9rk/wB+M4P5H/GsZU4yJcDtrpMxFdzBXA3FQScDr39PXP0rhPEsbXNjIh3uYlyvmAAgjBP1HJ6+lekWXiLwt4gVTDOm8D7j/I3+B6UXfhWC6cyLIPnUpt7EYx/iabg+hS0VmfOUbBoXB/D6GvdfhlOtzoM1kxyI3Ix7Hnpz/Kvn+VZrO8nsZBgxlo/xU4r1T4QagXu7qybgMgYD3HH9a0p/EFRaGve6cLdlvbOT7LMSqZAypIyp3Lj25yKm1CF7lWdnErSY+f8AgUYHOOcflU2uXMdvrMlpbxFiG3uR0GcMB6Z5qOGQruMgyAdnTGTjk4xjI9q5KsZydlshO7Mn7NI0ZAOe3A3dPbng+tWEjkWF42AZi2QBggKcHOO351zPi2/vLGOCWORl3M3sRjt75zXGxeK7mG6N1Nm4fbhdxwF/Kqir7HZTwsJRU5TseqXZFsrow3shPPtnj0/nXJavOJbdSDloznGR0/xqvpGrHUIpI52yz9c9euaTU9Pkct5XKgfj070qb7mc8PKC5t0FnrE0flZYkIQQdxB/PkfnXXWOvRsEZRvCkBl+62ckgjHU+9eYqrqPLZchQeehGKtROYj50DbsHn1B/rXQZqR7nZ6wjQgufNhl2hjjlCxJOQOvPqK2GS2uYmeFsLtdldSTjdxgkHI/EfjXimn61Jby+YMckFlPfHp6V3GnaxG4Mkblm2hSP41wd3XgkU0xnSXlg7SGRejMo3Dpnbn+HnGfUVgx6daxTOzJiTZlgefvHtj+ddImqoyGRWWT75CsCj4Ppnr9RU88Mf38MCCAQeTtAzxk8/g34UNPoI5uSO1SV9uOGz8voox257+lZ0629yVnfDbtxPO7ryM9D0zV67sGjRpuTtX5mJOAWOBnIyOoNZX9n3e8bkw24KM8DaOSKzlfZEtEhtfIjkCnBVMnPqfQHpwO1c+7zm4DhcKflOzAPHoK6S3WQTOt0GKMxbOOAF/zxVGW1XG5SR1JB45Jwp/Gly6O4GtHpsOor50x2bfkUDcOB9OKk/4R6z/56H83/wAayUF3AixAu+0DO04APpS+be/3ZP8AvusfeIsf/9bmL3QLKScSQK8OSSGjBHH0PGOlcvqGnvFJ5d1EZEAz50S4OfRl/wAK9LlERKqmRIqhVU46fjn/AD1rBknhZmV0XfGcYH+HJqCjzh7FV+eylEqj8CPr6Vo2finX9NTy4rl9n91juHp0P41NqWmxzv5iZRs5yP8A9fFYEsFwMnduA/vUAJcXkt1dvdS4LyNubHqa7f4c362Xiq3VjtWXchH1GR+tcCYZcbnjbA7jmrkG6Fknt59rqQVzlSCPTNC0dwfY+t9V0Nri4N5AoLkDPY8Aj/OcVzk+l+UqrMmwyE5ySFyTntwfzry/Svil4h03bFeFbpB2kHzfmP8ACvTNI+JfhzU9q3xNrIeocZX8/wDGiUVJ3Is0cT4s0KbWbnY93HDHCMRxgEknHLds/X+deJSJ5UrR5BwSM9j+dfY15ouj65CGgb5WB+eEr3/n+FeFeJ/hlc6Hay6g10s0a/dGMMSegwanlaOijNa8zPOraWZCGQ4x0x3Ir0bSL27upd5TLRYOCccj17VwVnpt1PlYELMo/KtS2nv7Z1t5cgk4NHJd3Zq67WkT2dV069jL39nGh6NtIyffilPg3wpdplEeFjzlZMZJ9jkVyUV7ts/LKkvkZ+n0ras7mRItwOdp/T6VrGNmcsrNGbceCF+1+RDOYecLvXcrDtjb0NQSeFdc05WurU+cIfvGPIYY9FPJFdhJqxe0Pnkl1+4QcH8MYNckfEEpvFUzSoQc5C72/AMSKGkCuJZ66pRRcALnAO4fK2Dnn0NdTa6lcxxq1tKHjYFvLY7hyf73UAj1rItPD2n63Mz20jxSzE7WJ6t/tLjGD7VRvvDOveGZBM3MY582PO3I9R2pWa1DmWzPSLbVIXyt1C0S7/vod6hVGMHH4cFcUJa2zRO0JAIUyEKDgM/TK846HoAK8utddkYBmfY4wu9eAc9dw4zxXV2WtxB1kvAQpfO8Zx8vcOo3Lz1BGOelG4zRubKe3SRW+aEgIHU9QOSePlyOPSskzuoBwuwndzwNijjjkHPB+tddHqSOhuImEyAFmZcBkLcAtjhseuAaZe6Ta3luz2rCB2wiSLynHJJxhW79cGpnFtaEnMxeTIvmSyBGf5trISRnp0FSbbX/AJ7J/wB8H/Cqlzo3iszMLe3iuEBIDrIy5we4DDn/ADmq/wDYvjH/AJ8E/wC/7/8AxdcroMLI/9eKWCUIhhKyDuSOefT8Kz5PNNyymNQ6rnIA5FbEsDIwaIiMOcYIJGexU4/lTZTBuCTnDxrkZXHytn1wam5VjAfTRcSE8YJ9QeMetRnQPMGQAcdQDXUQWCo2YPLLkAg428kdD2/KrcjKLmKUjY4TLKRtyTxyeuO1IZzC6K8cbpNHgY5PHTqOKibSIJ7II0YkQEdhxmuxMsrQ3EUqIAAXRhjJ77SPWi2s7eSzSSNWRpMB1j9/b1pgeTXvhQxKJFPl78lQK5yfStQszmaJio/iHX8q95m0+RgZICHCHknqPXI/zis+7tWePzCocycquMHj8f5GkB49pur6pYN52lXLDH8KnB/Fe9dhceO9T1/S2sNTCloipDAYOBx0qte+EreVXngBjYHsegPTp3rIk0m9slYSyeZGRjOOQfrQIntNRW2bcvTqT6nNTzww3bG6U/OvVfUe1ctJM0bFR06URXUjESQ7iw7CqTBo6yC8EkexhsKdCO/4Vs29yc+WH3Fh0HX6VyNnbyST+ZMdgbt7V0sJih+UAHnAJFUI1L1Y1tVVWcMRznvXH20y21y7SckcAE4/+vWpfteSD90rIiDJL9CPUZrl7e423eHPTjJUEfrSe5XQ928K2RZIryGRFZAQYyOQ3Y59+9ekC3Go2L2WqKp3rh1Xp+Bryfwuk1vhg7EyfN1OAPYe9MbxfqdvrBtmyVVtuG6Yz+dbxaS1MJJt6HaQfD3wvakskTsTnlm4Gfy6dq43xZaWuk+Xb6bIUc9F2k7u2C3SvSrW8nuDgcoRwa4fxteStDtYBIxxu25bP9PrSnFKJKk7nIQ6w9pKk13HsfORInUAdPqD9K6XTtTEGbuwfcqjaUQ8Fm746qfwNcSk8Fwi27jGOgGd3A5GD6+31FZ0gfTJFmD5GN4wDkezfSuSM+5spdz19b0TqGtbiKJFG3DKCSR1zh157dO1L50//P7D/wB8f/ba8ui8SpsG6LzD3by1bP45Gak/4SWL/n3/APIK/wDxVaXKP//Q0pDHbyygF4xjn39R3xxUiJDdx7hHvZkKgjBKL1xngZHWqP2W0trqdp5HWOdhkZJU8fz6fnVu2iS3lD2kzFCNpVzhN3seO1SWRpZx27h0dMN3dBuwB3ABB4GauKU83zWfkLgNgBhuxgZyDjvzSxwXDxLJbuA38SncR7ckH+VPiSCSVpGRQu0BkHA3Z47UAPkhDBAjiOVvmIPPI6DIOPzzRZxSpF+6j8lpHAKk5XOeSOOB6CnvE0OZIlMqHuSDj6d+McUiXUMr7SjRO4xuHIPagRDLGtpFcOPk52uOpI46YoNpFIqNagYUDmPOcE/xA8dKmMotWH2r5gT88ZAyRyM4659ao29tHazve2TmSGQkbMHgtz0Pb8KAJ7uAmEIAuXOOAAH9AcdCKw7jTjeQFopCWP3onPOQOnua2p3uGsdsYH7pt6lM8j0wM81bj8m8jW5jMXmPgkFcZI65Pr2pDPA/EdgLW7bahjBwVU/qKxILvyZPlGN3Fe2eOdGm1GxF7FFtkiBPHPArwUzbGAx75oQjoZJBKiyDsRnnHPtVu11K7lIt13LtyMH07flWBFesANvHOMf1rRj1GB0LOCDnBxxV3A27q+1O8Tax4B2sTnb9T1Ga52YHTLseccucMCDx9K6O1nhmhLwytE6kZVuc+vFchq8u/UpPNO9O2OPyoYHtfhHWYfLEcoxI3U9/wNauvS6d5sUyJtl3fMyYDH2NeX+GpVW3LFx8pwD0OBW7qN79rEcLH5gchl7g+v0rVS0M2tT1ix1KNQggBdW798+4rA8am7mssL8sZ5J6HPYdxWZDLLawrMSWYDLAHt61qSakl4htZQRAw3cnGM/Wrk7xsQo63PJpLO+VcxxfLEmCQclQff8AwNUDPdodsbNgHO/BGCP84716/deFb+OJ7rTX89ZEKkZwcNxjHQ/WvP8AUtNltj5bhgw4wykcDtg9R9K5LWNDmRqdkctd2zPIxyWRgAffGOtO/tPSP+fOT/vtf8KkuLJI5SEZdp5G5sHB+oNQ/Zv9pP8Avsf/ABNGgH//0d5IIDamJPMZxty75IYKMZye/GOuaqJaFbuSDb84X5Szdsd8k5rsZEgky33ie4OG/PofxzWPcWVwswmgCyg5D5O0qDjnHP8A47ikykc+i3cVy0k6skQzhuq7SBxwenbFTo0G4tlvlHQEFWJycYJHuRg5q5bWsEmZTuY5IRWfGBnnAx0P0rLs7zS38zT54ZPOEhVXBABGO+TnrSHcFk1ZZcWaMiqGyh5PXjr0OOv86fcSteQxSN+5lgY5RcMHUnoMdCD9amhjnkuZLdW2IDuUqeRj+HjPHpWVqV9PbXhiKtsbHz88kDg/l+NAGjPcyvIZpTsb/lkoAc8f7Wcirc013FCs8U5aMAFlYfMCf93PH4VzupXsDGN4Y1EjkHKlgRj1POc1NBf3Ft+4hAbg7MckZ9sjFAjTM7maKSVGgmVjkkbtwX1x/D+tXLPyBPLIYH2yNhsHIPfgeuenWubuLd7+Zbm6IMoRVKqxIG3qdoNVLHVJ7G9+yXxZo2yMjlcdRxnkH17elIZ2DW1+FaHCyRE5iDEqQMe/6g14j4u8KXmjS/b4ow9rK2cp0Qn+E4Jx7V6wLqzNw/mSb+AOPmH49KralPGIxZ3JDWsy7Mlfuv26+v1oA+d/M28qOlSLchQeOteh6z4VtIm860HmRMM5Tse9cadL2kgdvWmA21mZd4j+ckHBPaofspuXjjiO5mGcnt6ipVgeFyFxhuueKu2ssVu2N2fTB5BoC4WGnSzyNE24FfTgZFTzWt7ajc5bC9CDXYaXcWJJJAZ25PPXP+fSrOpWlh5bTbAz49Sea0UdCGynb63FpujobxmZrkMoJGQMcHPerPhnVoHzb3LiRF4DZ6qD1554zVa48NpPYwJK+xwvRgRjIz9KxV0ebSdRtFD5DswB7MvcfiKlS1HY900KQQzbrZi0Z5XuMeo/zmuouE0u/RbecxnfhFWTHJ6t16/lXhuk63daBqBsZOYy3yE9s0/xz4vtLzTF04xvDfLMrt8uBgA8huhzkYrWVmiNbnqp8AaJdE3HkOA5yNpyMf8Aj386P+FcaJ/zxl/z/wABr5tj8X6wkaobguFGBv8AmIHpznin/wDCY6v/AM9V/wC+R/hWJVj/0u3exdJC0Lng9+lQ/aJY3CSdR6datxqRlFz7bqSTEvDAe2TTsFxkiW9z/rEUvjqAN1ZNzp86SiUhWXAHyjD49SO5GPyNamXtmDxsN3THemNMX5ByxyT65qWrDTOJkb/TZnlzHjAG0EnI78HinzS2ry/ZZXZ0YjYACSD9a3r/AEq21Th4/wB50Vl4b8xXG3GgaxaXHmWji7WPJ8vADgfT+L8M0Aye6Fvdyh5ZRujJVyOAVBHH1HtWXi0juHgkkeME8OSGx6ehqm8iSJMzgLOoYsmO5/T/AD0qjs821iaZdhjGMnkH3xwRn6cUAaaaf5BDNcEruIDRn19qkysqeTJJ5rpkpIRyQOoOD/jWfaygweWsikMSPkGCB9R37dDUBxyYTsI6PkcjuCM5/lmkFzUuoZmmW6glUea2CpBGRjp/9enmR1d4p5EZWxmPHyn05z+XeqEkbNDG0ku5QPlbo3Pb0qP7PGyNFFJ8yNkAjuevOR/KiwXEu7eYxDyt+NzHZ6Y7/WskmRQ32lTlRnO3HFXmkzuincQTrk5B+8D7V0WkWlldxGK5kLqfk3DPO0ZP3h07UrDTOK+yeaAyAsDz9aiaxyeEyD/OvT7bSNPu4WaQeWw4jwSCh7Y5wc9/0rSj0OHzvNmcOWXlioK7h/eJAxn6CgZ5/pWg73R2XK59P8K9MtdJt9jCOBUBQr6nP49OKu2yzLzA6h4j86KvJx0Kc8g+nNRQytc32y5uM5P3TjnjAIxjnFMDMFi62SxXcXmoSQDn14HuMVxurWP2Kezn8xii3C5V+o3dSPUV3EN8llcSW5RSOvOcD/ZJPHOayNd0qbUbm1ntY8QIWkdwcgEdAAP6UgIb/SorwB15dT8p4yMcjisrVdJW+0/F9GFdOEk7n2roVEhW3mIAbO0lmOGGBgjj8Dn8KZd+dNqEODkbCrA9ADnjHpVc2hLieSS+GsOVXeccEqpYZ+oqP/hG39Jf++D/AIV7ImmXEe5RFKnzHI4HPfvUn2C5/uSfmP8AGlcdj//Th0TxbbTkxzkqW6jvuz1OeD+Fd1BcwTruibeMcg9a811nRNKuYS8QaG4hUbio4b0J55z6iudttS1bR1EjZlh6bwc49s8/rSU2txuJ7K8ZWTzC24k52t/jUBdZXwx2Htxg/wD165rTvE9rqKeXIQWx0PDCuhWW3nXajhx/dbr+dNyuCRKCyn97kqe4qO5jLlDAQ+3kg9x/ShYmRv3Tbf8AYb+lV5bITzrJkwuCCcdD+FSUV57S0u2ZNQiL5HDH76+mG5yPrmuVvvC1zFEZrPddxggkJ8rgD1X/AAzXor7JAEmGD/eFVmhuLUiaMkr6igVjxKZoHlS3iVo3zgyLg4FQzWstsnnYin7sSTkfhxjPrXtt3p2m6uubmPZKekkfDfiOhrgdV8G6vYA3enyNfIOoXh8e6n09qQWObtpIlG1GJVgQyHBU59D/AJNZZa+il2wvtI+7nrj05qw8n3zGvlljgxtnO4dcZ6VQlj3zpOjbHx+HFAjciuxNFsmCF+nzY4/+tWjpvmQzmWOJdrsNynjgdQPeudaKaXcynrtzjhcjucVq6fOLVluLhmOzI2jqC3cf54pgj0SIRW8qlkKwSZ3FTvwRyCDx+Iq8+oLBvQbzKAzYUEgqAOe/Y9DXOWNxJHGbeFABGAxPfn+Z9q3xJNcWYltygdfkIbG5kPHGCMEDpQUXVvYNRgYI+1oyGXqCOnI2jvUdzDbzbbyV5PNU5OR8v8xmqNvFBBfGWJ1lViQsZOTx1/yemK0WtxJdXFv5hXdHlQOo9T6EUAVLm2sbjc+4KjYR3Tkc9Mr25pbG0TTY3QMCpGGT36EjtkVHKsUkcksYVJoj5bgg+2CR7jirsrJM/k4BaPG5F5Hrwfw59KAMyXdp7KZsfZn6xjrx3FQXgsZ5IlZ2RGG5ZWwV+bjBx3+pFbcqb7dlEeEVd/zDPT0z/OsBFs7iE2tu+GVw43Zwc89R/getIDaj03VlBFq8DpnH7yUqwwMY759c1J/Z+v8A/Tr/AN/z/hWW2qRA+WXXcnykOMHPXjJ6YNJ/akX9+L9P8aAP/9SQQzxGH7NIJoFXAzxgZ9QTn3xxSS2Nu1sbYhEIO7CDOc8YIPB/CptTv5IL6P7PhFUbtuMjp2HSqFzqEG0MoyxI+6ducnngAduKko5+98OWksa3VgxhcZBUqwGV+pJ59R+VUoNW1PSJvs9+pYD+IHn8+9dXFIZovPuFKyD7pJwcdhx9asS2llcRQTXeZIl4YkhixJGN3fpU2AfpniGG/XYWDD1xhh+FdTHKsibk/ep2/vCvKNS8ONayyzafIUKfOq88qfQ+3vTdO8SXdk4h1BWGO46/iO9F+4z1uIbhjG7+YqeJWXmFsj+4axLHWbW8RWDhif416/5+tbakSIHJ3AdGX7340wEMcExIGYZfT1/xoLz27DzRj0cdKk3Fl/ehZE65FTRb9v7s+Yh/hPWmBjanoOla0pe7iHmHpLH8r/ieh/EV5zq3gO/tVDWH+lQqTkjh8H1X29RmvXBDE53Qkxv/AHD0pv2kQyGKb5XHcdKLAeCLpc8Nu8pQ8ce3FTQtc26p9nGYZR8wxuCse+PpXt1xYWF+3m3UY8zH+sXgn69j+NcnqPh65t4P9G/eJ91ioP3exK9QR7ZppisY0b3flAIjMrgLu4GBjqDwKU2cqlLizdy8bA/KB82PXOMj6Zq3bR3qCGNRvVG2tuGeO/HHSo4lks9VkUIXglww+bBDAc4z1GO1DAvXdrp8piuI7jy5875AQdu453f/AFv5VLNFq8comhSGRogEDBuq/jkd/QVpJbWb4lhjQNkBD0GD19f89Khn86zlJB/dnpnB5bjtjIpDIp2mETz2tn5cr/J1OGVemAPenkeeqXSxSsrHJxgleCOhYdx65GTQ7TWcP2lMyAnEyg8g5AJXnrULwRzCOe2lIAc/IwPTvjAyRk8H2oAtS6lM37pGBcLyvGMDrn6jp2qN5LZXjuIgVllGdoGQSpztz2z07+9V5JIr54gjGWaRQd0LDansw4Kn196q3dpLst5Xkbz4mZzGSOQwxxjHb09KQGtDaWcwaVkMbM2WXcQQcDqM8Gpv7Psvf/vtv/iqowxysmSJH6Dcu/BwB6VL5Mn9yX8pKAP/1ZdSihkWO5lQox+7z8p9vwFT2w0uVc2keJAOQeQKyXEM+zzpE8tDu+U4OSO/qeMYFRRlEYNp6mUk4z2qCjTu7g4UT4wxwW6kDk9OMgVIkaxN5BIkVQN2eCRnJC8HH16CnzQQzhZS2HA6BhknOACeKp20Dh5LeRimwEhDjqcYOcnIIoGStdWjSGFo98bttQMckfQ1zzQWxmMF9GFRs7C/U44GCOmK6KG3UrO7NvlRjjeOOB2wMfyrNjgt76AiRsuGKruGQc+g9qAObl0PU7Mtfaa+QMEqp5weenQ1oab4ylgmWC/Upjqw/qK1bCyu9Pd/mJiU7emMkjOACTnH1qtq+nwPgXsJfdwkqYBX2JH9aVuwXO7stTtbtfNgkHP8S9/wrS3Bjv8Au/7af1FeEra6npTfarBmaMnqOfzAyK6jR/GagiHUAY8/xg/L+PpQn3HY9QaUn5Zl3A9GWkMJlG5AJR05PQf1qjbX0E4E8T4915GPcVebaD5g+UkfeXlT9RVIRWnRVOYXMLf3SMj/AOtViF5okUXHzNj7wol3yMryLwv8QqwgkwJlO9CMEe39askpXmnQXuwglXByHT19x0NZd9pl/a24uLSFbtlPz8YJHQ8djj0rooYIzlrd9rd0arEVz5RIdSrHgnsadhXOHa7htraGdSETcWIYltozyGHr7mpZG+0SRscbAQ7FTnIzkDHv9a6u6srG+heOdBhhyy9/r2P41z8+mXWmP9ps0Fzbsu1kTgj3wc4/Cp5bDuZnnwJ9pbcWSU5bHAx68VDZR3emyyJcKZIDwpHXafUYzn2q7b3OntC0Qh2q5IORjg8ZORVWa3vbO5WW2cFOTkk5BJ46dto5pDKun2u2+M9pNtdwygjoQf4SOeuOPepBbLOrXUQIuo9pLHBJ56Y6Z44pt5JPaziEoHRxvB4OSOo4AOai+1XllMxgRZC4G0r/AAk9ySeO45OKQFVoZL7FwZGUkYIVgPzDdwODTP7Nk/57S/8Afaf4U+UuHz9kDZ5yB71Huk/58v0oA//Z",
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,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",
    ];

    // Scan an object's own properties for one whose value has `propName` set.
    // Used to discover the obfuscated `actor` key dynamically — much more
    // robust than relying on a regex that may not match every build.
    //
    // `skip` excludes known false-positive keys. `weapon` carries its own
    // `.mesh` (the gun model), and was previously matching first — making
    // the prediction read gun-tip position instead of the body actor, so
    // velocity tracked gun rotation rather than player movement.
    function findKeyWithProperty(obj, propName, skip) {
        for (const k in obj) {
            if (!obj.hasOwnProperty(k)) continue;
            if (skip && skip.indexOf(k) !== -1) continue;
            const v = obj[k];
            if (v && typeof v === 'object' && v.hasOwnProperty(propName)) return k;
        }
        return null;
    }

    // ────────────────────────────────────────────────────────────────────────
    // INPUT — RMB for aim, V for ESP, ` to toggle menu
    // ────────────────────────────────────────────────────────────────────────
    document.addEventListener('mousedown', e => { if (e.button === 2) RMB = true;  }, true);
    document.addEventListener('mouseup',   e => { if (e.button === 2) RMB = false; }, true);
    document.addEventListener('keydown', e => {
        const t = document.activeElement;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
        if (e.repeat) return;
        if (e.code === 'KeyV') {
            settings.espEnabled = !settings.espEnabled;
            saveSettings(); refreshMenu();
            log('ESP', settings.espEnabled ? 'ON' : 'OFF');
        } else if (e.code === 'Backquote') {
            settings.menuVisible = !settings.menuVisible;
            saveSettings(); refreshMenu();
        }
    }, true);

    // ────────────────────────────────────────────────────────────────────────
    // MENU — tiny on-screen panel, persists to localStorage.
    // ────────────────────────────────────────────────────────────────────────
    // One-line description per feature, shown as a hover tooltip in the menu
    // (keyed by the control's data-k). Keep these short — they render in a small
    // floating box beside the panel.
    const FEATURE_DESC = {
        aimEnabled:      'Hold right mouse button to snap your aim onto the best enemy.',
        autoAim:         'Aim at enemies continuously without holding RMB — it holds it for you.',
        crosshairTarget: 'Target the enemy nearest your crosshair instead of the closest by distance.',
        onlyVisible:     'Never aim at enemies behind walls. Off: prefer visible, fall back to nearest.',
        silentAim:       'Redirect your shot onto the target WITHOUT moving your camera (hold RMB). Turn on Silent Sync so the hits register server-side.',
        semiSilent:      'With Silent Aim on: also snap the camera onto the target right after the shot fires.',
        predEnabled:     'Lead moving targets — aim where they’ll be, accounting for bullet travel + gravity.',
        antiBloom:       'Offset aim by the predicted bullet spread so the scattered shot still lands on target.',
        bloomSmooth:     'Smooth the anti-bloom offset so your aim settles near center instead of jumping to a new spot every shot.',
        espEnabled:      'Draw wireframe boxes + tracers on enemies, visible through walls (toggle: V).',
        itemEsp:         'Mark ammo and grenade pickups on the map.',
        nameTags:        'Enlarge enemy name tags and show them through walls.',
        espBoxStyle:     'Box look: Full draws all edges; Corners draws just the corner brackets.',
        espColor:        'Color of enemy boxes and tracers.',
        nyxColor:        'Box / tracer color for players whose name starts with “Nyx”.',
        autoChat:        'Automatically send your messages into chat on a timer (spammer).',
        chatResponder:   'Auto-reply with a canned comeback when someone’s message hits a trigger word.',
        autoChatText:    'Messages to rotate through, separated by | (pipe).',
        autoChatDelay:   'Milliseconds to wait between auto-chat messages.',
        themeAccent:     'Accent color for the menu title and highlights.',
        themeBg:         'Menu background color (blended with the Opacity slider).',
        themeText:       'Menu text color.',
        themeBorder:     'Menu border color.',
        themeOpacity:    'How opaque the menu background is.',
        themeRadius:     'Corner roundness in pixels (0 = sharp square).',
        themeBorderW:    'Border thickness in pixels (0 = no border).',
        themeFont:       'Menu font family.',
        themeFontSize:   'Menu text size in pixels.',
        themeBlur:       'Frosted-glass blur behind the menu (needs some transparency to see).',
        themeGlow:       'Add a glowing accent-colored halo around the menu.',
        unlockSkins:     'Make every skin appear owned in the shop / inventory UI.',
    };

    // ── Cataloging: "What's New" changelog ──
    // These entries are authored HERE in the code (not typed in-game). Add a new
    // object to the TOP of the array to log a change; it renders read-only in the
    // Cataloging tab. `tag` is the version/label pill, `text` is the description.
    const CATALOG_ENTRIES = [
        { tag: 'NEW', text: 'Make a comment on greasyfork about this script for new ideas to add. Otherwise there wont be an update for a while until i get new ideas' },
    ];
    // Build the read-only changelog markup from CATALOG_ENTRIES.
    const _catalogHtml = () => {
        const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return CATALOG_ENTRIES.map(e =>
            `<div class="ssh-cat-entry"><span class="ssh-cat-tag">${esc(e.tag)}</span><span>${esc(e.text)}</span></div>`
        ).join('');
    };
    // Emit a HTML-attribute-safe ` data-desc="…"` for a key (empty if none).
    const _descAttr = (k) => {
        const d = FEATURE_DESC[k];
        if (!d) return '';
        const esc = d.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
                     .replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return ` data-desc="${esc}"`;
    };

    // Reusable row builders so the menu markup stays terse. Each returns an
    // HTML string; controls carry data-k so one generic handler reads/writes
    // settings regardless of control type (checkbox / color / range / select).
    // The outer .ssh-row carries data-desc → hover tooltip (see buildMenu).
    const _rowCheck  = (k, label, hint) =>
        `<label class="ssh-row"${_descAttr(k)}><span>${label}${hint ? ` <span class="ssh-hint">${hint}</span>` : ''}</span><input type="checkbox" data-k="${k}"></label>`;
    const _rowColor  = (k, label) =>
        `<div class="ssh-row"${_descAttr(k)}><span>${label}</span><input type="color" data-k="${k}"></div>`;
    const _rowRange  = (k, label, min, max, step) =>
        `<div class="ssh-row"${_descAttr(k)}><span>${label}</span><span class="ssh-rangewrap"><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}"><b class="ssh-val" data-for="${k}"></b></span></div>`;
    const _rowSelect = (k, label, opts) =>
        `<div class="ssh-row"${_descAttr(k)}><span>${label}</span><select data-k="${k}">${opts.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}</select></div>`;
    const _rowText   = (k, label, ph) =>
        `<div class="ssh-row"${_descAttr(k)}><span>${label}</span><input type="text" data-k="${k}" placeholder="${ph || ''}" class="ssh-text"></div>`;

    // "#rrggbb" → {r,g,b} (0..255). Falls back to black on a bad value.
    function _hexToRgb(hex) {
        const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(String(hex).trim());
        return m
            ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
            : { r: 0, g: 0, b: 0 };
    }

    // Font-family stacks the "Font" picker maps to.
    const THEME_FONTS = {
        system:  '-apple-system,system-ui,"Segoe UI",Roboto,sans-serif',
        mono:    'ui-monospace,Menlo,Consolas,"Courier New",monospace',
        serif:   'Georgia,"Times New Roman",serif',
        rounded: 'ui-rounded,"Segoe UI",system-ui,sans-serif',
    };

    // One-click full themes — each sets every color/shape key at once.
    const THEME_PRESETS = {
        Dark:     { themeBg:'#000000', themeText:'#ffffff', themeBorder:'#000000', themeAccent:'#ff3b3b', themeOpacity:82, themeRadius:6,  themeBorderW:1, themeBlur:0,  themeGlow:false, themeFont:'system' },
        Light:    { themeBg:'#f5f5f7', themeText:'#1a1a1a', themeBorder:'#cccccc', themeAccent:'#d11a2a', themeOpacity:96, themeRadius:8,  themeBorderW:1, themeBlur:0,  themeGlow:false, themeFont:'system' },
        Neon:     { themeBg:'#0a0018', themeText:'#e0f7ff', themeBorder:'#ff00e6', themeAccent:'#00eaff', themeOpacity:88, themeRadius:10, themeBorderW:2, themeBlur:0,  themeGlow:true,  themeFont:'system' },
        Glass:    { themeBg:'#20202e', themeText:'#ffffff', themeBorder:'#ffffff', themeAccent:'#7dd3fc', themeOpacity:28, themeRadius:14, themeBorderW:1, themeBlur:8,  themeGlow:false, themeFont:'system' },
        Terminal: { themeBg:'#000000', themeText:'#33ff66', themeBorder:'#33ff66', themeAccent:'#33ff66', themeOpacity:92, themeRadius:0,  themeBorderW:1, themeBlur:0,  themeGlow:true,  themeFont:'mono' },
        Sakura:   { themeBg:'#2a1620', themeText:'#ffe4ee', themeBorder:'#ff8fbf', themeAccent:'#ff5fa2', themeOpacity:86, themeRadius:12, themeBorderW:1, themeBlur:2,  themeGlow:true,  themeFont:'rounded' },
    };

    // Apply the user's theme (title, colors, opacity, radius, border, font,
    // size, blur, glow) via CSS custom properties + direct styles.
    function applyTheme(wrap) {
        const accent = settings.themeAccent || '#ff3b3b';
        const text   = settings.themeText   || '#ffffff';
        const border = settings.themeBorder || '#000000';
        const op = Math.max(0, Math.min(1, (Number(settings.themeOpacity) || 0) / 100));
        const bg = _hexToRgb(settings.themeBg || '#000000');
        const radius = Math.max(0, Math.min(24, Number(settings.themeRadius) || 0)) + 'px';
        const bw = Math.max(0, Math.min(8, Number(settings.themeBorderW) || 0));
        const fs = Math.max(8, Math.min(24, Number(settings.themeFontSize) || 12));
        const ff = THEME_FONTS[settings.themeFont] || THEME_FONTS.system;
        const blur = Math.max(0, Math.min(20, Number(settings.themeBlur) || 0));

        wrap.style.setProperty('--accent', accent);
        wrap.style.setProperty('--text', text);
        wrap.style.setProperty('--radius', radius);
        wrap.style.background = `rgba(${bg.r},${bg.g},${bg.b},${op})`;
        wrap.style.color = text;
        wrap.style.border = bw > 0 ? `${bw}px solid ${border}` : 'none';
        wrap.style.borderRadius = radius;
        wrap.style.font = `${fs}px/1.4 ${ff}`;
        wrap.style.backdropFilter = blur > 0 ? `blur(${blur}px)` : '';
        wrap.style.webkitBackdropFilter = wrap.style.backdropFilter;
        wrap.style.boxShadow = settings.themeGlow
            ? `0 0 16px ${accent}, 0 2px 12px rgba(0,0,0,0.5)`
            : '0 2px 10px rgba(0,0,0,0.4)';

        const title = wrap.querySelector('.ssh-title');
        if (title) {
            title.style.color = accent;
            title.textContent = 'Shellhax'; // locked — name can't be changed
        }
    }

    function buildMenu() {
        if (document.getElementById('ssh-menu')) return;
        if (!document.body) { setTimeout(buildMenu, 50); return; }

        const css = document.createElement('style');
        css.textContent = `
            #ssh-menu{--accent:#ff3b3b;--text:#fff;--radius:6px}
            #ssh-menu .ssh-cat-hdr{cursor:pointer;padding:4px 0;font-weight:bold;
                border-top:1px solid #333;display:flex;justify-content:space-between;align-items:center}
            #ssh-menu .ssh-cat-body{display:none;padding-left:6px}
            #ssh-menu .ssh-cat.open .ssh-cat-body{display:block}
            #ssh-menu .ssh-arr{transition:transform .2s;font-size:9px;color:var(--accent)}
            #ssh-menu .ssh-cat.open .ssh-arr{transform:rotate(90deg)}
            #ssh-menu .ssh-row{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:3px 0}
            #ssh-menu .ssh-hint{opacity:0.55}
            #ssh-menu input{accent-color:var(--accent)}
            #ssh-menu input[type=color]{width:26px;height:16px;padding:0;border:1px solid #555;background:none;cursor:pointer}
            #ssh-menu input[type=range]{width:84px;vertical-align:middle}
            #ssh-menu .ssh-rangewrap{display:flex;align-items:center;gap:6px}
            #ssh-menu .ssh-val{min-width:22px;text-align:right;opacity:0.7;font-weight:normal}
            #ssh-menu select{background:#2a2a2a;color:var(--text,#fff);border:1px solid #555;font:inherit;border-radius:3px;padding:1px 3px;cursor:pointer}
            #ssh-menu input[type=text].ssh-text{width:120px;background:#2a2a2a;color:var(--text,#fff);border:1px solid #555;border-radius:3px;padding:1px 4px;font:inherit}
            #ssh-menu .ssh-cat-log{max-height:150px;overflow-y:auto;padding-right:2px}
            #ssh-menu .ssh-cat-entry{display:flex;gap:6px;align-items:flex-start;margin:4px 0;line-height:1.35}
            #ssh-menu .ssh-cat-tag{flex:none;font-size:9px;font-weight:bold;color:#000;
                background:var(--accent,#ff3b3b);border-radius:3px;padding:1px 5px;margin-top:1px}
            #ssh-menu .ssh-presets{display:flex;gap:5px;margin:4px 0}
            #ssh-menu .ssh-preset{width:18px;height:18px;border-radius:50%;border:1px solid #0006;cursor:pointer}
            #ssh-menu .ssh-tpresets{display:flex;flex-wrap:wrap;gap:4px;margin:2px 0 6px}
            #ssh-menu .ssh-tpreset{font:inherit;font-size:10px;color:var(--text,#fff);background:rgba(255,255,255,0.08);
                border:1px solid var(--accent,#ff3b3b);border-radius:4px;padding:2px 7px;cursor:pointer}
            #ssh-menu .ssh-tpreset:hover{background:var(--accent,#ff3b3b);color:#000}
            #ssh-menu .ssh-reset{width:100%;font:inherit;font-size:11px;color:var(--text,#fff);
                background:rgba(255,255,255,0.08);border:1px solid var(--accent,#ff3b3b);
                border-radius:4px;padding:4px 0;cursor:pointer}
            #ssh-menu .ssh-reset:hover{background:var(--accent,#ff3b3b);color:#000}
            #ssh-menu .ssh-titlebar{cursor:move}
            #ssh-menu::-webkit-scrollbar{width:8px}
            #ssh-menu::-webkit-scrollbar-track{background:transparent}
            #ssh-menu::-webkit-scrollbar-thumb{background:var(--accent,#ff3b3b);border-radius:4px;opacity:0.6}
            #ssh-menu{scrollbar-width:thin;scrollbar-color:var(--accent,#ff3b3b) transparent}
            #ssh-menu .ssh-row[data-desc]{cursor:help}
            #ssh-tip{position:fixed;z-index:2147483647;max-width:210px;
                background:#0d0d0d;color:#eee;border:1px solid var(--accent,#ff3b3b);
                border-radius:var(--radius,6px);padding:5px 8px;font:11px/1.4 -apple-system,system-ui,sans-serif;
                pointer-events:none;opacity:0;transition:opacity .12s;
                box-shadow:0 2px 12px rgba(0,0,0,0.55)}
        `;
        document.head.appendChild(css);

        const wrap = document.createElement('div');
        wrap.id = 'ssh-menu';
        wrap.style.cssText = [
            'position:fixed', 'top:12px', 'left:12px', 'z-index:2147483647',
            'background:rgba(0,0,0,0.82)', 'color:#fff',
            'font:12px/1.4 -apple-system,system-ui,sans-serif',
            'padding:10px 12px', 'border-radius:6px', 'min-width:230px',
            'border:1px solid #000000', 'user-select:none',
            'box-shadow:0 2px 10px rgba(0,0,0,0.4)',
            'max-height:calc(100vh - 24px)', 'overflow-y:auto', 'overflow-x:hidden',
        ].join(';');
        wrap.innerHTML = `
            <div class="ssh-titlebar" style="font-weight:bold;margin-bottom:2px;display:flex;justify-content:space-between;align-items:center;">
                <span class="ssh-title" style="color:#ff3b3b;">Shellhax</span>
                <span style="opacity:0.55;font-weight:normal;font-size:11px;">\` to hide</span>
            </div>
            <div style="opacity:0.6;font-weight:normal;font-size:10px;margin-bottom:6px;">Robbie approved &#128020;</div>
            <div class="ssh-cat open">
                <div class="ssh-cat-hdr">Combat <span class="ssh-arr">&#9654;</span></div>
                <div class="ssh-cat-body">
                    ${_rowCheck('aimEnabled', 'Aimbot', '(hold RMB)')}
                    ${_rowCheck('autoAim', 'Auto Aim', '(no RMB)')}
                    ${_rowCheck('crosshairTarget', 'Target Crosshair', '(else closest)')}
                    ${_rowCheck('onlyVisible', 'Only Visible', '(else prioritise)')}
                    ${_rowCheck('predEnabled', 'Prediction')}
                    ${_rowCheck('antiBloom', 'Anti-Bloom')}
                    ${_rowCheck('bloomSmooth', 'Bloom Smooth', '(steady offset)')}
                    ${_rowCheck('silentAim', 'Silent Aim', '(no cam move)')}
                    ${_rowCheck('semiSilent', 'Semi-Silent', '(cam after shot)')}
                </div>
            </div>
            <div class="ssh-cat open">
                <div class="ssh-cat-hdr">ESP <span class="ssh-arr">&#9654;</span></div>
                <div class="ssh-cat-body">
                    ${_rowCheck('espEnabled', 'ESP', '(V)')}
                    ${_rowCheck('itemEsp', 'Item ESP', '(ammo · grenades)')}
                    ${_rowCheck('nameTags', 'Name Tags')}
                    ${_rowSelect('espBoxStyle', 'Box Style', [['full','Full'],['corners','Corners']])}
                    ${_rowColor('espColor', 'Enemy Color')}
                    ${_rowColor('nyxColor', 'Nyx Color')}
                </div>
            </div>
            <div class="ssh-cat">
                <div class="ssh-cat-hdr">Chat <span class="ssh-arr">&#9654;</span></div>
                <div class="ssh-cat-body">
                    ${_rowCheck('autoChat', 'Auto Chat', '(spammer)')}
                    ${_rowCheck('chatResponder', 'Auto Reply', '(trigger words)')}
                    ${_rowText('autoChatText', 'Messages', 'a | b | c')}
                    ${_rowRange('autoChatDelay', 'Delay (ms)', 1000, 30000, 250)}
                    <div class="ssh-row"><span class="ssh-hint" style="font-size:10px;">Spammer: <b>|</b>-separated, rotates in order. Auto Reply talks back to trigger words.</span></div>
                </div>
            </div>
            <div class="ssh-cat">
                <div class="ssh-cat-hdr">Theme <span class="ssh-arr">&#9654;</span></div>
                <div class="ssh-cat-body">
                    <div class="ssh-tpresets">
                        ${Object.keys(THEME_PRESETS).map(n => `<button class="ssh-tpreset" data-preset="${n}">${n}</button>`).join('')}
                    </div>
                    <div class="ssh-presets">
                        <div class="ssh-preset" data-accent="#ff3b3b" style="background:#ff3b3b" title="Red"></div>
                        <div class="ssh-preset" data-accent="#3b82f6" style="background:#3b82f6" title="Blue"></div>
                        <div class="ssh-preset" data-accent="#22c55e" style="background:#22c55e" title="Green"></div>
                        <div class="ssh-preset" data-accent="#b34dff" style="background:#b34dff" title="Purple"></div>
                        <div class="ssh-preset" data-accent="#c25a28" style="background:linear-gradient(135deg,#7d8a99 0%,#7d8a99 45%,#c25a28 55%,#c25a28 100%)" title="Robbie &#128020;"></div>
                    </div>
                    ${_rowColor('themeAccent', 'Accent')}
                    ${_rowColor('themeBg', 'Background')}
                    ${_rowColor('themeText', 'Text')}
                    ${_rowColor('themeBorder', 'Border')}
                    ${_rowSelect('themeFont', 'Font', [['system','System'],['mono','Mono'],['serif','Serif'],['rounded','Rounded']])}
                    ${_rowRange('themeFontSize', 'Text Size', 9, 20, 1)}
                    ${_rowRange('themeOpacity', 'Opacity', 0, 100, 1)}
                    ${_rowRange('themeRadius', 'Roundness', 0, 20, 1)}
                    ${_rowRange('themeBorderW', 'Border Width', 0, 6, 1)}
                    ${_rowRange('themeBlur', 'Glass Blur', 0, 16, 1)}
                    ${_rowCheck('themeGlow', 'Glow')}
                    <div class="ssh-row"><button class="ssh-reset">Reset to Default</button></div>
                </div>
            </div>
            <div class="ssh-cat">
                <div class="ssh-cat-hdr">Skins <span class="ssh-arr">&#9654;</span></div>
                <div class="ssh-cat-body">
                    ${_rowCheck('unlockSkins', 'Unlock Skins')}
                </div>
            </div>
            <div class="ssh-cat">
                <div class="ssh-cat-hdr">Cataloging <span class="ssh-arr">&#9654;</span></div>
                <div class="ssh-cat-body">
                    <div class="ssh-row"><span class="ssh-hint" style="font-size:10px;">What's new — newest first.</span></div>
                    <div class="ssh-cat-log">${_catalogHtml()}</div>
                </div>
            </div>
            <div id="ssh-nyx" style="margin-top:6px;padding:6px 8px;border-radius:4px;background:rgba(180,80,255,0.18);border:1px solid rgba(180,80,255,0.55);color:#e9d5ff;font-size:11px;line-height:1.35;">
                Join the <b>Nyx</b> wave — start your name with <b>Nyx</b> so we can spot each other.
            </div>
        `;
        document.body.appendChild(wrap);

        nyxBannerEl = wrap.querySelector('#ssh-nyx');
        const inputs = wrap.querySelectorAll('[data-k]');

        // Collapsible categories: clicking a header toggles its body open/closed.
        wrap.querySelectorAll('.ssh-cat-hdr').forEach(hdr => {
            hdr.addEventListener('click', () => hdr.parentElement.classList.toggle('open'));
        });

        refreshMenu = () => {
            inputs.forEach(el => {
                const k = el.dataset.k;
                if (el.type === 'checkbox') el.checked = !!settings[k];
                // Only reassign when it differs — writing an identical value to a
                // text field/textarea resets the caret to the end while typing.
                else if (el.value !== String(settings[k] ?? '')) el.value = settings[k];
            });
            wrap.querySelectorAll('.ssh-val').forEach(s => { s.textContent = settings[s.dataset.for]; });
            applyTheme(wrap);
            wrap.style.display = settings.menuVisible ? '' : 'none';
        };

        inputs.forEach(el => {
            el.addEventListener('input', () => {
                const k = el.dataset.k;
                if (el.type === 'checkbox')      settings[k] = el.checked;
                else if (el.type === 'range')    { const n = parseFloat(el.value); settings[k] = Number.isFinite(n) ? n : DEFAULT_SETTINGS[k]; }
                else                             settings[k] = el.value; // color / select
                saveSettings(); refreshMenu();
            });
        });

        // Theme preset swatches set the accent color in one click.
        wrap.querySelectorAll('.ssh-preset').forEach(sw => {
            sw.addEventListener('click', () => {
                settings.themeAccent = sw.dataset.accent;
                saveSettings(); refreshMenu();
            });
        });

        // Full-theme presets: apply every color/shape key at once.
        wrap.querySelectorAll('.ssh-tpreset').forEach(btn => {
            btn.addEventListener('click', () => {
                const p = THEME_PRESETS[btn.dataset.preset];
                if (p) { Object.assign(settings, p); saveSettings(); refreshMenu(); }
            });
        });

        // Reset every theme setting to its default (appearance only — leaves the
        // dragged menu position alone).
        const resetBtn = wrap.querySelector('.ssh-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                Object.keys(DEFAULT_SETTINGS).forEach(k => {
                    if (k.startsWith('theme') && k !== 'themeLeft' && k !== 'themeTop') {
                        settings[k] = DEFAULT_SETTINGS[k];
                    }
                });
                saveSettings(); refreshMenu();
            });
        }

        // Drag the menu by its title bar. Position is remembered per session.
        if (settings.themeLeft != null && settings.themeTop != null) {
            wrap.style.left = settings.themeLeft + 'px';
            wrap.style.top  = settings.themeTop + 'px';
            wrap.style.right = 'auto';
        }
        const bar = wrap.querySelector('.ssh-titlebar');
        if (bar) {
            let dragging = false, offX = 0, offY = 0;
            bar.addEventListener('mousedown', e => {
                dragging = true;
                const r = wrap.getBoundingClientRect();
                offX = e.clientX - r.left;
                offY = e.clientY - r.top;
                e.preventDefault();
            });
            document.addEventListener('mousemove', e => {
                if (!dragging) return;
                const x = Math.max(0, Math.min(window.innerWidth  - 40, e.clientX - offX));
                const y = Math.max(0, Math.min(window.innerHeight - 20, e.clientY - offY));
                wrap.style.left = x + 'px';
                wrap.style.top  = y + 'px';
                wrap.style.right = 'auto';
            });
            document.addEventListener('mouseup', () => {
                if (!dragging) return;
                dragging = false;
                settings.themeLeft = parseInt(wrap.style.left, 10);
                settings.themeTop  = parseInt(wrap.style.top, 10);
                saveSettings();
            });
        }

        // Hover tooltips: each feature row with a data-desc shows a small
        // floating description beside the panel while the cursor is over it.
        const tip = document.createElement('div');
        tip.id = 'ssh-tip';
        wrap.appendChild(tip); // inside #ssh-menu so it inherits --accent/--radius
        wrap.querySelectorAll('.ssh-row[data-desc]').forEach(row => {
            row.addEventListener('mouseenter', () => {
                tip.textContent = row.dataset.desc;
                tip.style.opacity = '1';
                const r  = row.getBoundingClientRect();
                const wr = wrap.getBoundingClientRect();
                // Default: to the right of the panel; flip left if it'd overflow.
                let left = wr.right + 8;
                if (left + tip.offsetWidth > window.innerWidth - 4) {
                    left = Math.max(4, wr.left - tip.offsetWidth - 8);
                }
                tip.style.left = left + 'px';
                tip.style.top  = Math.max(4,
                    Math.min(r.top, window.innerHeight - tip.offsetHeight - 4)) + 'px';
            });
            row.addEventListener('mouseleave', () => { tip.style.opacity = '0'; });
        });

        refreshMenu();

        // Stop menu interactions from bleeding into the game.
        ['keydown','keyup','mousedown','mouseup','wheel','contextmenu'].forEach(ev =>
            wrap.addEventListener(ev, e => e.stopPropagation(), true));

        log('menu built');
    }

    if (document.body) { buildMenu(); }
    else document.addEventListener('DOMContentLoaded', () => { buildMenu(); });

    // ────────────────────────────────────────────────────────────────────────
    // ROBBIE PUZZLE 🐓 — every few minutes, a full-screen lock asks you to
    // prove your devotion to Robbie before you can keep playing. Pure bit.
    // ────────────────────────────────────────────────────────────────────────
    let _robbiePuzzleOpen = false;
    let _robbieTimer = null;

    // The full puzzle bank. Each entry is a question + answer checker; the
    // photo is chosen per-question at render time.
    function robbieAllPuzzles() {
        const norm = (s) => String(s).trim().toLowerCase();
        return [
            { question: "What is the rooster's name?", hint: 'type his name',
              check: (a) => norm(a) === 'robbie' },
            { question: 'Unscramble: I B B E O R', hint: '6 letters',
              check: (a) => norm(a) === 'robbie' },
            { question: 'What animal is Robbie?', hint: 'rooster / chicken',
              check: (a) => ['rooster', 'chicken'].includes(norm(a)) },
            { question: 'How many legs does Robbie have?', hint: 'a number',
              check: (a) => norm(a) === '2' || norm(a) === 'two' },
            { question: 'Robbie pecked 4 times, then 3 more. How many pecks?', hint: 'a number',
              check: (a) => norm(a) === '7' || norm(a) === 'seven' },
            { question: 'Finish it: cock-a-doodle-___', hint: 'one word',
              check: (a) => norm(a).replace(/[^a-z]/g, '') === 'doo' },
            { question: 'Best bird alive? (type his name)', hint: '🐓',
              check: (a) => norm(a) === 'robbie' },
        ];
    }

    // persist = the real one-time puzzle (marks "done" + clears deadline on
    //           solve, so it never returns).
    // all     = ask every question in sequence (used by the Test button).
    function showRobbiePuzzle(persist, all) {
        if (_robbiePuzzleOpen || !document.body) return;
        _robbiePuzzleOpen = true;
        try { document.exitPointerLock && document.exitPointerLock(); } catch (e) {}

        const bank = robbieAllPuzzles();
        const queue = all ? bank.slice()
                          : [ bank[Math.floor(Math.random() * bank.length)] ];
        let qi = 0, tries = 0, locked = false;

        const ov = document.createElement('div');
        ov.id = 'ssh-robbie-puzzle';
        ov.style.cssText = [
            'position:fixed', 'inset:0', 'z-index:2147483647',
            'background:rgba(0,0,0,0.92)', 'color:#fff',
            'display:flex', 'flex-direction:column', 'align-items:center', 'justify-content:center',
            'gap:14px', 'font:16px/1.4 -apple-system,system-ui,sans-serif', 'text-align:center',
        ].join(';');
        ov.innerHTML = `
            <div style="font-size:22px;font-weight:bold;color:#c25a28;">🐓 Robbie Check 🐓</div>
            <div id="ssh-robbie-progress" style="opacity:0.6;font-size:12px;"></div>
            <img id="ssh-robbie-img" alt="Robbie" style="max-width:240px;max-height:240px;border-radius:10px;border:3px solid #c25a28;box-shadow:0 4px 20px rgba(0,0,0,0.6);">
            <div id="ssh-robbie-q" style="font-size:18px;max-width:420px;"></div>
            <input id="ssh-robbie-answer" type="text" autocomplete="off" placeholder="your answer"
                style="font:inherit;padding:6px 10px;border-radius:6px;border:2px solid #c25a28;background:#1a1a1a;color:#fff;text-align:center;width:220px;">
            <div id="ssh-robbie-hint" style="opacity:0.5;font-size:12px;"></div>
            <button id="ssh-robbie-submit" style="background:#c25a28;color:#fff;border:none;border-radius:6px;padding:7px 16px;font:inherit;cursor:pointer;">Continue</button>
            <div id="ssh-robbie-feedback" style="min-height:18px;font-size:13px;color:#ff6b6b;"></div>
        `;
        document.body.appendChild(ov);

        // Eat clicks/keys so the game can't be played behind the lock.
        ['mousedown', 'mouseup', 'click', 'wheel', 'contextmenu', 'keydown', 'keyup']
            .forEach(ev => ov.addEventListener(ev, e => e.stopPropagation(), false));

        const img      = ov.querySelector('#ssh-robbie-img');
        const progress = ov.querySelector('#ssh-robbie-progress');
        const qEl      = ov.querySelector('#ssh-robbie-q');
        const hintEl   = ov.querySelector('#ssh-robbie-hint');
        const input    = ov.querySelector('#ssh-robbie-answer');
        const feedback = ov.querySelector('#ssh-robbie-feedback');
        const submit   = ov.querySelector('#ssh-robbie-submit');
        const FAILS = ['Robbie is disappointed. Try again. 🐓', 'wrong. Robbie clucks in dismay.', 'nope. Robbie expected better.'];

        const close = () => {
            try { ov.remove(); } catch (e) {}
            _robbiePuzzleOpen = false;
            if (persist) { robbieLSset(ROBBIE_DONE_KEY, '1'); robbieLSdel(ROBBIE_DEADLINE_KEY); }
        };

        const render = () => {
            locked = false; tries = 0;
            const p = queue[qi];
            img.src = ROBBIE_PHOTOS[Math.floor(Math.random() * ROBBIE_PHOTOS.length)];
            progress.textContent = queue.length > 1 ? `Question ${qi + 1} / ${queue.length}` : '';
            qEl.textContent = p.question;
            hintEl.textContent = p.hint;
            feedback.textContent = '';
            input.value = '';
            submit.disabled = false;
            setTimeout(() => input.focus(), 30);
        };

        const attempt = () => {
            if (locked) return;
            if (queue[qi].check(input.value)) {
                qi++;
                locked = true;
                submit.disabled = true;
                feedback.style.color = '#4ade80';
                if (qi >= queue.length) {
                    feedback.textContent = queue.length > 1 ? 'All correct! Robbie is proud. 🐓' : 'Robbie approves. 🐓';
                    setTimeout(close, 700);
                } else {
                    feedback.textContent = 'Correct! 🐓';
                    setTimeout(render, 450);
                }
            } else {
                tries++;
                feedback.style.color = '#ff6b6b';
                feedback.textContent = FAILS[Math.min(tries - 1, FAILS.length - 1)];
                input.value = '';
                input.focus();
            }
        };

        submit.addEventListener('click', attempt);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); attempt(); } });
        render();
    }

    // One-time, but escape-proof: the deadline lives in localStorage, so
    // refreshing or opening a new tab can't reset the countdown or dodge the
    // puzzle. Once the deadline passes it shows immediately on every load and
    // stays until solved; solving sets a "done" flag so it never returns.
    const ROBBIE_DEADLINE_KEY = 'ssh_robbie_deadline';
    const ROBBIE_DONE_KEY     = 'ssh_robbie_done';
    function robbieLS(k)       { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function robbieLSset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    function robbieLSdel(k)    { try { localStorage.removeItem(k); } catch (e) {} }

    let _robbieArmed = false;
    function armRobbiePuzzle() {
        if (_robbieArmed) return;
        _robbieArmed = true;
        if (robbieLS(ROBBIE_DONE_KEY)) return; // already solved — never again

        // Persistent deadline: set once (5 minutes from first load), survives
        // refreshes / new tabs. Hardcoded and inescapable — there is no toggle
        // and no way to change when it fires. Once the deadline passes the
        // puzzle shows on every load and stays until solved.
        const ROBBIE_DELAY_MS = 5 * 60000; // 5 minutes, fixed
        let deadline = parseInt(robbieLS(ROBBIE_DEADLINE_KEY), 10);
        if (!Number.isFinite(deadline)) {
            deadline = Date.now() + ROBBIE_DELAY_MS;
            robbieLSset(ROBBIE_DEADLINE_KEY, String(deadline));
        }
        const fire = () => showRobbiePuzzle(true); // unconditional once armed
        const wait = deadline - Date.now();
        if (wait <= 0) fire();                       // already due → show now
        else _robbieTimer = setTimeout(fire, wait);  // otherwise wait it out
    }
    armRobbiePuzzle();

    // ────────────────────────────────────────────────────────────────────────
    // YAW/PITCH MECHANISM (trimmed port of babylon.js's `yawpitch` helper)
    //
    // shellshock.io's camera state lives in WASM. You cannot move the camera
    // by mutating player.yaw / player.pitch directly — the WASM module is the
    // source of truth. The only thing that DOES affect the camera is the
    // game's `pointermove` listener (named "real" in the bundle), which
    // converts movementX/Y into WASM look deltas.
    //
    // Steps:
    //   1. Hook addEventListener early to capture that listener.
    //   2. To turn the camera N radians, synthesize a fake pointermove event
    //      with movementX = N/sensitivity and call the listener directly.
    //   3. After moving, read back the resulting yaw/pitch from the bundle's
    //      `unsafeWindow.get_yaw_pitch()` helper.
    // ────────────────────────────────────────────────────────────────────────
    let realPointerListener = null;
    const _origAEL = PAGE.EventTarget.prototype.addEventListener;
    PAGE.EventTarget.prototype.addEventListener = function (type, listener, options) {
        try {
            if (type === 'pointermove' && listener && listener.name === 'real') {
                realPointerListener = listener;
                log('captured real pointermove listener');
            }
        } catch (e) { /* never break the page's own event hooks */ }
        return _origAEL.call(this, type, listener, options);
    };

    function getCurrentYawPitch() {
        try { return unsafeWindow.get_yaw_pitch(); } catch (e) { return null; }
    }

    // Local player's uniqueId, cached each frame from the per-frame callback.
    // set_mouse_params needs it to know whose look sensitivity to configure.
    let _mouseParamsId = null;

    // THE FIX (ported from a reference client): before sending a synthetic mouse move,
    // pin the WASM mouse sensitivity to a KNOWN value (mouseSpeed 50, no invert,
    // no scope). The WASM module converts movementX → yaw by its own internal
    // sensitivity; if that's left at the user's in-game setting it almost never
    // equals our SENSITIVITY (0.0025), so each synthetic move under/overshoots
    // and the camera only creeps toward the target over several frames — the
    // "lag". Forcing mouseSpeed 50 here makes movementX*0.0025 == yaw exactly,
    // so a SINGLE setToYawPitch snaps onto target. a reference client calls this before
    // every movePointer (a reference client: yawpitch.movePointer).
    function normalizeMouseSensitivity() {
        try {
            unsafeWindow.set_mouse_params(50, 0, 0.9, false, _mouseParamsId);
        } catch (e) { /* WASM helper absent on this build — fall back to creep */ }
    }

    function movePointer(mx, my) {
        mx = Math.round(mx); my = Math.round(my);
        if (mx === 0 && my === 0) return;
        if (!realPointerListener) return;
        normalizeMouseSensitivity();
        realPointerListener({ movementX: mx, movementY: my, x: 1, isTrusted: true });
    }

    // Signed shortest-arc difference between two angles, in (-π, π].
    function radianDiff(a, b) {
        const TAU = 2 * Math.PI;
        a = ((a % TAU) + TAU) % TAU;
        b = ((b % TAU) + TAU) % TAU;
        let d = Math.abs(a - b);
        d = Math.min(d, TAU - d);
        return (((a - b + TAU) % TAU) > Math.PI) ? -d : d;
    }

    // Aim camera at the given yaw/pitch (in radians, get_yaw_pitch convention).
    function setToYawPitch(targetYaw, targetPitch) {
        const cur = getCurrentYawPitch();
        if (!cur) return;
        const dy = radianDiff(cur.yaw,   targetYaw);
        const dp = radianDiff(cur.pitch, targetPitch);
        movePointer(dy / SENSITIVITY, dp / SENSITIVITY);
    }

    // ────────────────────────────────────────────────────────────────────────
    // SHARED AIM MATH — yaw/pitch of a direction vector, in the game's
    // RotationYawPitchRoll basis (matches a reference client's calculateYaw/calculatePitch).
    // Used by the aimbot to convert a (me → target) vector into the yaw/pitch the
    // camera should hold.
    // ────────────────────────────────────────────────────────────────────────
    const _mod = (a, n) => ((a % n) + n) % n;
    const _setPrecision = (v) => Math.round(v * 8192) / 8192; // game's shot precision
    const _calcYaw   = (pos) => _setPrecision(_mod(Math.atan2(pos.x, pos.z), 2 * Math.PI));
    const _calcPitch = (pos) => _setPrecision(-Math.atan2(pos.y, Math.hypot(pos.x, pos.z)) % 1.5);

    // Resolve the weapon's static config (bullet velocity, range, mesh name).
    // babylon2 reads it off `weapon.subClass`; older/other builds expose the
    // same data on `weapon.constructor` (where a reference client reads it).
    function _weaponConfig(w) {
        return (w && w.subClass) || (w && w.constructor) || {};
    }

    // ── ANTI-BLOOM (a reference client predictBloom port) ────────────────────────────
    // Predicts the yaw/pitch deflection the gun's bloom WILL apply to the next
    // shot and adds it to the aim target, so the scattered bullet lands on the
    // real target. Replays the weapon RNG: seed advances seed=(seed*9301+49297)
    // %233280, 3 draws/shot scaled by weapon.accuracy, projected through
    // RotationYawPitchRoll back to a yaw/pitch diff. Shotguns average 20 pellets.
    //
    // HISTORY: this has been ported and removed TWICE before because it never
    // improved hits in practice (see memory project_no_spread_mechanism). The
    // suspected failure is that the seed read at aim-time != the seed the next
    // shot consumes, or the matrix sign/basis doesn't match our aim convention.
    // So this version is INSTRUMENTED: set `window.SSH_BLOOM_DEBUG = true` in the
    // console to log the predicted offset AND verify the RNG model against the
    // game by watching how far the real seed advances on each shot.
    const _LCG = (s) => (s * 9301 + 49297) % 233280;

    // The obfuscated key on the player object holding the weapon RNG
    // ({ seed: <number> }). Discovered once by scanning for a child object with
    // a numeric `.seed` (a reference client hardcodes H.randomGen; we rediscover it).
    let _randomGenKey = null;
    function resolveRandomGenKey(me) {
        if (_randomGenKey && me[_randomGenKey] && typeof me[_randomGenKey].seed === 'number') {
            return _randomGenKey;
        }
        _randomGenKey = null;
        for (const k in me) {
            try {
                const v = me[k];
                if (v && typeof v === 'object' && typeof v.seed === 'number') {
                    _randomGenKey = k;
                    log('randomGen key resolved:', k);
                    return k;
                }
            } catch (e) { /* getters that throw — skip */ }
        }
        return null;
    }

    // Logs a bail-out reason ONCE per distinct reason (debug only) — so a single
    // console paste names exactly which guard is making anti-bloom a no-op.
    const _bloomBailSeen = new Set();
    function _bloomBail(reason) {
        if (unsafeWindow.SSH_BLOOM_DEBUG && !_bloomBailSeen.has(reason)) {
            _bloomBailSeen.add(reason);
            log('[bloom] NO-OP — bailed at:', reason);
        }
        return [0, 0];
    }

    // Read a weapon field from wherever this bundle keeps it: the instance, its
    // `subClass` (where babylon2 finds velocity), or its `constructor` (where
    // a reference client reads range / standardMeshName). Returns undefined if absent.
    function _wfield(w, name) {
        if (!w) return undefined;
        if (typeof w[name] !== 'undefined') return w[name];
        if (w.subClass && typeof w.subClass[name] !== 'undefined') return w.subClass[name];
        if (w.constructor && typeof w.constructor[name] !== 'undefined') return w.constructor[name];
        return undefined;
    }
    // Resolve the local player's current weapon. Prefer me[H.weapon]; if that
    // key is wrong on this bundle, scan the player for an object that looks like
    // a weapon (has a numeric `accuracy`, anywhere, or an ammo + subClass).
    let _weaponKey = null;
    function resolveWeapon(me) {
        const hw = me[H.weapon];
        if (hw && typeof _wfield(hw, 'accuracy') === 'number') return hw;
        if (_weaponKey && me[_weaponKey] && typeof _wfield(me[_weaponKey], 'accuracy') === 'number') return me[_weaponKey];
        _weaponKey = null;
        for (const k in me) {
            try {
                const v = me[k];
                if (v && typeof v === 'object' && typeof _wfield(v, 'accuracy') === 'number'
                    && (v.ammo || v.subClass || (v.constructor && typeof v.constructor.range === 'number'))) {
                    _weaponKey = k;
                    log('weapon key resolved:', k, '(H.weapon=' + H.weapon + ' was wrong)');
                    return v;
                }
            } catch (e) { /* throwing getter — skip */ }
        }
        return hw || null;
    }

    // Returns [dYaw, dPitch] (radians) to ADD to the aim target. [0,0] when it
    // can't resolve the RNG/weapon (then aim is unchanged — safe no-op).
    function predictBloom(me, yaw, pitch) {
        try {
            if (typeof BABYLON === 'undefined') return _bloomBail('BABYLON undefined');
            const rgKey = resolveRandomGenKey(me);
            if (!rgKey) return _bloomBail('randomGen key not found on player');
            const weapon = resolveWeapon(me);
            if (!weapon) return _bloomBail('weapon not found (H.weapon=' + H.weapon + ')');
            const accuracy = _wfield(weapon, 'accuracy');
            const range = _wfield(weapon, 'range');
            if (typeof accuracy !== 'number') return _bloomBail('accuracy not found on instance/subClass/constructor');
            if (typeof range !== 'number') return _bloomBail('range not found on instance/subClass/constructor');
            const pellets = (_wfield(weapon, 'standardMeshName') === 'dozenGauge') ? 20 : 1;
            if (unsafeWindow.SSH_BLOOM_DEBUG && !_bloomBailSeen.has('OK')) {
                _bloomBailSeen.add('OK');
                log('[bloom] inputs OK — rgKey=', rgKey, 'seed=', me[rgKey].seed,
                    'accuracy=', accuracy, 'range=', range, 'pellets=', pellets);
            }

            let seed = me[rgKey].seed; // copy — we replay, never mutate the game's
            let sumYaw = 0, sumPitch = 0;
            for (let p = 0; p < pellets; p++) {
                const n = [];
                for (let i = 0; i < 3; i++) {
                    seed = _LCG(seed);
                    n.push(((seed / 233280) - 0.5) * accuracy);
                }
                const rot   = BABYLON.Matrix.RotationYawPitchRoll(yaw, pitch, 0);
                const trans = BABYLON.Matrix.Translation(0, 0, range);
                const playerAndRange = trans.multiply(rot);
                const bloom = BABYLON.Matrix.RotationYawPitchRoll(n[0], n[1], n[2]);
                const t = playerAndRange.multiply(bloom).getTranslation();
                sumYaw   += radianDiff(yaw,   _calcYaw(t));
                sumPitch += radianDiff(pitch, _calcPitch(t));
            }
            return [sumYaw / pellets, sumPitch / pellets];
        } catch (e) { return [0, 0]; }
    }

    // Returns the bloom offset to ADD to the aim target. When settings.bloomSmooth
    // is ON, EMA-filters predictBloom's raw output so the correction settles near
    // the distribution's centre instead of leaping to a fresh random value every
    // shot (the seed advances per shot, which is what makes raw anti-bloom look
    // like it sprays all over). Resets on target switch so a new target snaps
    // instantly. When OFF, passes the raw offset straight through (old behaviour).
    const BLOOM_SMOOTH = 0.15; // lower = steadier/tighter, higher = more reactive
    function predictBloomSmooth(me, yaw, pitch, target) {
        const raw = predictBloom(me, yaw, pitch);
        if (!settings.bloomSmooth) return raw;
        if (_aim.bloomTarget !== target) {
            _aim.bloomTarget = target;
            _aim.bloomYaw = raw[0]; _aim.bloomPitch = raw[1];
        } else {
            _aim.bloomYaw   += (raw[0] - _aim.bloomYaw)   * BLOOM_SMOOTH;
            _aim.bloomPitch += (raw[1] - _aim.bloomPitch) * BLOOM_SMOOTH;
        }
        return [_aim.bloomYaw, _aim.bloomPitch];
    }

    // ── Anti-bloom instrumentation (window.SSH_BLOOM_DEBUG === true) ─────────
    // Watches the real RNG seed every frame. When it changes (a shot fired), it
    // counts how many LCG steps separate the old and new seed — i.e. how many
    // scatter draws the game actually consumed per shot. If our model is right
    // this should be 3 (1 shot) or a multiple of 3. A mismatch means our seed
    // replay is wrong, which is the most likely reason anti-bloom misses.
    let _bloomDbgSeed = null;
    const _RAD2DEG = 180 / Math.PI;
    function _seedStepsBetween(prev, next, max) {
        let s = prev;
        for (let i = 1; i <= max; i++) { s = _LCG(s); if (s === next) return i; }
        return -1; // not reachable within `max` steps
    }
    // One-time dump of the weapon object so we can locate `accuracy`, `range`
    // and `standardMeshName` on THIS bundle (they came back undefined).
    let _weaponDumped = false;
    function _dumpWeapon(me) {
        if (_weaponDumped) return;
        const w = me[H.weapon];
        if (!w) { log('[bloom] me[H.weapon] is', w, '(H.weapon=' + H.weapon + ')'); return; }
        _weaponDumped = true;
        const safe = (o) => { try { return o ? Object.keys(o) : o; } catch (e) { return '<err>'; } };
        const ctor = w.constructor;
        log('[bloom] WEAPON DUMP — instance keys:', safe(w));
        log('[bloom]   w.accuracy=', w.accuracy, ' w.range=', w.range, ' w.standardMeshName=', w.standardMeshName);
        log('[bloom]   w.subClass keys:', safe(w.subClass),
            '| subClass.accuracy=', w.subClass && w.subClass.accuracy,
            'range=', w.subClass && w.subClass.range,
            'mesh=', w.subClass && w.subClass.standardMeshName);
        log('[bloom]   w.constructor.name=', ctor && ctor.name,
            '| ctor.accuracy=', ctor && ctor.accuracy,
            'range=', ctor && ctor.range,
            'mesh=', ctor && ctor.standardMeshName);
    }
    function bloomDebugTick(me) {
        if (!unsafeWindow.SSH_BLOOM_DEBUG) { _bloomDbgSeed = null; return; }
        _dumpWeapon(me);
        const rgKey = resolveRandomGenKey(me);
        if (!rgKey) return;
        const seed = me[rgKey].seed;
        if (_bloomDbgSeed != null && seed !== _bloomDbgSeed) {
            const steps = _seedStepsBetween(_bloomDbgSeed, seed, 600);
            const w = resolveWeapon(me);
            log('[bloom] seed advanced', steps, 'LCG steps this shot',
                '(expect 3/shot, ×20 for shotgun) — accuracy=',
                _wfield(w, 'accuracy'), 'range=', _wfield(w, 'range'),
                'mesh=', _wfield(w, 'standardMeshName'));
        }
        _bloomDbgSeed = seed;
    }

    // ────────────────────────────────────────────────────────────────────────
    // BUNDLE INTERCEPTION — same pattern as babylon.js (which works).
    // ────────────────────────────────────────────────────────────────────────
    const _origReplace = String.prototype.replace;
    String.prototype.sshReplace = function () { return _origReplace.apply(this, arguments); };

    const CB_NAME = 'ssh_' + Math.random().toString(36).slice(2, 10);
    // Global name the bundle's patched fire() calls into for silent aim.
    const FIRE_HOOK = 'ssh_fire_' + Math.random().toString(36).slice(2, 10);

    const DEFAULTS = {
        x: 'Fh', y: 'Qh', z: 'Th',
        dz: 'dz', // per-tick velocity z (dx/dy are usually plain props; dz can be minified)
        yaw: 'Eh', pitch: '$h', coords: 'aa',
        uniqueId: 'IZ', // local player's network id — needed by set_mouse_params
        playing: 'Gh',
        actor: 'eh', mesh: 'mesh',
        weapon: 'Ah',
        renderingGroupId: 'renderingGroupId',
        SCENE: 'eI', PLAYERS: 'rI',
        CULL: 'Xw',
        items: 'kr',
    };

    function extractKeys(js) {
        const out = Object.assign({}, DEFAULTS);
        try {
            let m;
            // WASM mouse-look bridge: `(zO.Kw=e.yaw,zO.Ew=e.pitch,zO.Qz=e.coords)`
            m = /\(([a-zA-Z_$0-9]+)\.([a-zA-Z_$0-9]+)=e\.yaw,\1\.([a-zA-Z_$0-9]+)=e\.pitch,\1\.([a-zA-Z_$0-9]+)=e\.coords\)/.exec(js);
            if (m) { out.yaw = m[2]; out.pitch = m[3]; out.coords = m[4]; }
            // Players-array iteration
            m = /for\s*\(\s*(?:var|let)\s+\w+=0;\w+<([a-zA-Z_$0-9]+);\w+\+\+\)\s*\{\s*(?:var|let)\s+\w+=([a-zA-Z_$0-9]+)\[\w+\];\s*\w+&&\w+\.([a-zA-Z_$0-9]+)&&/.exec(js);
            if (m) { out.PLAYERS = m[2]; out.playing = m[3]; }
            // Spectator-info builder pos fields
            m = /posX:[a-zA-Z_$0-9]+\.([a-zA-Z_$0-9]+),posY:[a-zA-Z_$0-9]+\.([a-zA-Z_$0-9]+),posZ:[a-zA-Z_$0-9]+\.([a-zA-Z_$0-9]+)/.exec(js);
            if (m) { out.x = m[1]; out.y = m[2]; out.z = m[3]; }
            // Actor + mesh
            m = /actorX:[a-zA-Z_$0-9]+\.([a-zA-Z_$0-9]+)\.([a-zA-Z_$0-9]+)\.position\.x/.exec(js);
            if (m) { out.actor = m[1]; out.mesh = m[2]; }
            // SCENE: first render() in the two-render() pattern
            m = /([a-zA-Z_$0-9]+)\.render\(\),[a-zA-Z_$0-9]+\.render\(\)\}\)\)/.exec(js);
            if (m) out.SCENE = m[1];
            // Items manager: the network-protocol handler calls
            // `<X>.spawnItem(s,p,m,v,y);break;` with exactly those 5 args.
            // Capture <X> as the items-manager instance.
            m = /([a-zA-Z_$0-9]+)\.spawnItem\([a-zA-Z_$0-9]+,[a-zA-Z_$0-9]+,[a-zA-Z_$0-9]+,[a-zA-Z_$0-9]+,[a-zA-Z_$0-9]+\);break;/.exec(js);
            if (m) out.items = m[1];
            // Native map collider (a reference client's ss.RAYS). Anchor on the STABLE
            // literal `projectileCollidesWithCell` — the game calls
            //   <RAYS>.<rayCollidesWithMap>(pos, dir, <RAYS>.projectileCollidesWithCell)
            // group1 = the RAYS object var, group2 = the obfuscated method name.
            m = /([a-zA-Z_$0-9]+)\.([a-zA-Z_$0-9]+)\([^;]{0,120}?\.projectileCollidesWithCell\)/.exec(js);
            if (m) { out.RAYS = m[1]; out.rayCollidesWithMap = m[2]; log('native collider keys:', m[1], '/', m[2]); }
            else log('WARNING: native map collider not found — line-of-sight will use the scene-pick fallback');
        } catch (e) { log('key extraction error:', e); }
        return out;
    }

    function patchBundle(js) {
        H = extractKeys(js);
        log('H map:', H);

        const argFields = Object.keys(H)
            .map(k => `${k}:(()=>{try{return ${H[k]}}catch(_){return null}})()`)
            .join(',');
        const find    = H.SCENE + '.render';
        const replace = `window["${CB_NAME}"]({${argFields}},true)||${H.SCENE}.render`;
        const before  = js;
        js = js.sshReplace(find, replace);
        if (before === js) log('WARNING: SCENE.render patch did not match');
        else               log('SCENE.render hook installed');

        // Cull inhibition: the bundle hides off-screen / occluded players via
        // `{if(<CULL>)`. Patch to `{if(true)` so all players keep rendering
        // even when behind walls — otherwise our ESP boxes (parented to the
        // player mesh) disappear with them.
        const cullBefore = js;
        js = js.sshReplace('{if(' + H.CULL + ')', '{if(true)');
        if (cullBefore === js) log('WARNING: cull-inhibition patch did not match (H.CULL=' + H.CULL + ')');
        else                   log('cull inhibition installed');

        // ── Item ESP hooks (ammo + grenade drops) ──
        // Anchor on the items-manager prototype methods. Both spawnItem
        // and collectItem have a stable shape:
        //   spawnItem(e,t,i,r,n){var a=this.pools[t].retrieve(e); ...}
        //   collectItem(e,t){var i=this.pools[e]; i.recycle(...); ...}
        // Param names are captured generically so renaming between builds
        // doesn't break the patch.
        // Anchor on the function body (`var a=this.pools[t].retrieve(e);`)
        // and accept both `<Cls>.prototype.spawnItem=function(...)` (old
        // bundle style) and `spawnItem(...){` (ES6 class syntax). The body
        // pattern is what disambiguates from call sites like
        // `kr.spawnItem(s,p,m,v,y);`.
        const spawnItemBefore = js;
        js = js.sshReplace(
            /((?:\.prototype\.spawnItem=function|\bspawnItem)\(([a-zA-Z_$0-9]+),([a-zA-Z_$0-9]+),([a-zA-Z_$0-9]+),([a-zA-Z_$0-9]+),([a-zA-Z_$0-9]+)\)\{var ([a-zA-Z_$0-9]+)=this\.pools\[\3\]\.retrieve\(\2\);)/,
            '$1window.ssh_onItemSpawn&&window.ssh_onItemSpawn($7,$3,$4,$5,$6);'
        );
        if (spawnItemBefore === js) log('WARNING: spawnItem pattern not found — item ESP disabled');
        else                        log('spawnItem hook installed');

        const collectItemBefore = js;
        js = js.sshReplace(
            /((?:\.prototype\.collectItem=function|\bcollectItem)\(([a-zA-Z_$0-9]+),([a-zA-Z_$0-9]+)\)\{var ([a-zA-Z_$0-9]+)=this\.pools\[\2\];)/,
            '$1window.ssh_onItemCollect&&window.ssh_onItemCollect($2,$4.objects[$3]);'
        );
        if (collectItemBefore === js) log('WARNING: collectItem pattern not found');
        else                          log('collectItem hook installed');

        // ── Skin unlock ──
        // The bundle's "do I own this skin?" check is:
        //   `inventory[X].id===Y.id) return true; return false`
        // Patch the trailing comparison so it ALSO passes when our flag
        // `window.ssh_skinUnlock` is set — every skin then appears owned.
        // Gated client-side; the server may still validate at use, but the
        // shop/inventory UI will let you try them on.
        const skinBefore = js;
        js = js.sshReplace(
            /inventory\[[a-zA-Z$_]+\]\.id===[a-zA-Z$_]+\.id\)return!0;return!1/,
            (m) => m + '||window.ssh_skinUnlock'
        );
        if (skinBefore === js) log('WARNING: skin-unlock pattern not found in this bundle');
        else                   log('skin-unlock hook installed');

        // ── Silent aim: hook native fire() (ported from a reference client) ──
        // The game's `fire(){var ...}` becomes
        // `fire(){window.<FIRE_HOOK>(this.player);var ...}` so our hook runs at
        // the very top of the shot routine and can doctor the input-state
        // buffer before the packet is built. The inserted call is null-guarded
        // and fully wrapped in try/catch on our side, so a miss or an error
        // can NEVER break the game's firing.
        const fireBefore = js;
        js = js.sshReplace('fire(){var',
            'fire(){window.' + FIRE_HOOK + '&&window.' + FIRE_HOOK + '(this.player);var');
        if (fireBefore === js) log('WARNING: fire() hook pattern not found — silent aim disabled');
        else                   log('fire() hook installed (silent aim)');

        // ── Silent aim: SERVERSYNC flush (OPT-IN, off by default) ──
        // Doctoring the local state buffer only registers a hit if those
        // doctored states are re-sent to the server. a reference client reconstructs the
        // WebSocket flush and calls it. That edit rewrites the netcode send
        // path — a mis-match would break ALL networking (not just silent aim),
        // so it's gated behind window.SSH_SILENT_SYNC (like SSH_USE_NATIVE).
        // Without it, silent aim still doctors the buffer but may not land.
        if (settings.silentSync) {
            const m = /(\.OPEN&&[a-zA-Z$_]+\.[a-zA-Z$_]+&&![a-zA-Z$_]+&&)(.*?)(\(\)\})/.exec(js);
            if (m) {
                const body = m[2].replace(/[a-zA-Z$_.\[\]]+shots/, '0');
                // Expose the in-scope flush as a global closure, and still run
                // it inline once so the original behaviour is preserved.
                const repl = m[1] + '(window.SSH_SERVERSYNC=function(){return (' + body + ')()})' + m[3];
                const syncBefore = js;
                js = js.sshReplace(m[0], repl);
                if (syncBefore === js) log('WARNING: SERVERSYNC replace failed');
                else                   log('SERVERSYNC flush installed (opt-in)');
            } else {
                log('WARNING: SERVERSYNC pattern not found — silent-aim hits may not register');
            }
        } else {
            log('silent-aim SERVERSYNC flush OFF (enable "Silent Sync" in the menu + reload to register hits)');
        }

        return js;
    }

    const _origAppendChild = PAGE.HTMLElement.prototype.appendChild;
    PAGE.HTMLElement.prototype.appendChild = function (node) {
        if (node && node.tagName === 'SCRIPT' && node.innerHTML &&
            node.innerHTML.startsWith('(()=>{')) {
            log('intercepting bundle, ' + node.innerHTML.length + ' chars');
            node.innerHTML = patchBundle(node.innerHTML);
        }
        return _origAppendChild.call(this, node);
    };

    // ────────────────────────────────────────────────────────────────────────
    // ESP — wireframe box per enemy, parented to their mesh so it follows
    // smoothly. Created on first sight; visibility toggled per frame.
    // ────────────────────────────────────────────────────────────────────────
    let _espWarned = false;
    // Tracks every player we've created an ESP box for. Used by the sweep
    // in the per-frame callback to dispose orphan boxes when a player leaves
    // the match (no longer in ss.PLAYERS) or switches to our team.
    const _espPlayers = new Set();
    function disposeEspFor(P) {
        if (P._ssh_box)    { try { P._ssh_box.dispose();    } catch (e) {} P._ssh_box    = null; }
        if (P._ssh_tracer) { try { P._ssh_tracer.dispose(); } catch (e) {} P._ssh_tracer = null; }
        restoreNameSprite(P); // hand the native nameSprite back to the game
        _espPlayers.delete(P);
    }

    // Enemy box/tracer/nametag colors are user-configurable (settings.espColor /
    // nyxColor) and resolved per-frame via hexToColor3. ESP_COLOR_RED stays as a
    // hard fallback for the rare frame BABYLON loaded but a color parse failed.
    // Item markers keep fixed colors (ammo = yellow, grenade = orange).
    const ESP_COLOR_RED = (typeof BABYLON !== 'undefined') ? new BABYLON.Color3(1.0, 0.2, 0.2) : null;
    const ESP_COLOR_AMMO    = (typeof BABYLON !== 'undefined') ? new BABYLON.Color3(1.0, 0.95, 0.2) : null;
    const ESP_COLOR_GRENADE = (typeof BABYLON !== 'undefined') ? new BABYLON.Color3(1.0, 0.5, 0.0)  : null;
    const _isNyxName = (n) => typeof n === 'string' && n.toLowerCase().startsWith('nyx');

    // Parse "#rrggbb" → cached BABYLON.Color3. Cached so the per-frame ESP loop
    // can ask for the user's chosen color every frame without re-allocating.
    const _color3Cache = new Map();
    function hexToColor3(hex) {
        if (typeof BABYLON === 'undefined') return null;
        let c = _color3Cache.get(hex);
        if (c) return c;
        const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || '');
        c = m
            ? new BABYLON.Color3(parseInt(m[1],16)/255, parseInt(m[2],16)/255, parseInt(m[3],16)/255)
            : new BABYLON.Color3(1, 0.2, 0.2);
        _color3Cache.set(hex, c);
        return c;
    }
    // The hex string an enemy's box/tracer should currently use.
    const espHexFor = (P) => _isNyxName(P && P.name) ? settings.nyxColor : settings.espColor;

    // Item ESP — markers for ammo/grenade pickups. The bundle's items
    // manager pools meshes (Qo.constructors = [Yo, Ko] → type 0 = ammo,
    // type 1 = grenade), so we keep our marker keyed by the pooled mesh
    // and dispose it on collect.
    // Map (not WeakMap) so we can iterate it each frame to dispose markers
    // whose item went inactive without us seeing the collect event.
    const itemMarkers = new Map();
    function makeItemMarker(x, y, z, color) {
        if (typeof BABYLON === 'undefined' || !ss.SCENE) return null;
        const s = 0.35;
        const V = BABYLON.Vector3;
        const m = BABYLON.MeshBuilder.CreateLineSystem(
            'sshitem_' + Math.random().toString(36).slice(2, 8),
            { lines: [
                [new V(-s, 0, 0), new V(s, 0, 0)],
                [new V(0, -s, 0), new V(0, s, 0)],
                [new V(0, 0, -s), new V(0, 0, s)],
            ]},
            ss.SCENE
        );
        m.color = color;
        m.position.x = x; m.position.y = y; m.position.z = z;
        m[H.renderingGroupId] = 1;
        m.alwaysSelectAsActiveMesh = true;
        m.isPickable = false;
        pierceWalls(m);
        return m;
    }
    unsafeWindow.ssh_onItemSpawn = function (item, type, x, y, z) {
        try {
            if (!settings.itemEsp) return;
            if (!item || !item.mesh) return;
            // Clean up any leftover marker for this pooled mesh.
            const old = itemMarkers.get(item.mesh);
            if (old) { try { old.dispose(); } catch (e) {} itemMarkers.delete(item.mesh); }
            const color = (type === 0 ? ESP_COLOR_AMMO : ESP_COLOR_GRENADE)
                       || new BABYLON.Color3(1, 1, 1);
            const marker = makeItemMarker(x, y, z, color);
            if (marker) itemMarkers.set(item.mesh, marker);
        } catch (e) {}
    };
    unsafeWindow.ssh_onItemCollect = function (_type, item) {
        try {
            if (!item || !item.mesh) return;
            const marker = itemMarkers.get(item.mesh);
            if (marker) {
                try { marker.dispose(); } catch (e) {}
                itemMarkers.delete(item.mesh);
            }
        } catch (e) {}
    };

    // Force a mesh to ignore the depth buffer entirely while rendering. This
    // is what actually makes the box/tracer punch through walls — neither
    // renderingGroupId nor setRenderingAutoClearDepthStencil is reliable on
    // its own in this Babylon version.
    function pierceWalls(mesh) {
        if (!mesh || mesh._ssh_pierced) return;
        mesh._ssh_pierced = true;
        let saved = null;
        mesh.onBeforeRenderObservable.add(() => {
            try {
                const eng = ss.SCENE && ss.SCENE.getEngine && ss.SCENE.getEngine();
                if (!eng) return;
                saved = eng.getDepthFunction();
                eng.setDepthFunction(BABYLON.Engine.ALWAYS);
            } catch (e) {}
        });
        mesh.onAfterRenderObservable.add(() => {
            try {
                const eng = ss.SCENE && ss.SCENE.getEngine && ss.SCENE.getEngine();
                if (!eng || saved === null) return;
                eng.setDepthFunction(saved);
                saved = null;
            } catch (e) {}
        });
    }
    // Build the wireframe line segments for a box of the given style. 'full'
    // draws all 12 edges; 'corners' draws only short L-brackets at each of the
    // 8 corners (cleaner, less cluttered look). Local space, centered on x/z,
    // resting on y=0 up to y=h.
    function buildBoxLines(style) {
        const w = 0.4, h = 0.65, d = 0.4;
        const V = BABYLON.Vector3;
        const v = [
            new V(-w/2, 0,   -d/2), new V(w/2, 0,   -d/2),
            new V( w/2, h,   -d/2), new V(-w/2, h,  -d/2),
            new V(-w/2, 0,    d/2), new V(w/2, 0,    d/2),
            new V( w/2, h,    d/2), new V(-w/2, h,   d/2),
        ];
        const lines = [];
        if (style === 'corners') {
            // For each corner, draw a short stub toward each of its 3 neighbours.
            const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
            const f = 0.28; // fraction of each edge drawn from the corner
            for (const [a, b] of edges) {
                const A = v[a], B = v[b];
                const ab = new V(B.x - A.x, B.y - A.y, B.z - A.z);
                const ba = new V(A.x - B.x, A.y - B.y, A.z - B.z);
                lines.push([A, new V(A.x + ab.x*f, A.y + ab.y*f, A.z + ab.z*f)]);
                lines.push([B, new V(B.x + ba.x*f, B.y + ba.y*f, B.z + ba.z*f)]);
            }
        } else {
            for (let i = 0; i < 4; i++) {
                lines.push([v[i],   v[(i+1)%4]]);
                lines.push([v[i+4], v[(i+1)%4+4]]);
                lines.push([v[i],   v[i+4]]);
            }
        }
        return lines;
    }
    function ensureEspBox(P) {
        if (P._ssh_box) return P._ssh_box;
        if (typeof BABYLON === 'undefined') {
            if (!_espWarned) { _espWarned = true; log('ESP: BABYLON not loaded'); }
            return null;
        }
        if (!ss.SCENE) {
            if (!_espWarned) { _espWarned = true; log('ESP: no SCENE'); }
            return null;
        }
        // Build geometry in local space (centered around 0, 0, 0). Position is
        // set per-frame from network coords below — no parenting, so we don't
        // inherit the game's interpolation freeze when it thinks the enemy
        // is occluded.
        const style = settings.espBoxStyle === 'corners' ? 'corners' : 'full';
        const box = BABYLON.MeshBuilder.CreateLineSystem(
            'sshesp_' + Math.random().toString(36).slice(2, 8),
            { lines: buildBoxLines(style) },
            ss.SCENE
        );
        box.color = hexToColor3(settings.espColor) || new BABYLON.Color3(1.0, 0.2, 0.2);
        box[H.renderingGroupId] = 1;
        box.alwaysSelectAsActiveMesh = true;
        box.isPickable = false;
        pierceWalls(box);
        P._ssh_box = box;
        P._ssh_boxStyle = style;
        P._ssh_colorHex = null; // force a color apply on the next frame
        _espPlayers.add(P);
        log('ESP: built box for', P.name || P.nickname || '?');
        return box;
    }

    // Floating nametag — a reference client's approach (ported from "a reference client",
    // the `nametags` block). Instead of building our own billboard plane +
    // DynamicTexture (and redrawing its canvas every frame), we reuse the
    // GAME's own native nameSprite that already floats above every player. We
    // only (a) promote it to renderingGroupId 1 so the depth-clear renders it
    // through walls, and (b) scale it up with distance so far enemies stay
    // readable. No per-frame canvas redraw → far cheaper, and the text/colour
    // stay exactly as the game draws them.
    function applyNameSprite(P, me) {
        const actor = P[H.actor];
        const sprite = actor && actor.nameSprite;
        if (!sprite) return;
        // Remember the game's defaults once so we can restore them on toggle-off.
        if (!P._ssh_nsOrig) {
            P._ssh_nsOrig = {
                w:  sprite.width,
                h:  sprite.height,
                rg: sprite[H.renderingGroupId],
                mgr: sprite._manager ? sprite._manager[H.renderingGroupId] : undefined,
            };
        }
        // See through walls: sprite + its shared SpriteManager into group 1.
        if (sprite._manager) sprite._manager[H.renderingGroupId] = 1;
        sprite[H.renderingGroupId] = 1;
        // Distance scale (a reference client: d = dist^1.25 * 2; w = d/10+.6, h = d/20+.3).
        const dx = P[H.x] - me[H.x], dy = P[H.y] - me[H.y], dz = P[H.z] - me[H.z];
        const d = Math.pow(Math.hypot(dx, dy, dz), 1.25) * 2;
        sprite.width  = d / 10 + 0.6;
        sprite.height = d / 20 + 0.3;
    }
    // Put the native nameSprite back to the game's defaults (nametags off,
    // player left the match, or no longer a valid enemy).
    function restoreNameSprite(P) {
        const o = P._ssh_nsOrig;
        if (!o) return;
        const actor = P[H.actor];
        const sprite = actor && actor.nameSprite;
        if (sprite) {
            try {
                sprite.width  = o.w;
                sprite.height = o.h;
                sprite[H.renderingGroupId] = o.rg != null ? o.rg : 0;
                if (sprite._manager && o.mgr != null) sprite._manager[H.renderingGroupId] = o.mgr;
            } catch (e) {}
        }
        P._ssh_nsOrig = null;
    }

    // Tracer line from each enemy to a point 5 units BEHIND the camera (so it
    // appears to converge at your eye and project outward to the enemy).
    function ensureEspTracer(P) {
        if (P._ssh_tracer) return P._ssh_tracer;
        if (typeof BABYLON === 'undefined' || !ss.SCENE) return null;
        const placeholder = [new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(0,0,0)];
        const tr = BABYLON.MeshBuilder.CreateLines(
            'sshtracer_' + Math.random().toString(36).slice(2, 8),
            { points: placeholder, updatable: true },
            ss.SCENE
        );
        tr.color = ESP_COLOR_RED || new BABYLON.Color3(1.0, 0.2, 0.2);
        tr.isPickable = false;
        tr.alwaysSelectAsActiveMesh = true;
        tr.doNotSyncBoundingInfo = true;
        tr[H.renderingGroupId] = 1;
        pierceWalls(tr);
        P._ssh_tracer = tr;
        return tr;
    }
    function updateEspTracer(P, crosshairs) {
        const tr = ensureEspTracer(P);
        if (!tr) return null;
        // Use network coords (always live) rather than mesh.position (freezes
        // when the game thinks the enemy is occluded).
        const from = new BABYLON.Vector3(P[H.x], P[H.y] + 0.4, P[H.z]);
        BABYLON.MeshBuilder.CreateLines(undefined, {
            points: [from, crosshairs.clone()],
            instance: tr,
            updatable: true,
        });
        return tr;
    }

    // Per-weapon bullet speed (Crackshot ≈150, EggK-47 ≈80…). Big difference
    // in long-range lead — fixed-time lead under/overshoots across weapons.
    function getProjectileSpeed(me) {
        try {
            const w = me && me[H.weapon];
            if (w && w.subClass && typeof w.subClass.velocity === 'number' && w.subClass.velocity > 0) {
                return w.subClass.velocity;
            }
        } catch (e) {}
        return PROJECTILE_SPEED;
    }

    // Best-effort floor height under (x, z): cast a ray straight down from just
    // above the target and return the first solid hit's y. "other script" uses
    // the game's map-only collider (Collider.grenadeCollidesWithCell) for this;
    // that filtered collider isn't exposed to us, so we pick the nearest solid
    // below via the scene — excluding our own ESP geometry. Returns null when
    // the scene/ray isn't available (then the caller skips the clamp).
    // Reused across frames so the per-frame ground pick allocates nothing
    // (a reference client's "assuming that reusing doesnt leak memory" pattern).
    let _groundRay = null;
    const _groundPredicate = (mesh) => {
        if (!mesh || mesh.isPickable === false) return false;
        if (mesh._ssh_box || mesh._ssh_tracer || mesh._ssh_pierced) return false;
        return true;
    };

    // ── NATIVE MAP COLLIDER (a reference client's ss.RAYS) ───────────────────────────
    // The game exposes a grid/cell raycaster that hits ONLY map geometry — no
    // scene-graph traversal — which is why a reference client has zero aim-lag. When the
    // bundle-discovery resolved it (H.RAYS + H.rayCollidesWithMap), we use it
    // for line-of-sight and the prediction ground clamp instead of
    // scene.pickWithRay. Returns null/undefined to signal "unavailable" so the
    // callers fall back to the (throttled) scene pick — no regression if the
    // obfuscated names didn't resolve on this bundle.
    function _nativeCollider() {
        // OPT-IN. The native LOS port has a confirmed sign/basis bug — it
        // reported visible enemies as blocked, so the aimbot locked onto a
        // farther target. Until that's debugged against the live game, default
        // to the proven (throttled) scene-pick path. Set
        // `window.SSH_USE_NATIVE = true` to re-enable the native path for
        // testing (pair with SSH_LOS_DEBUG to compare native vs scene).
        if (!unsafeWindow.SSH_USE_NATIVE) return null;
        const R = ss.RAYS;
        if (R && H.rayCollidesWithMap && typeof R[H.rayCollidesWithMap] === 'function'
            && R.projectileCollidesWithCell && R.grenadeCollidesWithCell) return R;
        return null;
    }
    // Faithful port of a reference client getLineOfSight. true/false, or null when the
    // native collider isn't available.
    function getLineOfSightNative(me, myPos, targetPos) {
        const R = _nativeCollider();
        if (!R) return null;
        try {
            const range = _weaponConfig(me[H.weapon]).range;
            if (typeof range !== 'number') return null;
            // me→target direction (a reference client negates getDirectionVectorFacingTarget).
            const dir = { x: targetPos.x - myPos.x, y: targetPos.y - myPos.y, z: targetPos.z - myPos.z };
            const rot = BABYLON.Matrix.RotationYawPitchRoll(_calcYaw(dir), _calcPitch(dir), 0);
            const directionVector = BABYLON.Matrix.Translation(0, 0, range).multiply(rot).getTranslation();
            const position = BABYLON.Matrix.Translation(0, 0.1, 0).multiply(rot)
                .add(BABYLON.Matrix.Translation(myPos.x, myPos.y + 0.3, myPos.z)).getTranslation();
            const hit = R[H.rayCollidesWithMap](position, directionVector, R.projectileCollidesWithCell);
            const distToMap = hit ? BABYLON.Vector3.DistanceSquared(position, hit.pick.pickedPoint) : Infinity;
            const tp = new BABYLON.Vector3(targetPos.x, targetPos.y, targetPos.z);
            return BABYLON.Vector3.DistanceSquared(position, tp) < distToMap;
        } catch (e) { return null; }
    }
    // Native floor height under (x,z): cast straight down with the map collider.
    // Returns a number, null (no hit), or undefined (native unavailable).
    let _natGroundOrigin = null, _natGroundDir = null;
    function getGroundYNative(x, z, fromY) {
        const R = _nativeCollider();
        if (!R) return undefined;
        try {
            if (!_natGroundOrigin) {
                _natGroundOrigin = new BABYLON.Vector3();
                _natGroundDir = new BABYLON.Vector3(0, -60, 0);
            }
            _natGroundOrigin.copyFromFloats(x, fromY + 0.5, z);
            const hit = R[H.rayCollidesWithMap](_natGroundOrigin, _natGroundDir, R.grenadeCollidesWithCell);
            return (hit && hit.pick && hit.pick.pickedPoint) ? hit.pick.pickedPoint.y : null;
        } catch (e) { return undefined; }
    }

    function getGroundY(x, z, fromY) {
        const ny = getGroundYNative(x, z, fromY);
        if (ny !== undefined) return ny; // native resolved (number, or null = no hit)
        if (!ss.SCENE || typeof BABYLON === 'undefined') return null;
        try {
            if (!_groundRay) {
                _groundRay = new BABYLON.Ray(
                    new BABYLON.Vector3(x, fromY + 0.5, z),
                    new BABYLON.Vector3(0, -1, 0), 60);
            } else {
                _groundRay.origin.copyFromFloats(x, fromY + 0.5, z);
            }
            const pick = ss.SCENE.pickWithRay(_groundRay, _groundPredicate);
            return (pick && pick.hit && pick.pickedPoint) ? pick.pickedPoint.y : null;
        } catch (e) { return null; }
    }

    // Lead prediction — faithful port of a reference client's `predictPosition`.
    //
    // Works in the game's PER-TICK units (gravity -0.012/tick², terminal fall
    // 0.29/tick, +1-tick lead bias). Reads the game's native velocity vector
    // (player.dx/.dy/.dz) and the network position (H.x/y/z) rather than
    // deriving velocity from mesh deltas — this is what a reference client does and is
    // what the user asked to replicate. Returns the predicted WORLD position to
    // aim at; the y is gravity-integrated and clamped to the floor when the
    // target is airborne, left at the network y when grounded.
    function predictPositionSF(player, me) {
        const base = { x: player[H.x], y: player[H.y], z: player[H.z] };
        try {
            const meMesh = me[H.actor] && me[H.actor][H.mesh];
            const pMesh  = player[H.actor] && player[H.actor][H.mesh];
            if (!meMesh || !pMesh) return base;
            const mp = meMesh.position, tp = pMesh.position;

            // Native per-tick velocity. dx/dy are usually plain props; dz can be
            // minified, so fall back to the discovered H.dz key, then 0.
            const vx = (typeof player.dx === 'number') ? player.dx : 0;
            const vy = (typeof player.dy === 'number') ? player.dy : 0;
            const vz = (typeof player.dz === 'number') ? player.dz
                     : (typeof player[H.dz] === 'number') ? player[H.dz] : 0;

            const cfg = _weaponConfig(me[H.weapon]);
            const bulletSpeed = (cfg && typeof cfg.velocity === 'number' && cfg.velocity > 0)
                ? cfg.velocity : PROJECTILE_SPEED;

            // Mesh-based 3D distance (a reference client distancePlayers, yMultiplier 1).
            const dist = Math.hypot(tp.x - mp.x, tp.y - mp.y, tp.z - mp.z);
            const timeDiff = dist / bulletSpeed + 1; // ticks (+1-tick lead bias)

            const nx = base.x + vx * timeDiff;
            const nz = base.z + vz * timeDiff;
            let   ny = base.y;

            // Terminal-velocity model: a reference client caps (vx, 0.29, vz) to the
            // terminal speed (0.29/tick) and takes -y as the terminal fall — so
            // the faster you move horizontally, the slower you fall. Replicated
            // here since the game's Math.capVector3 isn't exposed to us.
            const TERMINAL = 0.29;
            const cmag = Math.hypot(vx, TERMINAL, vz);
            const cappedY = (cmag > TERMINAL) ? TERMINAL * (TERMINAL / cmag) : TERMINAL;
            const terminalVelocity = -cappedY;

            // Only predict vertical motion when airborne (onGround === 0). When
            // grounded, y stays at the network y (it won't change).
            if (player.onGround == 0) {
                const g = -0.012; // per-tick²
                const timeAccel = Math.min(timeDiff, (terminalVelocity - vy) / g);
                const predictedY = vy * timeAccel + timeAccel * timeAccel * g / 2 + ny +
                    terminalVelocity * Math.max(timeDiff - timeAccel, 0);
                // Throttle the ground pick like LOS — floor height under a target
                // barely moves across 3 frames, so reuse it instead of re-picking.
                let groundY;
                const gc = player._ssh_gy;
                if (gc && (_frame - gc.f) < PICK_THROTTLE) {
                    groundY = gc.y;
                } else {
                    groundY = getGroundY(nx, nz, Math.max(ny, predictedY));
                    player._ssh_gy = { f: _frame, y: groundY };
                }
                ny = Math.max(groundY != null ? groundY : 0, predictedY) - 0.072;
                _pred.airborne = true;
            } else {
                _pred.airborne = false;
            }

            _pred.active = true;
            _pred.speed = Math.hypot(vx, vy, vz);
            _pred.t = timeDiff;
            _pred.leadDist = Math.hypot(nx - base.x, nz - base.z);
            return { x: nx, y: ny, z: nz };
        } catch (e) { return base; }
    }

    // Line-of-sight test — faithful in spirit to a reference client's getLineOfSight:
    // cast a ray from our eye toward the target and report whether the MAP
    // blocks it. a reference client uses the game's map-only collider; that filtered
    // collider isn't exposed to us, so we pick against the scene and skip
    // (a) our own ESP/marker geometry and (b) skinned character meshes — walls
    // and floors aren't skinned, so excluding skinned meshes leaves map
    // geometry as the only occluder. Returns true when nothing solid is closer
    // than the target (or when the scene/ray isn't available to test).
    // Reused across the (now lazy, rank-ordered) LOS checks so each pick
    // allocates nothing — same reuse pattern as getGroundY.
    let _losRay = null;
    const _losPredicate = (mesh) => {
        if (!mesh || mesh.isPickable === false) return false;
        if (mesh._ssh_box || mesh._ssh_tracer || mesh._ssh_pierced) return false;
        if (mesh.skeleton) return false; // character model, not the map
        return true;
    };
    // Per-frame callback counter — drives raycast throttling below.
    let _frame = 0;
    // Frames a scene-pick result is reused before recomputing. The LOS / ground
    // raycasts are the ONLY heavy work in the aim path and they run every frame
    // RMB is held — but neither state changes meaningfully frame-to-frame, so
    // recomputing at ~20 Hz (every 3rd frame at 60 fps) instead of 60 Hz cuts
    // the aim-lag ~3× while being visually imperceptible. (a reference client avoids the
    // pick entirely via the game's native map collider; this is the cheap fix.)
    const PICK_THROTTLE = 3;
    // Throttled + cached wrapper around the real (expensive) scene pick.
    function hasLineOfSight(me, player) {
        const c = player._ssh_los;
        if (c && (_frame - c.f) < PICK_THROTTLE) return c.v;
        const v = _rawLineOfSight(me, player);
        player._ssh_los = { f: _frame, v };
        return v;
    }
    function _rawLineOfSight(me, player) {
        if (typeof BABYLON === 'undefined') return true;
        try {
            const meMesh = me[H.actor] && me[H.actor][H.mesh];
            const pMesh  = player[H.actor] && player[H.actor][H.mesh];
            if (!meMesh || !pMesh) return false;
            // Prefer the game's native map collider (a reference client) — a cheap grid
            // lookup, no scene-graph traversal. null → not available, fall back.
            const nv = getLineOfSightNative(me, meMesh.position, pMesh.position);
            if (nv !== null) return nv;
            if (!ss.SCENE) return true;
            const ex = meMesh.position.x, ey = meMesh.position.y + 0.3, ez = meMesh.position.z;
            const to = pMesh.position;
            const dx = to.x - ex, dy = to.y - ey, dz = to.z - ez;
            const dist = Math.hypot(dx, dy, dz);
            if (dist <= 0.001) return true;
            const ux = dx / dist, uy = dy / dist, uz = dz / dist;
            // Skip the first ~1.2 units so our own (rigid, non-skinned) gun
            // viewmodel / body right at the origin can't register as a wall.
            const skip = Math.min(1.2, dist * 0.5);
            const len = dist - skip;
            if (!_losRay) {
                _losRay = new BABYLON.Ray(new BABYLON.Vector3(), new BABYLON.Vector3(), len);
            }
            _losRay.origin.copyFromFloats(ex + ux * skip, ey + uy * skip, ez + uz * skip);
            _losRay.direction.copyFromFloats(ux, uy, uz);
            _losRay.length = len;
            const pick = ss.SCENE.pickWithRay(_losRay, _losPredicate);
            if (!pick || !pick.hit) return true;
            // Visible if the first solid hit is essentially at/past the target.
            return pick.distance >= len - 1.0;
        } catch (e) { return true; }
    }

    // Nyx-tag banner: visible until the local player's in-game name starts
    // with "Nyx" (case-insensitive). The banner lives inside the menu and is
    // hidden once the player adopts the tag — no menu spam after they
    // comply. Hidden also when the menu itself is hidden via backtick.
    function updateNyxBanner() {
        if (!nyxBannerEl) return;
        const name = _aim.me && typeof _aim.me.name === 'string' ? _aim.me.name : '';
        const hasTag = name.toLowerCase().startsWith('nyx');
        nyxBannerEl.style.display = hasTag ? 'none' : '';
    }

    // ────────────────────────────────────────────────────────────────────────
    // AUTO REPLY — trigger-word → canned response map. If an incoming message
    // contains one of these substrings, we fire back the matching line. First
    // match wins, so order matters slightly.
    // ────────────────────────────────────────────────────────────────────────
    const CHAT_RESPONSES = {
        "aimbot":  "if i had aimbot id at least let u live longer for fun",
        "cheater": "the only thing rigged here is how bad u are",
        "cheat":   "the only thing rigged here is how bad u are",
        "hacker":  "no hacks, just a skill gap u could fall into",
        "hack":    "no hacks, just a skill gap u could fall into",
        "hax":     "no hacks, just a skill gap u could fall into",
        "report":  "report me, then report urself for that aim",
        "bot":     "im the bot? u died to the same corner 4 times",
        "esp":     "walls are more of a suggestion to me",
        "script":  "the only script here is the one where u lose",
        "noob":    "u play like the tutorial gave up on u",
        "1v1":     "1v1? id feel bad charging u for the lesson",
        "ez":      "ez? u missed three shots typing that",
        "gg":      "gg for u means 'got grilled'",
        "nice":    "i know, i clip everything i do",
        "trash":   "ur the reason the respawn button has wear marks",
        "lag":     "blaming lag is just slow-motion coping",
        "mad":     "i live rent free in ur killcam",
        "angry":   "ur anger is delicious, keep going",
        "lol":     "laugh louder, it wont raise ur k/d",
        "weird":   "your weird",
        "lmao":    "glad my aim is funny to u",
        "spam":    "this isnt spam, its a newsletter",
        "mute":    "mute me, the scoreboard still talks",
        "ban":     "ban me and ill haunt the lobby",
        "skill":   "u have a skill: dying on schedule",
        "camp":    "ud lose to a wall that shoots back",
        "why":     "why? because the eggs demanded it",
        "hello":   "oh look, the practice target can type",
        "hey":     "hey yourself, now hold still",
        "u r": "ok, then prove it",
        "you r": "ok, then prove it",
        "you are": "ok, then prove it",
        "you're": "ok, then prove it",
        "bye":     "leaving? tell the respawn screen i said hi",
        "rip":     "press F, then press respawn, then press F again",
        "good":    "good? im offensively good",
        "bad":     "calling me bad while feeding me ur whole team, bold",
        "stop":    "stop? i havent even started",
        "im":    "yeah, u are",
        "i am":    "yeah, u are",
        "i'm":    "yeah, u are",
        "team":    "i am the whole team, u are decoration",
        "carry":   "ur team carries u like a body bag",
        "clutch":  "i dont clutch, i schedule wins",
        "miss":    "u miss so much the eggs feel safe near u",
        "shoot":   "i shoot first and apologize never",
        "egg":     "scrambled, just like ur aim",
        "gun":     "my gun has a phd, urs has a participation trophy",
        "sus":     "the only sus thing here is ur accuracy",
        "fake":    "im 100% real and 200% better than u",
        "slow":    "im not slow, im savoring the win",
        "fast":    "too fast for u, too smart for the lobby",
        "win":     "winning is just my default setting",
        "lose":    "losing is a u problem, not a me problem",
        "quit":    "quit now, save the killcam some embarrassment",
        "afk":     "im not afk, im letting u catch up (u wont)",
        "ping":    "my ping is fine, ur reflexes arent",
        "smurf":   "im not smurfing, im just built like this",
        "owned":   "owned, operated, and franchised",
        "boom":    "boom indeed, write that down",
        "moron":   "big talk from someone i one-tapped twice",
        "admin":   "admins cant ban skill, ive checked",
        "mod":     "calling a mod wont fix that aim buddy",
        "loser":   "i collect Ws, u collect death recaps",
        "toxic":   "im not toxic, im just correct loudly",
        "rank":    "ur rank is 'practice dummy', congrats",
        "smart":   "smart enough to be in ur walls right now",
        "clever":  "clever girl, now back to the killcam",
        "thank":   "ur welcome for the free lesson",
        "please":  "begging doesnt lower my accuracy",
        "sorry":   "sorry doesnt respawn ur dignity",
        "help":    "no amount of help saves that aim",
        "kill":    "i collect kills like theyre on sale",
        "dumb":    "u bring a knife to a gunfight and forget the knife",
        "npc":     "u path around the map like the AI gave up",
        "troll":   "im not trolling, im performing",
        "proof":   "the proof is ur death counter",
        "wtf":     "wtf is right, that was pure art",
        "yap":     "keep yapping, i keep fragging",
        "wierd":   "u spelt it wrong",
        "server":  "the server runs on my W's",
        "perfect": "perfect? finally u understand me",
        "love":    "love the support, hate the aim",
        "hate":    "hate me harder, it boosts my fps",
        "dude":    "dude im already behind u",
        "bro":     "bro fell off before he respawned",
        "huh":     "huh is what ur killcam said too",
        "omg":     "omg right? i amaze myself daily",
        "damn":    "damn right, screenshot it for later",
        "care":    "i care deeply about my k/d, not u",
        "leave":   "leaving wont delete the killcam",
        "cope":    "keep coping, the scoreboard doesnt care",
        "git gud": "id say git gud but thats clearly impossible for u",
        "try":     "u tried, the eggs noticed, nobody clapped",
        "clown":   "the circus called, u start the next match",
        "your mom":"leave ur mom out of this, shes the only one who watches u play",
        "who":     "im the last name on ur killfeed, repeatedly",
        "name":    "ull know my name from the scoreboard u keep checking",
        "mess":    "u dont want to mess with someone already in ur walls",
        "chill":   "ill chill when ur scoreboard does",
        "look":    "look behind u, oh too late",
        "watch":   "watch the killcam, its educational for u",
        "real":    "im real, ur skill isnt",
        "true":    "true, u are bad, glad we finally agree",
        "false":   "false hope is all u brought today",
        "level":   "u couldnt level the playing field with a bulldozer",
        "better":  "better? thats literally my whole personality",
        "happy":   "stay happy, the respawn screen adores u",
        "sad":     "sad part is u thought u had a shot",
        "flame":   "i flame, u just get cooked",
        "girl":    "cool story, now hold still",
        "boy":     "boy fell off faster than his k/d",
        "test":    "u failed the test, see the killfeed",
        "literally":"i literally dodged everything u did",
        "shut up": "make me, the scoreboard talks for me",
        "shut":    "u first, ur typing is louder than ur gun",
        "wow":     "wow is right, i impress everyone but u",
        "bruh":    "bruh moment, go check ur deaths",
        "dead":    "dead again? thats ur cardio for today",
        "die":     "u die so much the respawn screen knows ur name",
        "ugly":    "the ugliest thing here is ur aim",
        "clip":    "i clipped u twice, want the link",
        "washed":  "u look washed, go hit the showers",
        "ratio":   "ratio? check the scoreboard, i already won",
        "mald":    "keep malding, it heats my gpu",
        "rekt":    "rekt, rinsed, and refunded",
        "free":    "free kills, courtesy of u, thanks",
        "easy":    "easy, like reading ur panic",
        "baby":    "baby steps wont save that aim",
        "kid":     "go to bed kid, the eggs are past ur curfew",
        "diff":    "the diff between us is the whole scoreboard",
        "cry":     "cry me a respawn timer",
        "salt":    "pass the salt, ur basically a shaker now",
        "cap":     "no cap, ur the worst on this server",
        "choke":   "u choke harder than dial up internet",
        "throw":   "nice throw, the enemy team says thanks",
        "feed":    "keep feeding, im basically full now",
        "ego":     "my ego is earned, urs is rented",
        "brain":   "ur brain buffers like ur aim",
        "iq":      "ur iq and ur k/d are tied, both low",
        "lucky":   "luck? i make mine, u borrow urs",
        "nerf":    "they cant nerf raw talent sorry",
        "broken":  "im not broken, ur just fragile",
        "unfair":  "unfair is just how good i am, yeah",
        "sweat":   "i sweat trophies, u sweat excuses",
        "tryhard": "tryhard? i try once, u hard-lose",
        "main":    "i main winning, whats urs, dying?",
        "potato":  "nice potato aim, fries incoming",
        "wallhack":"no wallhack, ur just predictable",
        "snipe":   "snipe? i blink and ur gone",
        "scrub":   "scrub a dub, back to the lobby with u",
        "headshot":"headshot? thats just my default setting",
        "frag":    "another frag for the highlight reel",
        "wiped":   "wiped like a dirty whiteboard",
        "glhf":    "glhf, the hf part is just for u",
        "rematch": "rematch? i never finished the first humbling",
        "revenge": "revenge arc cancelled, u lose again",
        "default": "default skin, default skill, makes sense",
        "based":   "based? im the entire foundation",
        "cringe":  "the cringe is u typing instead of dodging",
        "facts":   "facts: ur glued to the bottom of the board",
        "bozo":    "bozo behavior, never change",
        "goofy":   "goofy aim AND goofy attitude, impressive",
        "touch grass":"touch grass right after u touch a single shot",
        "skill issue":"skill issue, certified and notarized by me",
        "yapping": "yap less, aim more, maybe",
        "snitch":  "snitches get clutched on",
        "rage":    "i can smell the rage quit from here",
        "alt":     "an alt account still cant buy u aim",
        "garbage": "garbage? recycling pickup is thursday",
        "dogwater":"dogwater aim, certified soggy",
        "clap":    "clapped, cheeks included",
        "human":   "im more human than u, and im not sure ur one",
        "robot":   "beep boop, still outclassing u",
        "boosted": "boosted? only thing boosted is my fps",
        "seethe":  "seethe harder, it heats my room",
        "delulu":  "delulu is the only solulu for u",
        "yikes":   "yikes, even the eggs winced",
        "oof":     "oof, say hi to the respawn screen again",
        "mid":     "mid? nah your sub-mid, im elite",
        "cooked":  "u got cooked, well done even",
        "fraud":   "fraud? the scoreboard is notarized",
        "clueless":"clueless and aimless, rough combo",
        "what":    "what? exactly, ur lost",
        "sup":     "sup, came to lose again?",
        "yo":      "yo, came to feed me?",
        "hi":      "hi, welcome to your own killcam",
        "wyd":     "wyd? carrying this lobby, u?",
        "hbu":     "hbu? still losing i see",
        "brb":     "brb? take ur time, ill keep winning",
        "wb":      "wb, the killcam missed u",
        "gn":      "gn, dream about my aim",
        "gm":      "gm, ready to lose all day?",
        "ty":      "ty for the free kills",
        "np":      "np, carrying is my cardio",
        "yw":      "yw for the lesson",
        "idk":     "idk how ur this bad either",
        "idc":     "idc, the scoreboard does though",
        "ikr":     "ikr, im built different",
        "nvm":     "nvm, u wouldnt get it",
        "omw":     "omw to ur spawn, hold still",
        "tbh":     "tbh ur kinda bad, offense intended",
        "ngl":     "ngl watching u play is comedy",
        "btw":     "btw ur still losing",
        "smh":     "smh, shaking my head at ur aim",
        "lmk":     "lmk when u land a shot, ill wait",
        "wait":    "wait? i dont do patience",
        "really":  "really. painfully really",
        "bet":     "bet, watch this killcam",
        "nah":     "nah, ur staying bad",
        "yeah":    "yeah, i carry, glad u noticed",
        "okay":    "okay? cool, now hold still",
        "cool":    "cool? im ice cold, watch",
        "where":   "where? right behind u",
        "when":    "when? right after i respawn u",
        "maybe":   "maybe try aiming next time",
        "sure":    "sure, keep dreaming champ",
        "exactly": "exactly, finally u get it",
        "fine":    "fine? ur barely functional",
        "haha":    "haha glad ur deaths amuse u too",
        "agree":   "agree, im cracked, glad we settled it",
        "yes":     "yes, i am that good, glad we agree",
        "no":      "no? the scoreboard says otherwise",
        "?":       "great question, the leaderboard has ur answer",
    };

    // Read the newest line in the game's chat log (#chatOut). a reference client parses
    // children[0] = "name: " and children[1] = message text; we mirror that but
    // fall back to splitting the row text on the first colon if the structure
    // differs across builds.
    function sshReadLastChat() {
        const out = document.getElementById('chatOut');
        if (!out || !out.children.length) return null;
        const row = out.children[out.children.length - 1];
        if (!row) return null;
        let name = '', text = '';
        if (row.children && row.children.length >= 2) {
            name = (row.children[0].textContent || '').replace(/:\s*$/, '').trim();
            text = (row.children[1].textContent || '').trim();
        } else {
            const raw = (row.textContent || '').trim();
            const i = raw.indexOf(':');
            if (i > -1) { name = raw.slice(0, i).trim(); text = raw.slice(i + 1).trim(); }
            else { text = raw; }
        }
        return { name, text };
    }

    // Triggers tried longest-first, so the most specific match wins (e.g.
    // "shut up" beats "shut", "cheater" beats "cheat"). Computed once.
    const CHAT_KEYWORDS = Object.keys(CHAT_RESPONSES).sort((a, b) => b.length - a.length);

    // Smarter than a naive substring scan: short triggers (<=3 chars like
    // "no", "ban", "egg") must match a WHOLE word — plus a trailing "s" for
    // plurals — so they stop firing inside "now", "banana", "egghead". Longer
    // triggers still substring-match, so stems like "cheating" -> "cheat" and
    // "reporting" -> "report" keep working. Returns the response or null.
    function sshHandleChat(text) {
        const low = text.toLowerCase();
        const words = new Set(low.split(/[^a-z0-9]+/).filter(Boolean));
        const phrase = ' ' + [...words].join(' ') + ' '; // for multi-word triggers
        for (const kw of CHAT_KEYWORDS) {
            if (kw === '?') { if (text.includes('?')) return CHAT_RESPONSES[kw]; continue; }
            if (kw.indexOf(' ') !== -1) {            // multi-word phrase ("shut up")
                if (phrase.includes(' ' + kw + ' ')) return CHAT_RESPONSES[kw];
            } else if (kw.length <= 3) {             // short → whole word (+ plural)
                if (words.has(kw) || words.has(kw + 's')) return CHAT_RESPONSES[kw];
            } else {                                 // long → substring (catches stems)
                if (low.includes(kw)) return CHAT_RESPONSES[kw];
            }
        }
        return null;
    }

    // ────────────────────────────────────────────────────────────────────────
    // AUTO CHAT — send a message into game chat the way a player would.
    // ────────────────────────────────────────────────────────────────────────
    // Ported from the a reference client's sendChatMessage: open the native chat
    // box via extern.startChat(), drop the text into the #chatIn field, then
    // fire an Enter keydown to submit. Using the game's own input + submit path
    // (rather than crafting a packet) keeps it indistinguishable from typing.
    function sshSendChat(text) {
        const chatIn = document.getElementById('chatIn');
        if (!chatIn) return false;
        try {
            const extern = unsafeWindow.extern;
            if (!extern || typeof extern.startChat !== 'function') return false;
            extern.startChat();
            chatIn.value = text;
            chatIn.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter', code: 'Enter', keyCode: 13, which: 13,
                bubbles: true, cancelable: true,
            }));
            return true;
        } catch (e) { return false; }
    }

    // ────────────────────────────────────────────────────────────────────────
    // SILENT AIM (ported from a reference client `beforeFiring`)
    // The fire() hook runs at the top of the game's native fire(); it doctors
    // the last 3 input-state ring-buffer entries so the SERVER sees us aimed at
    // the target — the camera never moves. `_silentTarget` is the best enemy,
    // refreshed each frame by the aim pass below.
    // ────────────────────────────────────────────────────────────────────────
    let _silentTarget = null;
    let _silentErrLogged = false;
    let _silentBufWarned = false;

    // Auto-discover the local player's 256-entry input-state ring buffer by
    // shape (obfuscated key): an array of length 256 whose entries carry
    // yaw + coords. Cached onto H.stateBuffer once found.
    function getStateBuffer(me) {
        try {
            if (H.stateBuffer && Array.isArray(me[H.stateBuffer])) return me[H.stateBuffer];
            for (const k in me) {
                const v = me[k];
                if (Array.isArray(v) && v.length === 256 && v[0] &&
                    (H.coords in v[0]) && (H.yaw in v[0])) {
                    H.stateBuffer = k;
                    log('stateBuffer key resolved:', k);
                    return v;
                }
            }
        } catch (e) {}
        return null;
    }

    // The coords the WASM would encode for a yaw/pitch, WITHOUT leaving the
    // camera moved: snapshot → drive to target → read coords → restore.
    // (a reference client getCoordsForYawPitch.) null if the mouse bridge isn't up yet.
    function coordsForYawPitch(me, yaw, pitch) {
        try {
            if (!realPointerListener) return null;
            const saved = getCurrentYawPitch();
            setToYawPitch(yaw, pitch);
            const c = me[H.coords];
            if (saved) setToYawPitch(saved.yaw, saved.pitch);
            return c;
        } catch (e) { return null; }
    }

    // yaw/pitch to aim at `target` — mirrors the visible-aim math (predicted
    // point, head offset -0.05, optional anti-bloom), quantized to game precision.
    function computeSilentAngles(me, target) {
        try {
            const meMesh = me[H.actor] && me[H.actor][H.mesh];
            if (!meMesh || !meMesh.position) return null;
            const meP = meMesh.position;
            let aimX, aimY, aimZ;
            if (settings.predEnabled) {
                const pred = predictPositionSF(target, me);
                aimX = pred.x; aimY = pred.y; aimZ = pred.z;
            } else {
                const tMesh = target[H.actor] && target[H.actor][H.mesh];
                if (!tMesh || !tMesh.position) return null;
                aimX = tMesh.position.x; aimY = tMesh.position.y; aimZ = tMesh.position.z;
            }
            const dirV = { x: -(aimX - meP.x), y: -(aimY - meP.y - 0.05), z: -(aimZ - meP.z) };
            let yaw = _calcYaw(dirV), pitch = _calcPitch(dirV);
            if (settings.antiBloom) {
                const b = predictBloomSmooth(me, yaw, pitch, target);
                yaw += b[0]; pitch += b[1];
            }
            return { yaw, pitch };
        } catch (e) { return null; }
    }

    // Hook body — runs at the very top of the native fire(). Fully guarded so
    // any miss/error just skips silent aim and leaves normal firing intact.
    function beforeFire(player) {
        try {
            if (!settings.silentAim || !settings.aimEnabled) return;
            if (!RMB) return; // hold RMB, same as the visible aimbot
            const me = (player && player.hasOwnProperty && player.hasOwnProperty('ws')) ? player : _aim.me;
            if (!me || !me[H.playing]) return;
            const target = _silentTarget;
            if (!target || !target[H.playing]) return;

            const angles = computeSilentAngles(me, target);
            if (!angles) return;
            const coords = coordsForYawPitch(me, angles.yaw, angles.pitch);

            const buf = getStateBuffer(me);
            const idx = me.stateIdx;
            if (buf && typeof idx === 'number') {
                const yq = _setPrecision(angles.yaw), pq = _setPrecision(angles.pitch);
                for (let i = 0; i < 3; i++) {
                    const s = buf[_mod(idx - i, 256)];
                    if (!s) continue;
                    s[H.yaw] = yq;
                    s[H.pitch] = pq;
                    if (coords != null) s[H.coords] = coords;
                }
            } else if (!_silentBufWarned) {
                log('WARNING: silent aim could not find state buffer / stateIdx — shot will not redirect');
                _silentBufWarned = true;
            }

            // Semi-silent: snap the live camera onto target AFTER the buffer edit.
            if (settings.semiSilent) {
                me[H.yaw] = angles.yaw;
                me[H.pitch] = angles.pitch;
                if (coords != null) me[H.coords] = coords;
            }

            // Flush doctored states to the server (opt-in bundle hook).
            if (typeof unsafeWindow.SSH_SERVERSYNC === 'function') {
                try { unsafeWindow.SSH_SERVERSYNC(); } catch (e) {}
            }
        } catch (e) {
            if (!_silentErrLogged) { log('silent-aim hook error:', e); _silentErrLogged = true; }
        }
    }
    unsafeWindow[FIRE_HOOK] = beforeFire;

    // ────────────────────────────────────────────────────────────────────────
    // PER-FRAME CALLBACK — ESP refresh + aim
    // ────────────────────────────────────────────────────────────────────────
    unsafeWindow[CB_NAME] = function (vars) {
        try {
            _frame++; // drives raycast throttling (see PICK_THROTTLE)
            Object.assign(ss, vars);
            if (!ss.PLAYERS) return false;

            // Find local player (the one with the .ws WebSocket attached).
            let me = null;
            for (const P of ss.PLAYERS) {
                if (P && P.hasOwnProperty('ws')) { me = P; break; }
            }
            if (!me) return false;

            // Cache the local player's uniqueId for set_mouse_params (see
            // normalizeMouseSensitivity). It's a stable string id on MYPLAYER.
            if (me[H.uniqueId] != null) _mouseParamsId = me[H.uniqueId];

            // Discover the obfuscated `actor` key dynamically — it's whichever
            // key on the player object has a `.mesh` child, excluding the
            // weapon key (whose `.mesh` is the gun model, NOT the body —
            // picking it up made our velocity tracker derive from gun-tip
            // motion and sent the lead in the gun's facing direction).
            // Always run the scan — if H.actor was previously set to the
            // weapon key, the guard `me[H.actor].mesh` would otherwise pass
            // and the bad key would stick.
            const actorKey = findKeyWithProperty(me, H.mesh, [H.weapon]);
            if (actorKey && actorKey !== H.actor) {
                log('actor key resolved:', H.actor, '→', actorKey);
                H.actor = actorKey;
            }

            // One-time scene tweak: clear the depth buffer between rendering
            // group 0 (world) and group 1 (our boxes/tracers).
            if (ss.SCENE && !ss.SCENE._ssh_depthCleared && typeof BABYLON !== 'undefined') {
                try {
                    ss.SCENE.setRenderingAutoClearDepthStencil(1, true, true, true);
                    ss.SCENE._ssh_depthCleared = true;
                    log('depth-clear enabled for renderingGroupId=1 (see through walls)');
                } catch (e) { log('depth-clear setup failed:', e && e.message); }
            }

            // Crosshair convergence point: 5 units in front of the camera, so
            // tracer lines from each enemy visually fan out from the center of
            // your view.
            let crosshairs = null;
            const cur = getCurrentYawPitch();
            if (cur && typeof BABYLON !== 'undefined' && me[H.actor] && me[H.actor][H.mesh]) {
                crosshairs = new BABYLON.Vector3();
                crosshairs.copyFrom(me[H.actor][H.mesh].position);
                crosshairs.y += 0.4;
                const yaw = cur.yaw;
                const pitch = -cur.pitch;
                const off = -5;
                crosshairs.x += Math.sin(yaw) * Math.cos(pitch) * off;
                crosshairs.y += Math.sin(pitch) * off;
                crosshairs.z += Math.cos(yaw) * Math.cos(pitch) * off;
            }

            // ── ESP cleanup sweep ──
            // The main loop below only visits players who are STILL valid
            // enemies. Anyone who left the match (gone from ss.PLAYERS) or
            // switched onto our team would otherwise keep an orphan box at
            // their last position forever. Build the set of who should
            // currently have ESP, then dispose everything else we're tracking.
            const _shouldHaveEsp = new Set();
            for (const P of ss.PLAYERS) {
                if (!P || P === me) continue;
                if (me.team !== 0 && P.team === me.team) continue;
                _shouldHaveEsp.add(P);
            }
            for (const P of _espPlayers) {
                if (!_shouldHaveEsp.has(P)) disposeEspFor(P);
            }

            // ── ESP boxes + tracers + nametags ──
            const wantStyle = settings.espBoxStyle === 'corners' ? 'corners' : 'full';
            for (const P of ss.PLAYERS) {
                if (!P || P === me) continue;
                if (me.team !== 0 && P.team === me.team) continue;
                if (!P[H.playing]) {
                    if (P._ssh_box)    P._ssh_box.visibility    = 0;
                    if (P._ssh_tracer) P._ssh_tracer.visibility = 0;
                    restoreNameSprite(P);
                    continue;
                }

                // The hex this enemy should use right now (Nyx → nyxColor, else
                // espColor). Cache the last-applied hex so we only touch mesh
                // colors when the user changes a picker or a Nyx joins.
                const hex = espHexFor(P);
                const col = hexToColor3(hex);

                // Rebuild the box if the user switched box style.
                if (P._ssh_box && P._ssh_boxStyle !== wantStyle) {
                    try { P._ssh_box.dispose(); } catch (e) {}
                    P._ssh_box = null;
                }
                const box = ensureEspBox(P);
                if (box) {
                    box.position.x = P[H.x];
                    box.position.y = P[H.y];
                    box.position.z = P[H.z];
                    box.visibility = settings.espEnabled ? 1 : 0;
                }
                // Apply color once per change to box + tracer.
                if (P._ssh_colorHex !== hex) {
                    if (P._ssh_box)    P._ssh_box.color    = col;
                    if (P._ssh_tracer) P._ssh_tracer.color = col;
                    P._ssh_colorHex = hex;
                }
                if (crosshairs) {
                    const tr = updateEspTracer(P, crosshairs);
                    if (tr) {
                        tr.visibility = settings.espEnabled ? 1 : 0;
                        tr.color = col;
                    }
                }

                // Name tags — enlarge + see-through-walls on the game's native
                // sprite (a reference client style); restore it when the toggle is off.
                if (settings.nameTags) applyNameSprite(P, me);
                else                    restoreNameSprite(P);
            }

            // Anti-bloom RNG verifier (no-op unless window.SSH_BLOOM_DEBUG).
            // Runs every frame so it can see the seed advance on each shot.
            bloomDebugTick(me);

            // Reset per-frame state read by the overlay.
            _aim.hasLock = false;
            _aim.me = me;
            // Clear aim-smoothing memory when we're not aiming so the next
            // engage snaps onto target instantly instead of easing in from a
            // stale cached point. (Auto Aim counts as always-aiming.)
            const _aiming = (RMB || settings.autoAim) && settings.aimEnabled;
            if (!_aiming) _aim.smoothTarget = null;
            // Silent aim reuses the target picked below; clear it each frame so
            // the fire() hook never fires at a stale enemy when we're not aiming.
            _silentTarget = null;
            _pred.enabled = !!settings.predEnabled;
            _pred.active = false;
            _pred.airborne = false;
            _pred.speed = 0; _pred.t = 0; _pred.leadDist = 0;
            _pred.projSpeed = getProjectileSpeed(me);

            // ── Aim: RMB held (or Auto Aim on) + aimbot enabled → snap to the
            // best enemy ──
            // Target mode: "Target Crosshair" ON picks the enemy nearest your
            // crosshair (smallest angle); OFF picks the nearest by (y-weighted)
            // 3D distance. Either way the visibility filter applies: prefer
            // enemies with line-of-sight, and with "Only Visible" ON never
            // target one behind a wall (otherwise fall back to the best overall).
            if (_aiming) {
                const meMesh = me[H.actor] && me[H.actor][H.mesh];
                if (meMesh && meMesh.position) {
                    const meP = meMesh.position;

                    // Camera-forward unit vector — only needed for crosshair mode.
                    let fwdX = 0, fwdY = 0, fwdZ = 0, haveFwd = false;
                    if (settings.crosshairTarget) {
                        const cur = getCurrentYawPitch();
                        if (cur) {
                            const cp = Math.cos(cur.pitch);
                            fwdX = -Math.sin(cur.yaw) * cp;
                            fwdY =  Math.sin(cur.pitch);
                            fwdZ = -Math.cos(cur.yaw) * cp;
                            haveFwd = true;
                        }
                    }

                    let bestVis = null, bestVisMesh = null;
                    let bestAny = null, bestAnyRank = Infinity, bestAnyMesh = null;

                    // First pass: rank every enemy with cheap math only — NO
                    // line-of-sight raycasts here. Collect candidates so we can
                    // resolve visibility lazily, in rank order, afterward.
                    const _cands = [];
                    for (const P of ss.PLAYERS) {
                        if (!P || P === me) continue;
                        if (!P[H.playing]) continue;
                        if (me.team !== 0 && P.team === me.team) continue;
                        const pMesh = P[H.actor] && P[H.actor][H.mesh];
                        if (!pMesh || !pMesh.position) continue;
                        const pp = pMesh.position;
                        const ex = pp.x - meP.x, ey = pp.y - meP.y, ez = pp.z - meP.z;
                        // Rank, lower = better. Crosshair mode → angular distance
                        // from the crosshair (1 - dot, 0 = dead-on). Else the
                        // (y-weighted ×2) 3D distance, which prefers an enemy on
                        // your level over one above/below at the same range.
                        let rank;
                        if (haveFwd) {
                            const elen = Math.hypot(ex, ey, ez) || 1;
                            rank = 1 - (fwdX * ex + fwdY * ey + fwdZ * ez) / elen;
                        } else {
                            rank = Math.hypot(ex, ey * 2, ez);
                            if (rank <= 0) continue; // self / exact overlap
                        }
                        if (rank < bestAnyRank) { bestAnyRank = rank; bestAny = P; bestAnyMesh = pp; }
                        _cands.push({ P, pp, rank });
                    }

                    // Second pass: only NOW spend raycasts, and only when "Only
                    // Visible" is on — otherwise visibility never affects the pick,
                    // so there's no reason to cast. Walk candidates from best rank
                    // down and stop at the first with line of sight — typically 1
                    // pickWithRay per frame instead of one per enemy.
                    if (settings.onlyVisible) {
                        _cands.sort((a, b) => a.rank - b.rank);
                        for (let i = 0; i < _cands.length; i++) {
                            if (hasLineOfSight(me, _cands[i].P)) {
                                bestVis = _cands[i].P; bestVisMesh = _cands[i].pp;
                                break;
                            }
                        }
                    }

                    // Always lock the CLOSEST enemy (best rank), so we never skip a
                    // near target to chase a visible one across the map. "Only
                    // Visible" narrows that to the nearest enemy with line of sight;
                    // off, it's the nearest enemy outright (walls ignored).
                    let best, bestMeshPos;
                    if (settings.onlyVisible) { best = bestVis; bestMeshPos = bestVisMesh; }
                    else                      { best = bestAny; bestMeshPos = bestAnyMesh; }

                    if (best && bestMeshPos) {
                        // Aim point: prediction ON → a reference client's network-velocity
                        // lead solve; OFF → the target's current mesh position.
                        let aimX, aimY, aimZ;
                        if (settings.predEnabled) {
                            const pred = predictPositionSF(best, me);
                            aimX = pred.x; aimY = pred.y; aimZ = pred.z;
                        } else {
                            aimX = bestMeshPos.x; aimY = bestMeshPos.y; aimZ = bestMeshPos.z;
                            _pred.active = false;
                        }

                        // Aim-point smoothing — absorbs the ~20 Hz network-coord
                        // stepping so the predicted point (and the camera) don't
                        // jitter. Reset on target switch so the first snap is
                        // instant. This filters the target/prediction only, never
                        // the aim motion itself (see memory).
                        const AIM_SMOOTH = 0.35;
                        if (_aim.smoothTarget !== best) {
                            _aim.smoothTarget = best;
                            _aim.smoothX = aimX; _aim.smoothY = aimY; _aim.smoothZ = aimZ;
                        } else {
                            _aim.smoothX += (aimX - _aim.smoothX) * AIM_SMOOTH;
                            _aim.smoothY += (aimY - _aim.smoothY) * AIM_SMOOTH;
                            _aim.smoothZ += (aimZ - _aim.smoothZ) * AIM_SMOOTH;
                            aimX = _aim.smoothX; aimY = _aim.smoothY; aimZ = _aim.smoothZ;
                        }

                        // Direction to target — a reference client's getDirectionVectorFacingTarget
                        // with offsetY -0.05; yaw/pitch via the shared calc helpers
                        // (atan2(x,z) basis, pitch clamped %1.5).
                        const dirV = {
                            x: -(aimX - meP.x),
                            y: -(aimY - meP.y - 0.05),
                            z: -(aimZ - meP.z),
                        };
                        let targetYaw   = _calcYaw(dirV);
                        let targetPitch = _calcPitch(dirV);

                        // Anti-bloom: shift the aim by the predicted bloom
                        // deflection (a reference client applyBloom, multiplier +1) so the
                        // gun's scatter throws the bullet onto the real target.
                        if (settings.antiBloom) {
                            const b = predictBloomSmooth(me, targetYaw, targetPitch, best);
                            targetYaw   += b[0];
                            targetPitch += b[1];
                            if (unsafeWindow.SSH_BLOOM_DEBUG) {
                                log('[bloom] predicted offset deg: yaw',
                                    (b[0] * _RAD2DEG).toFixed(3),
                                    'pitch', (b[1] * _RAD2DEG).toFixed(3));
                            }
                        }

                        _aim.hasLock = true;

                        // With mouseSpeed pinned to 50 (normalizeMouseSensitivity,
                        // "THE FIX"), movementX*SENSITIVITY == yaw exactly, so ONE
                        // synthetic move snaps onto target. The old 5× loop did 5×
                        // the WASM round-trips (get_yaw_pitch + set_mouse_params +
                        // synthetic pointer event) every frame — the main lag source.
                        // Silent aim skips this visible snap — the fire() hook
                        // redirects the shot without moving the camera.
                        if (!settings.silentAim) setToYawPitch(targetYaw, targetPitch);
                    }
                }
            }

            // Item ESP sweep — runs every frame so markers track items that
            // existed before our spawnItem hook installed (pre-join state),
            // and cleans up markers whose item became inactive via any
            // code path the collectItem hook didn't catch.
            if (settings.itemEsp && ss.items && ss.items.pools && typeof BABYLON !== 'undefined') {
                const seen = new Set();
                for (let t = 0; t < ss.items.pools.length; t++) {
                    const pool = ss.items.pools[t];
                    if (!pool || typeof pool.forEachActive !== 'function') continue;
                    const poolColor = (t === 0 ? ESP_COLOR_AMMO : ESP_COLOR_GRENADE);
                    pool.forEachActive((it) => {
                        if (!it || !it.mesh) return;
                        seen.add(it.mesh);
                        if (!itemMarkers.has(it.mesh)) {
                            const pos = it.mesh.position;
                            const m = makeItemMarker(pos.x, pos.y, pos.z, poolColor);
                            if (m) itemMarkers.set(it.mesh, m);
                        }
                    });
                }
                for (const [meshKey, marker] of itemMarkers) {
                    if (!seen.has(meshKey)) {
                        try { marker.dispose(); } catch (e) {}
                        itemMarkers.delete(meshKey);
                    }
                }
            } else if (!settings.itemEsp && itemMarkers.size > 0) {
                for (const marker of itemMarkers.values()) {
                    try { marker.dispose(); } catch (e) {}
                }
                itemMarkers.clear();
            }

            // ── Auto chat: trigger-word replies + spammer ──
            // Both modes funnel a single line into `_chatPending`, which a shared
            // send gate flushes — so they respect one flood cooldown and never
            // talk over each other. Skipped while the player is typing in chat
            // (don't clobber a real message) and while the game's flood limit is
            // active (chatLines climbs past ~2 when you've sent too fast).
            if (settings.autoChat || settings.chatResponder) {
                const chatIn = document.getElementById('chatIn');
                const typing = chatIn && document.activeElement === chatIn
                    && chatIn.style.visibility === 'visible';
                const flooded = me.chatLines > 2; // game-side rate limit
                const now = Date.now();
                const delay = Math.max(1000, Number(settings.autoChatDelay) || 4000);

                // (1) Responder: react to the newest incoming chat line, once.
                if (settings.chatResponder) {
                    const last = sshReadLastChat();
                    if (last && last.text) {
                        const sig = last.name + ' ' + last.text;
                        if (sig !== _lastChatSeen) {
                            _lastChatSeen = sig; // mark handled even if we don't reply
                            // Skip our own lines two ways: by name, and by
                            // matching the exact text we last sent — the latter
                            // breaks the reply-to-our-own-reply loop even when the
                            // chat-row name doesn't match me.name (e.g. clan tag).
                            const isSelf   = (last.name && me.name && last.name === me.name)
                                || last.text === _autoChatPrev;
                            const isSystem = last.text === 'joined.' || last.text === 'left.';
                            if (!isSelf && !isSystem) {
                                // Trigger word → its canned line; otherwise mock
                                // the sender by echoing their own message back.
                                _chatPending = sshHandleChat(last.text) || last.text;
                            }
                        }
                    }
                }

                // (2) Spammer: rotate the message list when nothing is queued.
                if (settings.autoChat && !_chatPending && now > _autoChatLast + delay) {
                    const msgs = String(settings.autoChatText)
                        .split('|').map(s => s.trim()).filter(Boolean);
                    if (msgs.length) {
                        _chatPending = msgs[_autoChatIdx % msgs.length];
                        _autoChatIdx++;
                    }
                }

                // (3) Shared send gate.
                if (_chatPending && chatIn && !typing && !flooded
                    && now > _autoChatLast + delay) {
                    let msg = _chatPending;
                    // The game silently drops a message identical to your
                    // previous one — nudge it with a trailing random letter.
                    if (msg === _autoChatPrev) {
                        msg += ' ' + String.fromCharCode(97 + Math.floor(Math.random() * 26));
                    }
                    if (sshSendChat(msg)) {
                        _autoChatLast = now;
                        _autoChatPrev = msg;
                        _chatPending = '';
                    }
                }
            }

            updateNyxBanner();
            return false;
        } catch (e) {
            log('per-frame error:', e && e.message);
            return false;
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    // NOTES
    // ────────────────────────────────────────────────────────────────────────
    // • Hold RMB → aim at the best enemy. "Target Crosshair" picks the one
    //   nearest your crosshair; otherwise the nearest by distance. "Only
    //   Visible" never targets through walls; off, it falls back to the best
    //   enemy overall when none have line-of-sight.
    // • Press V → toggle red wireframe ESP on enemies.
    // • Press ` → show/hide the settings menu (top-left).
    // • Prediction is a faithful port of a reference client's predictPosition: it reads
    //   the game's native per-tick velocity (player.dx/dy/dz) + network position
    //   and does a single-pass lead (t = dist/bulletSpeed + 1 tick) with a
    //   gravity + terminal-velocity vertical drop model and a ground clamp.
    // • Aim now snaps in a single step regardless of your in-game mouse
    //   sensitivity: before each synthetic move we call set_mouse_params(50,…)
    //   to pin the WASM look sensitivity to a known value, so movementX*0.0025
    //   maps to yaw exactly (ported from a reference client). This removes the old
    //   multi-frame "creep"/lag that happened when your in-game sensitivity
    //   didn't match SENSITIVITY (0.0025).
})();
