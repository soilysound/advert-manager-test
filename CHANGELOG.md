## UNRELEASED
### Changed
- Made a ui-advert-slot partial
- Created two methods, one for the slot and one for the manager
- Overloaded `window.adSlots.push` with our own method in the manager component; for when a slot enters the dom after initial page load (for example in live-blogs when you click load-more). The overloaded method will then pass the relevant arguments to another method that renders the ads.