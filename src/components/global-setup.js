export function globalSetUp(config) {
  console.log('global setup', config);
  return new Promise((resolve) => {
    Object.entries(config.targeting).forEach(([key, value]) => {
      googletag.cmd.push(() => {
        googletag.pubads().setTargeting(key, value);
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
    });

    resolve();
  })
}
