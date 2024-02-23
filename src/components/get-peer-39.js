export function getPeer39(config) {
  console.log('load Peer39');
  return new Promise((resolve, reject) => {
    // check CMP, load peer39 and get data here
    config.targeting.p39_sky = 'whatever-from-peer39';
    resolve();
  });
}