# 12.0.2 - Bug Swatter
- Fixed errors with **Damage Numbers** not processing targets properl (@malkyn)
- Fixed errors with **Shake Token** not chekcing properly if you even have tokenMagic Installed (@malkyn)
# 12.0.1 - Color Fixes
- Fixed issue with getting user color that caused Crit Animations & Finishing Moves to not work (@sasane)
# 12.0.0 - V12 Support
- Should now support v12
- Changed most sequencers calls to `await`
  - Should help to fix performance issues + inconsistency 
- Fixed issue with `feint` basic action animation
- Transitioned settings to use `requireReload` instead of custom function
- Known Bugs
  - **Damage Numbers** don't properly bounce, maybe an issue with Sequencer, looking into it
# 11.12.0 - Token Turning Updates
- Turn on Token Attack _new options_
  - **_New Setting._** Scale based on token size (scales how long it takes to turn based on the number of squares the token takes up)
    - _Must be enabled in the settings_
  - **_New setting._** Rotation time (set how long it takes for the token to rotate)
# 11.11.2 - Bug Fixes
- Fixed issue with **Damage Numbers** not resepcting message visibility (@Intervención)
- Updated parsing of `PF2e Toolbelt` msg falgs to grab targets on newer versions of pf2e Toolbelt
- Added manifest to `animated-spell-effects` to allow use of the **Basic Action Animations** feature
# 11.11.1 - Patch
- Fixed Issue with feint animation
- Added easing to roll scroll
# 11.11.0 - Basic Action Animations (WIP)
- Added new Option for **Basic Action Animations**
  - These are sequencer animations that I put together (may add sound/more options later)
  - At base these require [`animated-spell-effects-cartoon`](https://foundryvtt.com/packages/animated-spell-effects-cartoon) I picked this as my starting point because all the animations are free
    - It is my mission to offer everything of meaning for free as with the spirit of Paizo and their open access to their rules
  - At some point I will also add animations for JB2A Premium pack (as I own it)
    - I will include an option when this happens to pick one
  - **NOTE** Not all actions are implemented, I will be working on them slowly over the coming weeks
  - The following actions are implemented with no sounds in this initial release:
    - `Demoralize`
    - `Feint`
    - `Grapple`
    - `Reposition`
    - `Shove`
    - `Trip` 
    - `Tumble Through`
 - Bug Fixes
   - Possible Performance fix
     - **Note** module now requires the GM to be online to function for any of the FX (they run through the GM now)
   - Fixed permissions error when applying damage to token
   - Fixed error when parsing rolls with die numbers that don't exist (d7 etc.)
 - **V12 Update News**
   - No plans to do work to future prepare for V12 until Sequencer is updated as well (and the pf2e system officially releases for that version)

# 11.10.2 - Add Keybind for Finishing Moves
- Added a keybind to activate finishing move
# 11.10.1 - Localization
- Fixed localization of some settings
# 11.10.0 - The Sounds of Success
- Added SFX option to `Check Rolls`
  - **Must be enabled in settings to use**
  - Can set SFX for each result of a check as well as control the circumstances they're triggered
- Bugfixes
  - Reworked `Token Shake` code to hopefully remove a possible lag spot
  - Removed old code that could have been causing issues
  - Caught exception that sometimes shows up when parsing roll terms when rolling with weird dice such as `1d7` etc.
  - Started work of adding animations for `basicActionMacros`
# 11.9.16 - Bug Fixes
- Fixed performance issue implemented accidentally
- Fixed localization of token setting description for custom crit SFX
- Fixed possible bug where the offset of a token was set based on grid units
- Made reload ask before reloading
- Fixed setting that allows a player to opt out of critical effects

# 11.9.15 - Custom Critical Sounds
- Added custom Critical SFX to token options
- Refactored some of the critical code
- Fixed bug where crits wouldn't fire
- ~~using new versioning syntax from here one out to fit more in line with [Semantic Versioning](https://semver.org/)~~

# 11.9.14 - More Fixes and Revamp
- Created some helper functions to get and register settings to clean up the code and simplify it a lot
- Added Setting for players to disable critical animations for themselves
- Fixed negative numbers showing up when being healed
- Fixed bug where healing caused token to shake and screen to shake
- Actually added color for on apply
# 11.9.13 - Applying a whole new color
- Added color to on apply (green for heal, red for damage)
# 11.9.12 -  Healing Numbers
- Show healing for damage numbers
# 11.9.11 - Magical Shaking and Secret Numbers
- **Token Shake**
  - Added new Optional Upgraded animation for token shake, using Token Magic
  - Removed the invisibility from old Token Shake (@A Helpful Drow)
  - Adds recommendation to install [Token Magic](https://foundryvtt.com/packages/tokenmagic/)
  - Fixed Token Shake causing tokens to turn invisible
- **Finishing Move**
  - Added Toolclip so that the tool makes more sense (@LiquidGabs)
  - Added setting to use Player Color instead of Red as the glow color
  - Added quality setting (scales the text quality)  (@Things COuld Get Dicey)
- **Damage Numbers**
  - Changes the border color to a dark cyan when the only user that can see it is the GM (@Things COuld Get Dicey)
  - Fixed issue where disabling RPG Numbers doesn't disable them for `on Apply` (@A Helpful Drow)
  - Fixed Bug where sometimes numbers didn't generate due to issue with parsing of the type
- **Check Numbers**
  - Changes the border color to a dark cyan when the only user that can see it is the GM (@Things COuld Get Dicey)
- **Critical**
  - Fixes bug where Fire Emblem Crit started off screen
# 11.9.10 - Fix Crit Break again
- Fixes issue with crit animation not firing
# 11.9.9 - API Support + Fixes
- **API Support**
  - Added API support for some functions, example macros to come when I get around to it
  - Access api like follows, with functions details below `game.pf2eRPGNumbers`
    - `damageNumbers.generate(dmgList, targetIds)` - Generate Damage Numbers
    - `damageNumbers.getDamageList(msg)` - Get damage list from message
    - `finishingMove.generate(text)` - Create finishing move text
    - `rollNumbers.generate({roll, outcome, token})` - Create Roll Text scroll`
    - `critAnimation.generate({token, critType})` - Create Crit Animation
    - `turnTokenAttack.generate(tokenObject, targetObject)` - Run Turn Token animation
  - **Note** __API IS IN EARLY PHASE AND IS SUBJECT TO CHANGE (to make it easier to use/better named etc.)__
- **Crit Animation**
  - Added Option to delay when critical effect appears (substitute for adding dice so nice support for now)
- **Bug Fixes**
  - Fixed bug where Finishing Moves controls wouldn't be shown to players
# 11.9.8 - Finishers on Top
- Set finisher animation to render on top of critical hit animation
# 11.9.7 Catching all the Bugs
- Fixed issue with Fire Emblem Crit not working (@rigo)
- Fixed issue with Persona Crit not working with custom image (@JonDemand, @rigo)
# 11.9.6 - Scale Bruteforce Fix
- Checks to see if scale is a number otherwise inputs 1 for fire emblem crit animation
# 11.9.5  - Quick Fixes
- Checks for null Persona 5 image
# 11.9.4 Crit Config + Improvements
-  **Persona Crit Settings**
  - New settings for Persona Crit animations `Crit Offset X`, `Crit Offset Y`, `Crit Scale`, `Crit Rotation` 
![image](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/7eb4f14a-a0a4-4c0a-8e28-e49d8ac3c883)
- Actually fixed bug caused by spelling mistake for criticals on PCs
# 11.9.3 Bug Fix
-Fixed bug caused by spelling mistake for criticals on PCs
# 11.9.2 Settings + Improvements
- **Critical Animation - Changes** (@TheTenk & @pedrogrullada)
  - Added setting to set to show for PCs or NPCs or Both
  - Added setting to set whether the default crit animation is token or actor image for animations
  - **Persona Tweaks** - Added an offset for default images for the Persona aniamtion so that they should look a little better by default
  - Added Scaling to aniamtions if they use token to better match the size of the token on the page
- **Finishing Moves**
  - Fixed issue with visibility of text (@TheTenk)
  - Improved Quality of animation thanks to (@Clemente)
# 11.9.1 Bug Fixes
- Fixed Finishing Move Toggle
- Fixed bug where flag was null on control being toggled on or off
# 11.9.0 Jazz it Up!
- **Critical Animations**
  - Added Critical Hit Animation Options
  - Can also customize critical hit animation pictures in token settings
  - Fire Emblem
    - ![critical fire emblem](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/a7d982cc-340a-4fc5-a341-7229c9662b37)
  - Persona 5
    - ![critical persona](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/3cdf1572-fabc-4328-a812-1030e219447e)
- **Finishing Moves**
   - Added Finishing Move effect (based loosely on [this](https://youtu.be/FhjszLnffwM?si=DtAv2131fXnMOwJ5&t=14)]
   - To use them toggle on the setting, and then toggle the tool in Token Tools and use an action/attack/spell etc.
      - _Note: By default you will need to toggle on every time you want to use a finishing move_
   - ![finishing Move](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/1b085475-4d4a-4dfa-999d-e9efc03d1ff7)
- **Tour**
   - Added tour for this, and every major update from here on to give info on the feature
- Code Stuff
  - Refactored a lot of stuff, reformatted a lot of stuff
  - Fixed bug with reading -numbers when splitting up text for damage roll
# 11.8.7 Fixing old issues
- Minor refactor of some of the code for future readability
- Animations are now created on the side of the **User that rolled**
   - Hopefully shouldn't cause issues (was prev only on gm's pc)
- Minor Bug Fixes
   - Refactor helped to fix some logic bugs around on shake effects
   - Also fixed the `On Roll` option for RPG numbers, it now works! (@TomChristoffer)
# 11.8.6 Color Alignment 
- Updated damage colors to better match system
- Precision will be its own color as I want it to stand out
# 11.8.5 Moar Bug Fixes!!
- Fixed Auras disappearing again (current usage turns opacity to 0 then back to original value)
- Fixed setting that allows user to show number on Damage application
   - Note doesn't include color floor damage type or options to show damage breakdown
     - I'm currently not sure of a good method/hook to get that data as I'm using the Chat Message creation hook.
     - If you have any ideas feel free to propose them in a PR or issue
# 11.8.4 Bug Fix
- Fixed issue with code for new release not being in newest update
# 11.8.3 Numbers on Apply
- Added setting to show the damage number on apply instead of roll (@maplealmond)
- NOTE - this setting doesn't give the damage colors, and is all consolidated to one number for now, if I have time i might look into ways of making it function like on roll, but it is lower priority
# 11.8.2 - Pointing and Customizations
- Rotate Towards Improvements
  - Rotation Offsets in token settings now work, so you can have any token turn towards their opponent before the take them out regardless of where they start
  - ![Rotating_example_1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/b1097d1e-0684-4c12-8d58-f24a203f5e22)
- Settings Menu Overhaul
  - Settings menu now has **HEADERS** to make it easier to tell what setting affects what
  - In addition, I've made a brief pass through the settings text to make it more accurate/easier to read
- Token Damage Shake Bug Fixes + Updates
  - Aura Bug Fixes
    - @pedrogrullada Pointed out this functionality caused issues with auras
    - I have rewritten token shake to temporarily make the token invisible and shake an image copy of it instead fixing this issues
  - Settings
    - There are now settings for `distance`, `shakes`, and `duration`
    - There is also options to enable some basic scaling options, they are pretty rudimentary, but as I think of ideas I will add more
- Bug Fixes
  - Fixed bug where player tokens wouldn't properly shake
  - Fixed bug where it was possible for checks to be visible for people who couldn't see the token

# 11.8.1 - Drental to the Rescue
- Fixed Issue where showing Damage Numbers to specific players wouldn't work without perception module (thanks to @Drental)
- Token Damage Shake
  - @pedrogrullada has informed me that the **Token Damage Shake** feature causes auras to behave in unexpected ways.
  - Added a warning to the tooltip for it
  - Advice is that if that is an issue disable that feature for now, My plan is to deal with it sometime before the next update
# 11.8.0 - Shaking and Turning to a New Theme
- **Token Damage Shake**
  - Added new option that causes tokens to shake when they take damage (from a chat card)
- **Rotate on Attack**
  - Added new option to have token rotate when you make an attack (uses the attack roll type to determine)
  - Token rotates back after a second or so
  - Will probably add more optional settings
  - Have written stuff for token properties to set offset to the animation (so your token's "face" is looking at the target), but Sequencer seems to have a bug related to offset for rotate atm, so am waiting for that to be fixed for this to work
- **Check Color Themes**
  - Added start of compatability of themes so you can have color options, will expand as requested
  - Will also be expanding settings when I go back to change a bunch of how I handled settings
# 11.7.0 - Code Refactor
- Refactor of code for easier maintenance
# 11.6.0 - PF2e Toolbelt Support
- Support for using PF2E toolbelt's token target feature as the source of targets for damage popups
# 11.5.0 - Shaking Things Up
- **Screen Shake Feature**
  - Adds new option to shake the screen for the token owner when taking damage
  - Options to set scaling etc.
![screen shake example](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/923e8814-be6f-424b-82b2-bf23d317f465)
# 11.4.0 Checks
- Added option to show check results
  - Should only ever show rolls the user has access to per user
  - Can toggle between numbers and the actual text
# 11.3.0 Total Upgrade
- Added new settings option to `Show Total `
  - This allows you to show the total of all the numbers in the center
  - Mimics the Baldur's Gate 3 damage pop ups in a way
- Updated Animation
  - Now flows out more similar to Baldur's gate
  - Not perfect but good enough
- Added scaling to animation size (to make bigger or larger)
**Important Breaking Settings Changes**
- Changed setting for `wait-time` from seconds -> ms (If you had this already installed please update your wait time, recommended is 150 ms)
- Changed Default setting for `offset`, recommended is -25 (as it lines it up with the top middle of the token)
  - Offset setting is distance (%) from the center, with negative being up and positive being down
# 11.2.4 Enable Setting + removed Pop up
- Added option to disable module
- Removed pop up text on start
# 11.2.3 Actually Assigning a variable does something
- Actually Updated list of people that can see the numbers so it isn't just the GM all the time
# 11.2.2 Null Check
- Added null check for character uuid
# 11.2.1 Bugfix
- Fixed bug with pf2e perception support
# 11.2.0 Pf2e Perception Support
- Added a check to support Pf2e perception
  -  Damage will no longer show if the target is `unnoticed` or `undetected` in that module for a particular user
# 11.1.1 Make a Wish (Hidden check + GM Only mode)
- Added a check if token is hidden, if so, should only play for GMs
  - Planning to add support for PF2E Perception's visibility as well
- Added a GM only option so that you can enjoy the numbers all to yourself
# 11.1.0 - Initial Release
- Am aware some features are missing, check the issues tab for those or add any yourself.
- Made this module because its something I enjoyed seeing, so I hope you can enjoy it too.
- As a note, extra functionality is added when using target damage with this module!
# 11.0.2 - Fix for Module.json + Changelog
- Added fix for Module.json
- Created Changelog
- 
# 11.0.1 - First Stab at it
- Damage Numbers should now pop up on roll
- Damage numbers only appear over the first target unless you have **PF2E Target Damage** installed
- Unsure how this module works with other clients
- TODO
  - Settings for module
   - Color options
   - performance optimization
   - Text options
   - Crit Message idea
