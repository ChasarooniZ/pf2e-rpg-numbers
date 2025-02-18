---
layout: page
title: From Software - You Died
id: from-software-you-died
---

Adds cool text to come on screen when you die in a game like Dark Souls that says something like `You Died` etc.

#### Preview

<video controls>
  <source src="../../videos/from-software-you-died-elden-ring.mp4" type="video/mp4">
</video>

## Settings

### Show on Death

---

If enabled will show this animation when a player's owned character dies

### Type

---

Type of animation to play

**Options**

<div class="video-container">
  <div class="video-column">
    <video controls>
      <source src="../../videos/from-software-you-died-elden-ring.mp4" type="video/mp4">
    </video>
    <p class="caption">Elden Ring</p>
  </div>
  <div class="video-column">
    <video controls>
      <source src="../../videos/from-software-you-died-Sekiro.mp4" type="video/mp4">
    </video>
    <p class="caption">Sekiro</p>
  </div>
  <div class="video-column">
    <video controls>
      <source src="../../videos/from-software-you-died-elden-ring.mp4" type="video/mp4">
    </video>
    <p class="caption">Test</p>
  </div>
</div>

### Font Size

---

**Default:** `52`

How big should the text be

### SFX

---

**Default:** `modules/pf2e-rpg-numbers/resources/sounds/eldenRingDeath.ogg`
Sound effect to play when `You Died` animation plays

### SFX Volume

---

**Default:** `40`

What % volume should sfx volume be

### Duration

---

**Default:** `6.5`

How long (in seconds) should the animation be

### Text

---

**Default:** `You Died`

What text to display in the animation

<style>
  .video-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .video-column {
    flex: 0 0 33.33%;
    padding: 0 10px;
    text-align: center; /* Center align captions */
  }

  video {
    width: 100%;
    height: auto;
  }

  .caption {
    font-size: 0.9em; /* Smaller text for captions */
    color: #555; /* Gray color for captions */
    margin-top: 5px; /* Space between video and caption */
  }

  @media (max-width: 768px) {
    .video-container {
      flex-direction: column;
    }
    
    .video-column {
      flex: 1 0 100%;
      margin-bottom: 20px;
    }
  }
</style>
