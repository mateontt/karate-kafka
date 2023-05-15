function fn() {
  function read(file) {
    try {
      return karate.read(file);
    } catch (e) {
      karate.log("File not found: " + file);
      return {};
    }
  }

  // Hide sensitive data:
  var LM = Java.type('com.inditex.finc.hosieser.karate.CustomHttpLogModifier');
  karate.configure('logModifier', new LM());

  var config_file = read(`classpath:environments/${karate.env}/config-${karate.env}.yml`);
  
  karate.set(config_file);

  return { 
    utils: karate.call('classpath:karate-utils.js'),
  };
}
