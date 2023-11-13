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
