export function getCovatic(config) {
  console.log('load Covatic');
  return new Promise((resolve, reject) => {
    // check CMP, load covatic and get data here
    config.targeting.covatic_sky = 'whatever-from-covatic';
    resolve();
  });

}