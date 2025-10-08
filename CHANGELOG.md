# 13.7.9 - Polish Translation

- **Updated**
  - Updated Polish translation (🌐 @Lioheart)

# 13.7.8 - French Translation

- **Updated**
  - Updated French translation (🌐 @rectulo)
  

# 13.7.7 - Bullets

- `Crit`
  - Adds detection for creatures with immunity to critical hits (💻 @Bullesta)
  - Adds a Bypass Immunity toggle in the Critical Hit settings (It’s enabled by default)
  

# 13.7.6  - Missing Parenthesis

- **Updated**
  - `Darkest Dungeon: Stress / Relief`
    - Fixed bug where all tokens show stress/relief animation (🐛 @simon Magnus)
    
  

# 13.7.5 - Fixes 2

- **Updated**
  - `Darkest Dungeon: Stress / Relief`
    
    - Updated so that tokens selected are only those in combat if there is a combat
    
  - Updated French translation (🌐 @rectulo)
    
  

# 13.7.4 - Fixes

- **Updated**
  - Added extra/packing for the packs in this module
    
  - `Token Shake on Damaged`
    
    - Updated the enable text to include a warning about the possibility of tokens turning invisible
    
  - `Critical`
    
    - Fix some logic for the `Show On...` settings (🐛 @Fumu)
    
  

# 13.7.3 - Long Time Coming

- **Updated**
  - Updated `From Software Death/Noun Verbed` macros to better match the api
  

# 13.7.2 - Speed Up

- **Updated**
  - `VS Animation`
    
    - Added explicit cancel button
    - Added tooltip to animation question itself to make it clearer how to change the default
    - Setup autofocus on the enemy team name input
    
  - `Localization`
    
    - Added localization options for settings menu button
    - Updated French translation (@rectulo)
    
  

# 13.7.1 - French

- **Updated**
  - Updated French translation (@rectulo)
  

# 13.7.0

- **New**
  
  - `Turn Tokens on Target`
    - Add new option for tokens to turn towards the token they target
    
  
- **Updated**
  
  - Updated token effects to use `.copySprite()`
  - Updated French translation (@rectulo)
  - Now requires **Sequencer** `3.6.10`
  

# 13.6.0 - Toolbelt handling

- **New**
  
  - Added handling for `PF2e Toolbelt` rolls and rerolls
  - `Critical`
    - Added `Art Delay` setting to delay the art portion
    - Added `Duration` setting to set the total effect duration
    
  
- **Updated**
  
  - Required **Genga** version to `0.7.3`
  

# 13.5.0 - VISION

- **New**
  
  - Added support for `Pf2e Visioner` for visibility
  
- **Updated**
  
  - For the changelog am dropping linking the version diff in the changelog, if you want to check version differences you can compare them from the release section
  - I apologize to those who might have used this 🙏 (I just lost patience for it)
  

# [13.4.7](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.4.6...13.4.7) - DD Crit Fixes

- **Updated**
  - `Darkest Dungeon Crisis/Virtue` - Fixed issue where users filter was not being passed (🐛 @TheTenk)
  - To fix this updated required **Genga** version to `0.7.2`
  - Updated French translation (@rectulo)
  

# [13.4.6](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.4.5...13.4.6) - Bounce off Fixed

- **Updated**
  - `Target Dodges`
    - Fixed last issue causing the `Bounce Off` animation to fail (🐛 @YoSoy-Ed)
    
  

# [13.4.5](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.4.4...13.4.5) - Bounce off Target

- **Updated**
  - `Target Dodges`
    - Fixed longstanding issue causing the `Bounce Off` animation to fail
    
  

# [13.4.4](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.4.3...13.4.4) - Actor Crit Fix

- **Updated**
  - Fixes issue where actor crit settings aren't scrollable
  

# [13.4.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.4.2...13.4.3) - Some Clarification

- **Updated**
  - Updated some settings descriptions to clarify what features work with what
  - Updated `Finishing Moves` dialog to `DialogV2`
  

# [13.4.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.4.1...13.4.2) - Fixes

- **Updated**
  - Fixed issue with logic that causes update messages to not spam
  - Fixed issue causing `Dodge On Miss` to not work properly
  

# [13.4.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.4.0...13.4.1) - Silence

- Stop whisper spamming on updates

# [13.4.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.3.0...13.4.0) - The Darkest Dungeon

- **New**
  
  - `Darkest Dungeon: Stress / Relief`
    
    - Adds a new animation that will either play the stress or relief icon on friendly tokens based on either Critical Success or Failures
    
  - `Update Messages`
    
    - Occassionally will have update messages with some patch notes (General Reserved for Feature releases and not patches)
    
  - `Table of Contents`
    
    - Easy way to see all and navigate to some settings
    
  
- **Updated**
  
  - Updated French translation (@rectulo)
  - Updated Polish translation (@Lioheart)
  - Updated `Genga` requirement to `0.7.1`
  

# [13.3.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.2.3...13.3.0) - A Darker Dungeon

- **New**
  
  - `Critical`
    - Added two new critical animations
      - `Darkest Dungeon: Virtue`
      - `Darkest Dungeon: Crisis`
      
    
  
- **Updated**
  
  - Updated `Genga` requirement to `0.6.0`
  

# [13.2.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.2.2...13.2.3) - Fix Token Rotate

- Fixes `Token Rotate on Attack` not working

# [13.2.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.2.1...13.2.2) - Fix Token Shaking

- Fixes `Token Shake on Damage` not working (🐛 @Razytos)

# [13.2.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.2.0...13.2.1) - Flat Checks

- `Updated`
  - **Critical**
    - Fixed case where criticals would trigger on flat checks (@TheTenk)
    
  

# [13.2.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.1.1...13.2.0) - New Workflow

- `Updated`
  - This module now requires `Genga` (my system agnostic animation module)
    
    - This will allow an easier animation creation workflow, and allow possible future expansion of some features to other systems
    - The code for many animations has been moved to that repo
    
  - **VS Animation**
    
    - Updated team name dialog to `DialogV2`
    
  

# [13.1.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.1.0...13.1.1) - Fix menu

- Removed vestigial elements of the settings menu

# [13.1.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.0.1...13.1.0) - UI Upgrades

- `Updated`
  - **Menus**
    
    - `Actor Settings Menu` has been updated to AppV2
    - `Module Settings Menu` has been updated to AppV2
    
  - **Token Shake**
    
    - Settings for token shake have been simplified
    - Shaking now scales off `Max HP` by default
    
  - **Dodge on Miss**
    
    - Made it so the original tokens slowly fade in and out as they dodge (@nyths)
    
  - **Languages**
    
    - Updated `Polish` translation (@Lioheart)
    
  

# [13.0.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/13.0.0...13.0.1) - Investigating Warnings

- Fixed minor warnings that showed for `filePicker` and `rangeFinder` handlebars templates
- Fixed issue where menus wouldn't open

