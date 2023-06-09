function fn() {

    const utils = {};
    /**
     * Reads a testFile and meges json contents with base files.
     * @param {string} file
     */
    utils.readTestData = (file) => {
        var folder = file.substring(0, file.lastIndexOf('/')+1);
        var baseName = file.substring(file.lastIndexOf('/')+1, file.lastIndexOf('.'))
        var extension = file.substring(file.lastIndexOf('.'), file.length);
        var tokens = baseName.split('_');
        // karate.log('folder', folder, 'baseName', baseName, 'extension', extension, 'tokens', tokens)
        var files = [file];
        while (tokens.pop() && tokens.length > 0) {
            files.push(folder + tokens.join('_') + extension);
        }
        files.push(folder + 'baseRequest' + extension);
        files = files.reverse();
        // karate.log('files', files)

        var testData = utils.merge(
            ...files.map(function(file) {
                try {
                    return karate.read(file);
                } catch (e) {
                    return null;
                }
            })
        );

        // var testData = utils.merge(
        //     ...files.map(function(file) {
        //         var fileObject = null;
        //         try {
        //             fileObject = karate.read(file);
        //         } catch (e) {
        //             fileObject = null;
        //         }
        //         // Throw error if file does not exist:
        //         if (fileObject != null) {
        //             return fileObject;
        //         }
        //         else {
        //             throw "YAML data file has not been correctly read. Pleade, review file path.";
        //         }
        //     })
        // );
        return testData;
    };

    utils.isArray = (array) => {
        // karate.log('isArray', ({}).toString.call(array))
        return Array.isArray(array) || ({}).toString.call(array).indexOf('Array') >= 0;
    }
    
    /**
     *
     * @param {*} objects
     */
    utils.merge = (...objects) => {
        // karate.log('merge', objects)
        if (objects == null) {
            return null;
        }
        if (karate.sizeOf(objects) <= 1) {
            return objects[0] || objects || {};
        }
        if(!utils.isArray(objects)) {
        	objects = new Array(objects);
        }
        
        objects = objects.filter(function(obj) {
            return obj != null;
        });
        // var target = objects.shift();
        var target = {};
        (objects || []).forEach(function (source) {
            utils._deepMerge(target, source);
        });

        return target;
    };

    utils._deepMerge = (target, source) => {
        if (typeof source === 'object') {
            karate.keysOf(source).forEach(function (key) {
                if (utils.isArray(source[key]) || utils.isArray(target[key])) {
                    target[key] = target[key] || [];
                    if (target[key].concat) {
                        target[key] = target[key].concat(source[key]);
                    } else {
                        target[key].addAll(source[key]);
                    }
                }
                else if (target[key] && source[key] !== null && typeof source[key] === 'object') {
                    utils._deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            });
        }
    }

    utils.replaceExpressions = (source) => {
        // ex: replaces values in source of the form #(storeId) with values.storeId
        var callback = function (leafValue) {
            if (typeof leafValue === 'string') {
                var replaced = leafValue;
                const EXPRESSION_REGEX = /#\(([\w\.]+)\)/gm;
                while ((m = EXPRESSION_REGEX.exec(leafValue)) !== null) {
                    replaced = replaced.replace(m[0], karate.get(m[1], '#(' + m[1] + ')'));
                }
                return replaced;
            }
            return leafValue;
        }
        return utils.manipulateLeafValues(source, callback);
    }
        
    utils.manipulateLeafValues = (source, callback) => {
        if (utils.isArray(source)) {
            source.forEach(function(item, index) {
                source[index] = utils.manipulateLeafValues(item, callback);
            });
        }
        else if (typeof source === 'object') {
            (karate.keysOf(source) || []).forEach(function(key) {
                if (source[key] !== null && typeof source[key] === 'object') {
                    utils.manipulateLeafValues(source[key], callback);
                } else {
                    source[key] = callback(source[key]);
                }
            });
        } else {
            source = callback(source);
        }
        return source;
    }

    utils.handleGrpcRequestData = (source) => {
        var target = {};
        if (utils.isArray(source)) {
            target = karate.map(source, function(item) { return utils.handleGrpcRequestData(item); });
        } else if (typeof source === 'object') {
            karate.keysOf(source).forEach(function(key) {
                if (typeof source[key] === 'object') {
                    target[key] = utils.handleGrpcRequestData(source[key]);
                } else if (key.endsWith('*')) {
                    target[key.replace(/\*$/, '')] = source[key];
                } else {
                    target[key] = { value: source[key] };
                }
            });
        } else {
            target = { value: source };
        }
        return target;
    }

    utils.handleGrpcResponseData = (source, target) => {
        target = target || source.payload || source
        if (typeof source === 'object'){
            if (utils.isArray(source)){
                source.forEach(function(object, index) {
                    karate.keysOf(object).forEach(function (key) {
                        if (typeof object[key] === 'object' 
                            && 'value' in object[key] 
                            && karate.keysOf(object[key]).length ==1) {
                            // karate.log("Objeto array", object[key] + "clave:", key);
                            // karate.log("Valor de objeto:", (object[key].value));
                            target[index][key] = object[key].value;
                        }
                        else {
                            target[index][key] = object[key];
                            utils.handleGrpcResponseData(object[key],  target[index][key]);                           
                        }                      
                    });
                });
            }
            else {
                karate.keysOf(source).forEach(function (key) {
                    if (typeof source[key] === 'object' 
                        && 'value' in source[key] 
                        && karate.keysOf(source[key]).length == 1){
                        //karate.log("Valor source", source[key], "con clave ", key);
                        target[key] = source[key].value;
                    }
                    else {
                        target[key] = source[key];
                        utils.handleGrpcResponseData(source[key], target[key]);
                    }
                });
            }
        }
        //karate.log("Target final:" , target);
        return target;
    }

    utils.dateTime2Timestamp = (datetime) => {
        console.log (datetime);
        const toTimestamp = (datetime) => {  
            const dt = Date.parse(datetime);  
            console.log (dt);
            return dt
        }  
        //console.log(toTimestamp('02/13/2020 23:31:30'));
    
    }

   

    return utils;
}
