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