# [13.0.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.10.6...13.0.0) - v13

- Updated to v13

# [12.10.6](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.10.5...12.10.6) - Prep Work

- Made a change to my waiting for `diceSoNice` that should at least allow testing of most features for v13

# [12.10.5](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.10.4...12.10.5) - Default Permissions

- Now properly handle when default ownership is `owner` that fixes edge case for `Screen Shake` and `Screen Shake on Attack` (🐛 @ZerthofGith)

# [12.10.4](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.10.3...12.10.4) - Polish

- Updated `Polish` translation (@Lioheart)

# [12.10.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.10.2...12.10.3) - Header Hider

- Allowed for hiding the header button text
- Fixed possible bug with `vs animation` not starting
- Added a way to cancel out the `vs animation` when you click cancel on the name input dialog

# [12.10.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.10.1...12.10.2) - Localization

- Fixed wrong text being used for `VS Animation`'s `Duration` setting
- Updated `French` translation (@rectulo)

# [12.10.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.10.0...12.10.1) - Sneak Attack

- **Updates**
  - `VS Animation`
    
    - Added better handling for visibility and outlines (🐛 @RoiLeaf)
      
    - Creatures that are `undetected`, `unnoticed`, or marked as `hidden` in the combat tracker will not be shown in the animation
      
      - Note: This will check if the creature also has these conditions from **any** creature
      
    - Creatures that are `hidden` or `concealed` will be displayed in Silhouette
      
    - Note: The `pf2e perception` handling atm is very basic as it will only check for the 'Presence of the condition' and not specifically whether it is against to a relevant token
      
    
  - `Languages`
    
  - Updated `Polish` translation (@Lioheart)
    
  

# [12.10.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.20...12.10.0) - VS Everything

- `New`
  
  - `VS Animation`
    - New option to display a Versus animation at the start of combat with all actors
    - Also option to input a team name for the players and a team name for enemies (if omitted the team name will not be displayed)
    
  
- `Updates`
  
  - All animations now have ****preloading**** (i don't know how i didn't realize this was just an option for `play()`)
    
  - Added the `moduleName` to all animations as well
    
  - `Target Dodges`
    
    - Fixed setting localization breaking
    
  - `Manifest`
    
    - Fixed link to sequencer's `module.json`
    
  

# [12.9.20](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.19...12.9.20) - Disableable Crits

- Updated `Polish` translation (@Lioheart)
- Fixed issue where `Critical Animation` setting for disabling animation for user setting wasn't working. (**Note** to update this, the criticals need to be toggle on, saved, then off again) (🐛 @GuitarGuyNick)

# [12.9.19](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.17...12.9.18) - A Little More Settings

- Add setting to make sounds play on `PC`, `NPC`, or `Both`
- Changed tooltips to display on the left for easier settings navigation

# [12.9.18](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.17...12.9.18) - Fixed No Outcome handling

- Added Better Handling for no outcome on roll

# [12.9.17](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.16...12.9.17) - Fixed Crit Testing

- Fixed issue where testing a `Critical` in the actor menu fails every time

# [12.9.16](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.15...12.9.16) - Fixes

- `Fixes`
  - Updated size of `From Software` `Noun Verbed` and `You Died` rectangles to better match
  - Fixed settings mapping for `Critical` `Checks or Attacks` (🐛 @TheTenk)
  - Fixed actor settings for `Critical` override on for `skills` (🐛 @TheTenk)
  

# [12.9.15](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.14...12.9.15) - 🔴⚪

- Updated `Polish` translation (@Lioheart)

# [12.9.14](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.13...12.9.14) - Elden Ring Fix

- `Fixes`
  - Fixed the spacing between the parts of the `Elden Ring - Noun Verbed` (🐛 @DirtyLaundry6)
  

# [12.9.13](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.12...12.9.13) - Fix to the Fix

- `Fixes Again`
  
  - fixed `Damage Shake` and `Dodge Animation` failing to run at the right size (🐛 @RoiLeaf)
  
- `Fixes Again`
  
  - fixed `Damage Shake` and `Dodge Animation` failing to run at the right size (🐛 @RoiLeaf)
  

# [12.9.12](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.11...12.9.12) - Fix Tokens

- `Fixes`
  
  - fixed `Damage Shake` and `Dodge Animation` failing to run (🐛 @RoiLeaf)
  
- `Fixes`
  
  - fixed `Damage Shake` and `Dodge Animation` failing to run (🐛 @RoiLeaf)
  

# [12.9.11](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.10...12.9.11) - Burrow Depth

- `Fixes`
  
  - Won't show burst or burrow if the token is hidden
  
- `Burrow x Burst`
  
  - Added new burrow animation depth option
    - Will stop showing the burrow animation if the token is lower than the depth option
    
  
- Updated `Polish` translation again (@Lioheart)
  

# [12.9.10](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.9...12.9.10) - Burrowing around + Sprite Fix

- `Fixes`
  
  - Replaced `copySprite()` as it only copies the token sprite and not the subject art if used
  - This affects the following animations:
    - `Damage Shake`
    - `Target Dodges`
    
  
- `Burrow x Burst`
  
  - Added new burrow animation option
  - This will cause the token to turn invisible and play the **new** JB2a burrowing animation over the distance it moves
  

# [12.9.9](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.8...12.9.9) - Free the bar + Changes to Scaling

- `Actor Settings`
  
  - Changes header to use hover over for the icon instead of actually text
  
- `Sequencer`
  
  - New version requirement of `3.4.9`
  - Any animations that were screenspace had to be updated, as such the following animations if adjusted by you (for instance criticals, may need to be adjusted)
    - **Criticals**
      
      - `Disgaea 7`
      - `Fire Emblem: Awakening`
      - `Fullscreen`
      - `Persona 5`
      
    - **From Software Text**
      
    - **Finishing Moves**
      
    
  
- `Actor Settings`
  
  - Changes header to use hover over for the icon instead of actually text
  
- `Sequencer`
  
  - New version requirement of `3.4.9`
  - Any animations that were screenspace had to be updated, as such the following animations if adjusted by you (for instance criticals, may need to be adjusted)
    - **Criticals**
      
      - `Disgaea 7`
      - `Fire Emblem: Awakening`
      - `Fullscreen`
      - `Persona 5`
      
    - **From Software Text**
      
    - **Finishing Moves**
      
    
  

# [12.9.8](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.7...12.9.8) - Fix For Scaling

- `Critical`
  
  - Fixed issue where scaling of Disgaea Crit changes based on grid resolution (🐛 @Spen, @Fumu)
  
- `Localization`
  
  - Updated `Polish` translation again (@Lioheart)
  
- `Critical`
  
  - Fixed issue where scaling of Disgaea Crit changes based on grid resolution (🐛 @Spen, @Fumu)
  
- `Localization`
  
  - Updated `Polish` translation again (@Lioheart)
  

# [12.9.7](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.6...12.9.7) - Docs

- `Critical`
  
  - Fixed `Fire Emblem: Awakening` not moving far enough
  
- `Rotate On Attack`
  
  - Added `Default Rotation` this allows it so you can set a general rotation as the default
  
- `Documentation`
  
  - Added docs to the module
  
- `Misc`
  
  - Updated some localizations for english to better match
  - Changed some settings to be on by default
  - Updated `Polish` translation again (@Lioheart)
  - Updated recommended modules and requirements
    - Requires Sequencer `3.4.0` or higher
    - Removed `Token Magic FX` as a recommended module, the token shaking functionality for it will be removed in `V13`
    - Added `JB2A Patreon` as a recommended module (as it is used for some functionality)
    
  
- `Critical`
  
  - Fixed `Fire Emblem: Awakening` not moving far enough
  
- `Rotate On Attack`
  
  - Added `Default Rotation` this allows it so you can set a general rotation as the default
  
- `Documentation`
  
  - Added docs to the module
  
- `Misc`
  
  - Updated some localizations for english to better match
  - Changed some settings to be on by default
  - Updated `Polish` translation again (@Lioheart)
  - Updated recommended modules and requirements
    - Requires Sequencer `3.4.0` or higher
    - Removed `Token Magic FX` as a recommended module, the token shaking functionality for it will be removed in `V13`
    - Added `JB2A Patreon` as a recommended module (as it is used for some functionality)
    
  

# [12.9.6](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.5...12.9.6) - Settings Menu Tabs

- Fixed styling for settings menu (🐛 @weepingminotaur)
- Updated `Polish` translation again (@Lioheart)

# [12.9.5](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.4...12.9.5) - Disgaea Offset

- Fixed issue where `Disgaea 7` `Critical` offset wasn't set up properly (🐛 @ZinUwU)

# [12.9.4](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.3...12.9.4) - Bounce Off + Styling

- `Target Dodges`
  
  - Add new option `Bounce Off` that causes the attack to "bounce off" creating sparks
  - Can be toggled as the new default dodge animation, or automatically swapped to if the target meets one of the following conditions
    - Has a `Shield Raised` or `Shield` Spell active
    - Str > Dex
    
  
- `Misc`
  
  - Menus now have icons to represent their section
  
- `Target Dodges`
  
  - Add new option `Bounce Off` that causes the attack to "bounce off" creating sparks
  - Can be toggled as the new default dodge animation, or automatically swapped to if the target meets one of the following conditions
    - Has a `Shield Raised` or `Shield` Spell active
    - Str > Dex
    
  
- `Misc`
  
  - Menus now have icons to represent their section
  

# [12.9.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.2...12.9.3) - Multi Line Finisher

- Add ability for `Finishing Moves` to be up to **4 lines** uses `|` to indicate a line separation
- Improved `Finishing Moves` clarity
- Updated `Polish` translation again (@Lioheart)

# [12.9.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.1...12.9.2) - Burrowing and Fixes

- `Added`
  
  - `Burst Burrow`
    - Add option to display animation even if the token doesn't have burrow speed
    
  
- `Fixes`
  
  - `DMG Numbers`
    
    - Added fallback for when jitter is undefined
    
  - `Translation`
    
    - `Polish` translation updated (@Lioheart)
    
  
- `Added`
  
  - `Burst Burrow`
    - Add option to display animation even if the token doesn't have burrow speed
    
  
- `Fixes`
  
  - `DMG Numbers`
    
    - Added fallback for when jitter is undefined
    
  - `Translation`
    
    - `Polish` translation updated (@Lioheart)
    
  

# [12.9.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.9.0...12.9.1) - Jittering Fix

- `Fix`
  
  - `Damage Numbers`
    - Fixed issue where `jitter` was saved as `NaN` (🐛 @Nuumers)
    
  
- `Misc`
  
  - Refactored some backend code for `Check Animation` `sfx`
  
- `Fix`
  
  - `Damage Numbers`
    - Fixed issue where `jitter` was saved as `NaN` (🐛 @Nuumers)
    
  
- `Misc`
  
  - Refactored some backend code for `Check Animation` `sfx`
  

# [12.9.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.8.2...12.9.0) - Bursting onto the Scene

- `Added`
  
  - `Burrowing and Bursting`
    - Adds a new animation option to burrow and burst from the ground (for creatures with a burrow speed)
    - **Note.** requires `jb2a_patreon` for the animations
    
  
- `Misc`
  
  - Reworked how settings are stored for easier refactoring
  
- `Added`
  
  - `Burrowing and Bursting`
    - Adds a new animation option to burrow and burst from the ground (for creatures with a burrow speed)
    - **Note.** requires `jb2a_patreon` for the animations
    
  
- `Misc`
  
  - Reworked how settings are stored for easier refactoring
  

# [12.8.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.8.1...12.8.2) - Waiting once

- Only wait for message to display for `Dice so Nice` once
- Fixed issue where animations wouldn't play if you didn't have the chat window displayed (🐛 @DrNiels)
- Fixed issue where check duration and damage duration were written to the same value
- Updated French Translation (@rectulo)

# [12.8.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.8.0...12.8.1) - Small Updates

- Update polish translation (@Lioheart)
- Fixes bug in `Check Animations: SFX` that caused the `Crit Only` setting to play sounds for anything but crits

# [12.8.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.7...12.8.0) - Dodging Attacks

- `Target Dodges`
  
  - Adds feature allowing you to have tokens dodge when attacks on them miss
  
- `Shake Token on Damage`
  
  - Backend changes to use sequencer's `copySprite` for better styling
  
- `Misc`
  
  - Updated how settings helper was written for ease of reading
  
- `Target Dodges`
  
  - Adds feature allowing you to have tokens dodge when attacks on them miss
  
- `Shake Token on Damage`
  
  - Backend changes to use sequencer's `copySprite` for better styling
  
- `Misc`
  
  - Updated how settings helper was written for ease of reading
  

# [12.7.8](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.7...12.7.8) - Settings Form Fix

- Fixed settings forms not saving properly (bugcatcher @Novem)

# [12.7.7](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.6...12.7.7) - Player Finishing Moves Again

- Migrated over missing setting for `Finishing Moves` that allows players to toggle on finishing moves (Bug catcher @Argonaut13)

# [12.7.6](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.5...12.7.6) - Actually Let me Disable it

- Fixed bug where you couldn't save data without enabling for all players (bugcatcher @Novem)
- Fixed bug where critical failures show up for every token even if they didn't have them manually enabled (bugcatcher @Simon Magnus)
- Fixed fullscreen crit animation always showing for all users (bugcatcher @YoSoy-Ed)

# [12.7.5](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.4...12.7.5) - Get Rotated

- `Rotate On Attack`
  
  - Fixed Bug where actor settings for rotation wasn't being taken into account (bugspotter @Nuumers)
  - Added a fancy new rotation selection option!
  
- `Actor Settings`
  
  - Added option to disable button for actor settings for players (by default players will have the PF2e RPG #s actor button disabled)
  
- `Translation`
  
  - Updated polish translation (@Lioheart)
  
- `Rotate On Attack`
  
  - Fixed Bug where actor settings for rotation wasn't being taken into account (bugspotter @Nuumers)
  - Added a fancy new rotation selection option!
  
- `Actor Settings`
  
  - Added option to disable button for actor settings for players (by default players will have the PF2e RPG #s actor button disabled)
  
- `Translation`
  
  - Updated polish translation (@Lioheart)
  

# [12.7.4](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.3...12.7.4) - Polish Update

- Update polish translation (@Lioheart again <3)

# [12.7.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.2...12.7.3) - Default Value Fix

- Fix issue with tokens that have no actor specific crit settings erroring out

# [12.7.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.1...12.7.2) - Scaling FIx

- Fix scale issue where it uses the wrong scaling for critical animation test
- Changes scale to a number input (to allow for larger scales)
- Fix localization of the description of `Critical Scale` for actor settings

# [12.7.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.7.0...12.7.1) - Early Fixes

- Fixed Error where `Critical Animation` setting `Override Enabled` was not being saved
- Fixed bug where `Critical Animation` macro wasn't properly grabbing actor settings

# [12.7.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.11...12.7.0) - Critical Upgrade

- **Added**
  
  - **Actor Settings Menu**
    
    - There is a new actor settings menu! (Currently primarily for Critical Animations)
    - All old Token settings that were set in the token prototype should be automatically migrated to the new settings when installing the current version
      - If this process fails for whatever reason you can use the following to run the migration again `game.pf2eRPGNumbers.migration.tokenSettingsToActor()`
      
    
  - **Critical Animations**
    
    - There are 2 new critical animation types:
      - `Disgaea 7`
      - `Fullscreen`
      
    
  - `Crit Types`
    
    - You can now set different critical types and images for different scenarios such as `Strikes`, `Saves`, and `Checks`
    - Also adds option to configure `Critical Failure` animations for **specific actors**
    - This can be configured in the `Actor Settings Menu`
    
  - `Crit Activate For Specific Actors`
    
    - You can now set a particular actor to bypass the current critical settings (IE allow a boss to show their crit image even if you have crits disabled for NPCs)
    - This can be configured in the `Actor Settings Menu`
    
  
- **Fixes**
  
  - Dice So Nice support has been updated to use a better integration method (@7H3LaughingMan)
  - Removed unnecessary awaits to improve overall performance of the module (@7H3LaughingMan)
  
- **Added**
  
  - **Actor Settings Menu**
    
    - There is a new actor settings menu! (Currently primarily for Critical Animations)
    - All old Token settings that were set in the token prototype should be automatically migrated to the new settings when installing the current version
      - If this process fails for whatever reason you can use the following to run the migration again `game.pf2eRPGNumbers.migration.tokenSettingsToActor()`
      
    
  - **Critical Animations**
    
    - There are 2 new critical animation types:
      - `Disgaea 7`
      - `Fullscreen`
      
    
  - `Crit Types`
    
    - You can now set different critical types and images for different scenarios such as `Strikes`, `Saves`, and `Checks`
    - Also adds option to configure `Critical Failure` animations for **specific actors**
    - This can be configured in the `Actor Settings Menu`
    
  - `Crit Activate For Specific Actors`
    
    - You can now set a particular actor to bypass the current critical settings (IE allow a boss to show their crit image even if you have crits disabled for NPCs)
    - This can be configured in the `Actor Settings Menu`
    
  
- **Fixes**
  
  - Dice So Nice support has been updated to use a better integration method (@7H3LaughingMan)
  - Removed unnecessary awaits to improve overall performance of the module (@7H3LaughingMan)
  

# [12.6.11](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.10...12.6.11) - Fixed Shaking

- Fixed bug with dynamic tokens not shaking properly on `token damage shake` (@nythz)

# [12.6.10](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.9...12.6.10) - Flip Flop

- Fixed issue where From Software Noun-Verbed Enabled setting was flipped 🐬

# [12.6.9](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.8...12.6.9) - Disableable

- Fixed issue where From Software Noun-Verbed would always play (@serbandr)

# [12.6.8](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.7...12.6.8) - Proper Threshold

- Fixed issue where From Software Noun-Verbed wouldn't play automatically after combat due to checking the wrong variable (@Fumu)

# [12.6.7](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.6...12.6.7) - Simple Fixes

- Fixed issue where the default `Crit SFX` wouldn't play if the token had any flags (@Deatrathias)

# [12.6.6](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.5...12.6.6) - Dynamism

- `Token Damage Shake`
  
  - Added support to automatically use the **Subject Texture** if dynamic tokens are enabled
    
    - Note: will fallback to token image when the subject texture is blank
    
  - Rewrote code for future maintainability
    
  
- `Token Damage Shake`
  
  - Added support to automatically use the **Subject Texture** if dynamic tokens are enabled
    
    - Note: will fallback to token image when the subject texture is blank
    
  - Rewrote code for future maintainability
    
  

# [12.6.5](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.4...12.6.5) - Nyan Nyan Nyan

- Fix issue where token `Critical SFX` wasn't activating (@TheTenk for the catch on this)

# [12.6.4](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.3...12.6.4) - A Little Birdie

- Fixed setting for `critical` `Default Image Type` setting not properly saving/updating (@ShinyChariot375)

# [12.6.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.2...12.6.3) - Fixes

- `api`
  
  - Made it so crit animation uses the one set in settings by default
  
- `Fire Emblem Crit`
  
  - Fixed crit animation that I broke last time
  
- `api`
  
  - Made it so crit animation uses the one set in settings by default
  
- `Fire Emblem Crit`
  
  - Fixed crit animation that I broke last time
  

# [12.6.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.1...12.6.2) - Screen Quest

- Sequencer minimum version updated to `3.3.8`
- Uses `screenSpace` boolean for `Fire Emblem Crits` now for more consistent fire emblem crit

# [12.6.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.6.0..12.6.1) - A Glass of Water

- `Check Animations`
  
  - `SFX`
    - Added option to insert an array for check animation SFX as so `["sfx-1", "sfx-2"]` etc.
    
  
- `Settings`
  
  - Fixed settings appearance (Specifically fixed for non Dorako UI users)
  - Added background to buttons for better visibility
  - Updated how settings are defined on the back end to allow better maintainability
  
- `From Software`
  
  - Added Death animation from Sekiro
  
- `Check Animations`
  
  - `SFX`
    - Added option to insert an array for check animation SFX as so `["sfx-1", "sfx-2"]` etc.
    
  
- `Settings`
  
  - Fixed settings appearance (Specifically fixed for non Dorako UI users)
  - Added background to buttons for better visibility
  - Updated how settings are defined on the back end to allow better maintainability
  
- `From Software`
  
  - Added Death animation from Sekiro
  

# [12.6.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.5.5...12.6.0) - Our Menu - First Course

- `Settings Menu`
  
  - Redid many settings to be in their own menu
  - Added hover over images to preview each setting
  - Added option to Import and Export setting
  
- `Shake on Attack`
  
  - Increased the base strength of this shake to meet recommended parameters
  
- `API`
  
  - Added import and export settings to api
    - `game.pf2eRPGNumbers.settings.export` & `game.pf2eRPGNumbers.settings.import`
    
  
- `Damage Numbers`
  
  - Added support for multiply dice for more than `2 * <Xdx>`
  - Removed error when damage roll has no target
  
- `Settings Menu`
  
  - Redid many settings to be in their own menu
  - Added hover over images to preview each setting
  - Added option to Import and Export setting
  
- `Shake on Attack`
  
  - Increased the base strength of this shake to meet recommended parameters
  
- `API`
  
  - Added import and export settings to api
    - `game.pf2eRPGNumbers.settings.export` & `game.pf2eRPGNumbers.settings.import`
    
  
- `Damage Numbers`
  
  - Added support for multiply dice for more than `2 * <Xdx>`
  - Removed error when damage roll has no target
  

# [12.5.5](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.5.4...12.5.5) - Damage Roll Fix

- Fixed bug where damage rolls weren't actually showing

# [12.5.4](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.5.3...12.5.4) - Actually use Screenscale for Crits

- `Critical Animations`
  
  - Actually use screen scale for crits so it is consistent across different monitors (@cuyeet)
  - **WARNING** - May adjust how your critical hit animations appear (as always revert to a previous version if new features aren't to your liking)
  
- `Critical Animations`
  
  - Actually use screen scale for crits so it is consistent across different monitors (@cuyeet)
  - **WARNING** - May adjust how your critical hit animations appear (as always revert to a previous version if new features aren't to your liking)
  

# [12.5.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.5.2...12.5.3) - Fix for Styling

- `From Software - Noun Verbed`
  
  - Fixed styling for Custom Text (@RavenRaconteur)
  - Automatically Capitalize text passed in to `Noun Verbed` and `You Died` text
  
- `From Software - Noun Verbed`
  
  - Fixed styling for Custom Text (@RavenRaconteur)
  - Automatically Capitalize text passed in to `Noun Verbed` and `You Died` text
  

# [12.5.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.5.1...12.5.2) - Shaking and Polish

- Update Polish Translation (@LioHeart)
- Fixed issue with Sequencer based shake on damage not checking flipped or rotated (@spen)

# [12.5.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.5.1...12.5.2) - Shaking and Polish

- Update Polish Translation (@LioHeart)
- Fixed issue with Sequencer based shake on damage not checking flipped or rotated (@spen)

# [12.5.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.5.0...12.5.1) - Not Always Enemy Felled

- Fixed issue with non calculating XP properly

# [12.5.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.10...12.5.0) - Enemy Felled

- `From Soft Text`
  
  - Added two new features
    - **Noun Verbed**
      
      - Is styled after Elden Ring's 'Noun Verbed' ie Enemy Felled
      - Can be triggered:
        - **Manually** - via the API/Macro
        - **Automatically** - at the end of an encounter worth a certain amount of XP or more (per player) depending on your module settings
          - (Set this option to 0 to trigger at the end of all encounters)
          
        
      
    - **You Died**
      
      - Is styled after Elden Ring's 'You Died'
      - Can be triggered:
        - **Manually** - via the API/Macro
        - **Automatically** - When a player gets the `Dead` condition added to their owned character
        
      
    
  
- `API Macros`
  
  - Added API macros Compendium under `PF2e RPG Numbers Macros` to trigger some of the module's functions manually
  
- `Languages`
  
  - Added machine translated upport for the following languages using [locize](https://translate.i18next.com/)
    
    - Spanish, French, German, Japanese, Korean, Russian
    
  - Polish (@LioHeart)
    
  
- `From Soft Text`
  
  - Added two new features
    - **Noun Verbed**
      
      - Is styled after Elden Ring's 'Noun Verbed' ie Enemy Felled
      - Can be triggered:
        - **Manually** - via the API/Macro
        - **Automatically** - at the end of an encounter worth a certain amount of XP or more (per player) depending on your module settings
          - (Set this option to 0 to trigger at the end of all encounters)
          
        
      
    - **You Died**
      
      - Is styled after Elden Ring's 'You Died'
      - Can be triggered:
        - **Manually** - via the API/Macro
        - **Automatically** - When a player gets the `Dead` condition added to their owned character
        
      
    
  
- `API Macros`
  
  - Added API macros Compendium under `PF2e RPG Numbers Macros` to trigger some of the module's functions manually
  
- `Languages`
  
  - Added machine translated upport for the following languages using [locize](https://translate.i18next.com/)
    
    - Spanish, French, German, Japanese, Korean, Russian
    
  - Polish (@LioHeart)
    
  

# [12.4.10](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.9...12.4.10) - Fire Emblem Clear

- Fixed transparency on the fire emblem crit background (@Nittles)

# [12.4.9](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.8...12.4.9) - Animated Crits

- Added webm support for Persona Crits (@Bullesta)

# [12.4.8](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.7...12.4.8) - Actually Supported now...

- `Rotate on Attack`
  
  - Actually Supports Dice so Nice (fixed underlying bug)
  
- `Rotate on Attack`
  
  - Actually Supports Dice so Nice (fixed underlying bug)
  

# [12.4.7](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.6...12.4.7) - PF2e Graphics better support

- `Rotate on Attack`
  
  - Supports Dice so Nice
  
- `Rotate on Attack`
  
  - Supports Dice so Nice
  

# [12.4.6](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.5...12.4.6) - Fixes and Rise of Graphics

- Fixed but with `Fire Emblem Crits` tha prevented them from firing
  
- `Basic Action Animation`
  
  - Removed this feature, ceding this ground to use [Pf2e Graphics](https://github.com/MrVauxs/pf2e-graphics) instead
  
- Removed `Animated Cartoon Spell Effects` as a recommended module (as it has been delisted)
  
- Fixed but with `Fire Emblem Crits` tha prevented them from firing
  
- `Basic Action Animation`
  
  - Removed this feature, ceding this ground to use [Pf2e Graphics](https://github.com/MrVauxs/pf2e-graphics) instead
  
- Removed `Animated Cartoon Spell Effects` as a recommended module (as it has been delisted)
  

# [12.4.5](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.4...12.4.5) - Updated dependencies

- Updated recommended dependencies for rerelease of animated spell fx cartoon

# [12.4.4](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.3...12.4.4) - Finishers Return

- Made Finisher text render over Critical animation but for real this time (@TheTenk)

# [12.4.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.2...12.4.3) - Finishers On Top

- Made Finisher text render over Critical animation (@TheTenk)

# [12.4.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.1...12.4.2) - Fix

- Fixed error with import

# [12.4.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.4.0...12.4.1) - V11 Fix

- Fixed error with V11 (@TheTenk)

# [12.4.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.3.1...12.4.0) - Start of some nice UI updates

- `Finishing Moves`
  
  - Added support for renaming items for the purposes of Finishing Moves with the menu item in the item's header (@TheTenk)
  - More to come soon TM
  
- `Version Support`
  
  - Opened up allowing use of module in V11 (should be compatible as long as sequencer is compatible between the two)
  
- `Finishing Moves`
  
  - Added support for renaming items for the purposes of Finishing Moves with the menu item in the item's header (@TheTenk)
  - More to come soon TM
  
- `Version Support`
  
  - Opened up allowing use of module in V11 (should be compatible as long as sequencer is compatible between the two)
  

# [12.3.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.3.0...12.3.1) - Fixing some Issues

- `Finishing Moves`
  
  - Fixed bug where finishing moves from players wouldn't show (@TheTenk)
  - Thanks to a suggestion (@TheTenk) made finishing moves show over critical hit FX
  
- `Criticals`
  
  - Synced the spawn time of critical hit elements so they activate as one
  - `Fire Emblem`
    - Made sure the elements of this critical appear in the correct order
    
  
- `General`
  
  - Fixed header of Shake on Attack Setting
  - Remigrated so that animations are triggered by the **player who created the message**
  
- `Finishing Moves`
  
  - Fixed bug where finishing moves from players wouldn't show (@TheTenk)
  - Thanks to a suggestion (@TheTenk) made finishing moves show over critical hit FX
  
- `Criticals`
  
  - Synced the spawn time of critical hit elements so they activate as one
  - `Fire Emblem`
    - Made sure the elements of this critical appear in the correct order
    
  
- `General`
  
  - Fixed header of Shake on Attack Setting
  - Remigrated so that animations are triggered by the **player who created the message**
  

# [12.3.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.2.1...12.3.0) - Feel the Attack

- **Attack Screen Shake**
  
  - Adds option to shake the screen when attacking (to add some punch)
  - Can be enabled for players, gms or both
  
- **Rotate on Attack**
  
  - Changed the Easing on rotate on attack to make it feel more responsive'
  
- **Misc**
  
  - refactored code a bit
  
- **Attack Screen Shake**
  
  - Adds option to shake the screen when attacking (to add some punch)
  - Can be enabled for players, gms or both
  
- **Rotate on Attack**
  
  - Changed the Easing on rotate on attack to make it feel more responsive'
  
- **Misc**
  
  - refactored code a bit
  

# [12.2.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.2.0...12.2.1) - Fix Fire Emblem Swing

- `Fire Emblem Crits`
  
  - Fixed fire emblem crit to actually move the whole screen
  
- `Fire Emblem Crits`
  
  - Fixed fire emblem crit to actually move the whole screen
  

# [12.2.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.1.1...12.2.0) - Some Fixes

- `Fire Emblem Crits`
  
  - Fixed bug with squashing an image that wasn't a square (@spen)
  
- `Damage Numbers`
  
  - Rewrote a lot of the code, ideally for a bit of optimization with performance
  
- `Backend Changes`
  
  - Versions now autopublish
  - Most animations now preload <3
  - Most animations now use async and awaits
  - user color is now grabbed properly using the `color.css` property
  - started work on the backend to give this module its own custom settings menu, but it'll probably be a bit till i get the time to do that work as it's involved
  
- `Fire Emblem Crits`
  
  - Fixed bug with squashing an image that wasn't a square (@spen)
  
- `Damage Numbers`
  
  - Rewrote a lot of the code, ideally for a bit of optimization with performance
  
- `Backend Changes`
  
  - Versions now autopublish
  - Most animations now preload <3
  - Most animations now use async and awaits
  - user color is now grabbed properly using the `color.css` property
  - started work on the backend to give this module its own custom settings menu, but it'll probably be a bit till i get the time to do that work as it's involved
  

# [12.1.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.1.0...12.1.1) - Dice So Nice Support: Electric Boogaloo

- Fixed bug where **Dice So Nice** support would stall out code on rolls with no dice (@Rigo)

# [12.1.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.0.3...12.1.0) - Dice So Nice Support

- Now waits on Dice So Nice roll for `Damage Numbers`, `Roll Numbers`, `Critical Animations`, and `Basic Action Animations`

# [12.0.3](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.0.2...12.0.3) - Fix On Apply Damage

- Fixed bug with On Apply Damage Application, *was missing a parameter* (@malkyn)

# [12.0.2](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.0.1...12.0.2) - Bug Swatter

- Fixed errors with **Damage Numbers** not processing targets properl (@malkyn)
- Fixed errors with **Shake Token** not chekcing properly if you even have tokenMagic Installed (@malkyn)

# [12.0.1](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/12.0.0...12.0.1) - Color Fixes

- Fixed issue with getting user color that caused Crit Animations & Finishing Moves to not work (@sasane)

# [12.0.0](https://github.com/ChasarooniZ/pf2e-rpg-numbers/compare/11.12.0...12.0.0) - V12 Support

- Should now support v12
  
- Changed most sequencers calls to `await`
  
  - Should help to fix performance issues + inconsistency
  
- Fixed issue with `feint` basic action animation
  
- Transitioned settings to use `requireReload` instead of custom function
  
- Known Bugs
  
  - **Damage Numbers** don't properly bounce, maybe an issue with Sequencer, looking into it
  
- Should now support v12
  
- Changed most sequencers calls to `await`
  
  - Should help to fix performance issues + inconsistency
  
- Fixed issue with `feint` basic action animation
  
- Transitioned settings to use `requireReload` instead of custom function
  
- Known Bugs
  
  - **Damage Numbers** don't properly bounce, maybe an issue with Sequencer, looking into it
  

# 11.12.0 - Token Turning Updates

- Turn on Token Attack *new options*
  
  - ***New Setting.*** Scale based on token size (scales how long it takes to turn based on the number of squares the token takes up)
    
    - *Must be enabled in the settings*
    
  - ***New setting.*** Rotation time (set how long it takes for the token to rotate)
    
  
- Turn on Token Attack *new options*
  
  - ***New Setting.*** Scale based on token size (scales how long it takes to turn based on the number of squares the token takes up)
    
    - *Must be enabled in the settings*
    
  - ***New setting.*** Rotation time (set how long it takes for the token to rotate)
    
  

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

# 11.9.12 - Healing Numbers

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
  - Added quality setting (scales the text quality) (@Things COuld Get Dicey)
  
- **Damage Numbers**
  
  - Changes the border color to a dark cyan when the only user that can see it is the GM (@Things COuld Get Dicey)
  - Fixed issue where disabling RPG Numbers doesn't disable them for `on Apply` (@A Helpful Drow)
  - Fixed Bug where sometimes numbers didn't generate due to issue with parsing of the type
  
- **Check Numbers**
  
  - Changes the border color to a dark cyan when the only user that can see it is the GM (@Things COuld Get Dicey)
  
- **Critical**
  
  - Fixes bug where Fire Emblem Crit started off screen
  
- **Token Shake**
  
  - Added new Optional Upgraded animation for token shake, using Token Magic
  - Removed the invisibility from old Token Shake (@A Helpful Drow)
  - Adds recommendation to install [Token Magic](https://foundryvtt.com/packages/tokenmagic/)
  - Fixed Token Shake causing tokens to turn invisible
  
- **Finishing Move**
  
  - Added Toolclip so that the tool makes more sense (@LiquidGabs)
  - Added setting to use Player Color instead of Red as the glow color
  - Added quality setting (scales the text quality) (@Things COuld Get Dicey)
  
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
    
  - **Note** **API IS IN EARLY PHASE AND IS SUBJECT TO CHANGE (to make it easier to use/better named etc.)**
    
  
- **Crit Animation**
  
  - Added Option to delay when critical effect appears (substitute for adding dice so nice support for now)
  
- **Bug Fixes**
  
  - Fixed bug where Finishing Moves controls wouldn't be shown to players
  
- **API Support**
  
  - Added API support for some functions, example macros to come when I get around to it
    
  - Access api like follows, with functions details below `game.pf2eRPGNumbers`
    
    - `damageNumbers.generate(dmgList, targetIds)` - Generate Damage Numbers
    - `damageNumbers.getDamageList(msg)` - Get damage list from message
    - `finishingMove.generate(text)` - Create finishing move text
    - `rollNumbers.generate({roll, outcome, token})` - Create Roll Text scroll`
    - `critAnimation.generate({token, critType})` - Create Crit Animation
    - `turnTokenAttack.generate(tokenObject, targetObject)` - Run Turn Token animation
    
  - **Note** **API IS IN EARLY PHASE AND IS SUBJECT TO CHANGE (to make it easier to use/better named etc.)**
    
  
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

# 11.9.5 - Quick Fixes

- Checks for null Persona 5 image

# 11.9.4 Crit Config + Improvements

- **Persona Crit Settings**
- New settings for Persona Crit animations `Crit Offset X`, `Crit Offset Y`, `Crit Scale`, `Crit Rotation`
  ![image](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/7eb4f14a-a0a4-4c0a-8e28-e49d8ac3c883)
- Actually fixed bug caused by spelling mistake for criticals on PCs
- **Persona Crit Settings**
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
    
    - *Note: By default you will need to toggle on every time you want to use a finishing move*
    
  - ![finishing Move](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/1b085475-4d4a-4dfa-999d-e9efc03d1ff7)
    
  
- **Tour**
  
  - Added tour for this, and every major update from here on to give info on the feature
  
- Code Stuff
  
  - Refactored a lot of stuff, reformatted a lot of stuff
  - Fixed bug with reading -numbers when splitting up text for damage roll
  
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
    
    - *Note: By default you will need to toggle on every time you want to use a finishing move*
    
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
  
- **Screen Shake Feature**
  
  - Adds new option to shake the screen for the token owner when taking damage
  - Options to set scaling etc.
    ![screen shake example](https://github.com/ChasarooniZ/pf2e-rpg-numbers/assets/79132112/923e8814-be6f-424b-82b2-bf23d317f465)
  

# 11.4.0 Checks

- Added option to show check results
  
  - Should only ever show rolls the user has access to per user
  - Can toggle between numbers and the actual text
  
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
  
  - Damage will no longer show if the target is `unnoticed` or `undetected` in that module for a particular user
  
- Added a check to support Pf2e perception
  
  - Damage will no longer show if the target is `unnoticed` or `undetected` in that module for a particular user
  

# 11.1.1 Make a Wish (Hidden check + GM Only mode)

- Added a check if token is hidden, if so, should only play for GMs
  
  - Planning to add support for PF2E Perception's visibility as well
  
- Added a GM only option so that you can enjoy the numbers all to yourself
  
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
  
- Damage Numbers should now pop up on roll
  
- Damage numbers only appear over the first target unless you have **PF2E Target Damage** installed
  
- Unsure how this module works with other clients
  
- TODO
  
  - Settings for module
  - Color options
  - performance optimization
  - Text options
  - Crit Message idea
  

## 13.7.8 - 2025-10-08

- **Updated**
  - Updated French translation (🌐 @rectulo)
  

## 13.7.7 - 2025-10-07

- `Crit`
  - Adds detection for creatures with immunity to critical hits (💻 @Bullesta)
  - Adds a Bypass Immunity toggle in the Critical Hit settings (It’s enabled by default)
  

## 13.7.6 - 2025-10-02

- **Updated**
  - `Darkest Dungeon: Stress / Relief`
    - Fixed bug where all tokens show stress/relief animation (🐛 @Simon Magnus)
    
  

## 13.7.5 - 2025-09-28

- **Updated**
  - `Darkest Dungeon: Stress / Relief`
    
    - Updated so that tokens selected are only those in combat if there is a combat
    
  - Updated French translation (🌐 @rectulo)
    
  

## 13.7.4 - 2025-09-04

- **Updated**
  - Added extra/packing for the packs in this module
    
  - `Token Shake on Damaged`
    
    - Updated the enable text to include a warning about the possibility of tokens turning invisible
    
  - `Critical`
    
    - Fix some logic for the `Show On...` settings (🐛 @Fumu)
    
  

## 13.7.2 - 2025-08-25

- **Updated**
  - `VS Animation`
    
    - Added explicit cancel button
    - Added tooltip to animation question itself to make it clearer how to change the default
    - Setup autofocus on the enemy team name input
    
  - `Localization`
    
    - Added localization options for settings menu button
    - Updated French translation (@rectulo)
    
  

## 13.6.0 - 2025-08-12

- **New**
  
  - Added handling for `PF2e Toolbelt` rolls and rerolls
  - `Critical`
    - Added `Art Delay` setting to delay the art portion
    - Added `Duration` setting to set the total effect duration
    
  
- **Updated**
  
  - Required **Genga** version to `0.7.3`
  

## 13.5.0 - 2025-08-07

- **New**
  
  - Added support for `Pf2e Visioner` for visibility
  
- **Updated**
  
  - For the changelog am dropping linking the version diff in the changelog, if you want to check version differences you can compare them from the release section
  - I apologize to those who might have used this 🙏 (I just lost patience for it)
  

## 13.4.7 - 2025-08-06

- **Updated**
  - `Darkest Dungeon Crisis/Virtue` - Fixed issue where users filter was not being passed (🐛 @TheTenk)
  - To fix this updated required **Genga** version to `0.7.2`
  - Updated French translation (@rectulo)
  

## 13.4.6 - 2025-08-02

- **Updated**
  - `Target Dodges`
    - Fixed last issue causing the `Bounce Off` animation to fail (🐛 @YoSoy-Ed)
    
  

## 13.4.5 - 2025-08-01

- **Updated**
  - `Target Dodges`
    - Fixed longstanding issue causing the `Bounce Off` animation to fail
    
  

## 13.4.4 - 2025-08-01

- **Updated**
  - Fixes issue where actor crit settings aren't scrollable
  

## 13.4.2 - 2025-07-28

- **Updated**
  - Fixed issue with logic that causes update messages to not spam
  - Fixed issue causing `Dodge On Miss` to not work properly
  

## 13.4.1 - 2025-07-26

- Stop whisper spamming on updates

## 13.4.0 - 2025-07-25

- **New**
  
  - `Darkest Dungeon: Stress / Relief`
    
    - Adds a new animation that will either play the stress or relief icon on friendly tokens based on either Critical Success or Failures
    
  - `Update Messages`
    
    - Occassionally will have update messages with some patch notes (General Reserved for Feature releases and not patches)
    
  
- **Updated**
  
  - Updated French translation (@rectulo)
  - Updated Polish translation (@Lioheart)
  - Updated `Genga` requirement to `0.7.1`
    <img width="882" height="721" alt="flc_YgSj7FcGZl" src="https://github.com/user-attachments/assets/751fed45-1f0b-4e2d-a323-5757d30314df" />
  
  

https://github.com/user-attachments/assets/da5e49f4-f986-4d13-bf39-bc399ee5bde7

https://github.com/user-attachments/assets/f78a60d9-0919-4c44-a061-f3057151fa63

https://github.com/user-attachments/assets/31a7f94a-5e01-4874-901d-caf312120496

## 13.3.0 - 2025-07-23

- **New**
  
  - `Critical`
    - Added two new critical animations
      - `Darkest Dungeon: Virtue`
      - `Darkest Dungeon: Crisis`
      
    
  
- **Updated**
  
  - Updated `Genga` requirement to `0.6.0`
  

https://github.com/user-attachments/assets/d30e15ac-7a42-4b42-9f6a-c6f14712a2ed

https://github.com/user-attachments/assets/898c2a38-14e1-4e91-a6a3-68b6b24e05c4

## 13.2.3 - 2025-07-15

- Fixes `Token Rotate on Attack` not working

## 13.2.2 - 2025-07-10

- Fixes `Token Shake on Damage` not working (🐛 @Razytos)

## 13.2.1 - 2025-06-27

- `Updated`
  
  - **Critical**
    - Fixed case where criticals would trigger on flat checks (@TheTenk)
    
  
- `Updated`
  
  - **Critical**
    - Fixed case where criticals would trigger on flat checks (@TheTenk)
    
  

## 13.2.0 - 2025-06-27

- `Updated`
  
  - This module now requires `Genga` (my system agnostic animation module)
    
    - This will allow an easier animation creation workflow, and allow possible future expansion of some features to other systems
    - The code for many animations has been moved to that repo
    
  - **VS Animation**
    
    - Updated team name dialog to `DialogV2`
    
  
- `Updated`
  
  - This module now requires `Genga` (my system agnostic animation module)
    
    - This will allow an easier animation creation workflow, and allow possible future expansion of some features to other systems
    - The code for many animations has been moved to that repo
    
  - **VS Animation**
    
    - Updated team name dialog to `DialogV2`
    
  

## 13.1.1 - 2025-06-19

- Removed vestigial elements of the settings menu

## 13.1.0 - 2025-06-18

- `Updated`
  
  - **Menus**
    
    - `Actor Settings Menu` has been updated to AppV2
    - `Module Settings Menu` has been updated to AppV2
    
  - **Token Shake**
    
    - Settings for token shake have been simplified
    - Shaking now scales off `Max HP` by default
    
  - **Dodge on Miss**
    
    - Made it so the original tokens slowly fade in and out as they dodge (@nyths)
    
  - **Langues**
    
    - Updated `Polish` translation (@Lioheart)
    
  
- `Updated`
  
  - **Menus**
    
    - `Actor Settings Menu` has been updated to AppV2
    - `Module Settings Menu` has been updated to AppV2
    
  - **Token Shake**
    
    - Settings for token shake have been simplified
    - Shaking now scales off `Max HP` by default
    
  - **Dodge on Miss**
    
    - Made it so the original tokens slowly fade in and out as they dodge (@nyths)
    
  - **Langues**
    
    - Updated `Polish` translation (@Lioheart)
    
  

## 13.0.1 - 2025-06-10

- Fixed minor warnings that showed for `filePicker` and `rangeFinder` handlebars templates
- Fixed issue where menus wouldn't open

## 13.0.0 - 2025-06-09

- Updated to v13

## 12.10.5 - 2025-05-19

- Now properly handle when default ownership is `owner` that fixes edge case for `Screen Shake` and `Screen Shake on Attack` (🐛 @ZerthofGith)

## 12.10.4 - 2025-05-08

- Updated `Polish` translation (@Lioheart)

## 12.10.3 - 2025-05-06

- Allowed for hiding the header button text
- Fixed possible bug with `vs animation` not starting
- Added a way to cancel out the `vs animation` when you click cancel on the name input dialog

## 12.10.2 - 2025-04-29

- Fixed wrong text being used for `VS Animation`'s `Duration` setting
- Updated `French` translation (@rectulo)

## 12.10.1 - 2025-04-29

- **Updates**
  
  - `VS Animation`
    
    - Added better handling for visibility and outlines (🐛 @RoiLeaf)
      
    - Creatures that are `undetected`, `unnoticed`, or marked as `hidden` in the combat tracker will not be shown in the animation
      
      - Note: This will check if the creature also has these conditions from **any** creature
      
    - Creatures that are `hidden` or `concealed` will be displayed in Silhouette
      
    - Note: The `pf2e perception` handling atm is very basic as it will only check for the 'Presence of the condition' and not specifically whether it is against to a relevant token
      
    
  - `Languages`
    
  - Updated `Polish` translation (@Lioheart)
    
  
- **Updates**
  
  - `VS Animation`
    
    - Added better handling for visibility and outlines (🐛 @RoiLeaf)
      
    - Creatures that are `undetected`, `unnoticed`, or marked as `hidden` in the combat tracker will not be shown in the animation
      
      - Note: This will check if the creature also has these conditions from **any** creature
      
    - Creatures that are `hidden` or `concealed` will be displayed in Silhouette
      
    - Note: The `pf2e perception` handling atm is very basic as it will only check for the 'Presence of the condition' and not specifically whether it is against to a relevant token
      
    
  - `Languages`
    
  - Updated `Polish` translation (@Lioheart)
    
  

## 12.9.20 - 2025-04-08

- Updated `Polish` translation (@Lioheart)
- Fixed issue where `Critical Animation` setting for disabling animation for user setting wasn't working. (**Note** to update this, the criticals need to be toggle on, saved, then off again) (🐛 @GuitarGuyNick)

## 12.9.19 - 2025-03-30

- Add setting to make sounds play on `PC`, `NPC`, or `Both`
- Changed tooltips to display on the left for easier settings navigation
