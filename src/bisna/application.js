var Bisna = (function () {

    var moduleList   = {},
        instanceList = {};

    return {
        /**
         * Register a new module
         *
         * @param string    name         Module name
         * @param function  constructor  Module constructor
         */
        register: function (name, constructor)
        {
            moduleList[name] = constructor;
        },

        /**
         * Resolve a module name, retrieving a module instance
         *
         * @param string    name    Module name
         *
         * @return object   Module instance
         */
        resolve: function (name)
        {
            if ( ! Bisna.contains(name)) {
                throw new Error('Unable to locate module "' + name + '".');
            }

            if (typeof instanceList[name] !== 'undefined') {
                return instanceList[name];
            }

            instanceList[name] = moduleList[name].call({}, Bisna);

            if (typeof instanceList[name].init === 'function') {
                instanceList[name].init();
            }

            return instanceList[name];
        },

        /**
         * Check module existance
         *
         * @param string    name    Module name
         *
         * @return boolean  Module existance
         */
        contains: function (name)
        {
            return moduleList.hasOwnProperty(name);
        },

        /**
         * Dispose a Module instance
         *
         * @param string    name    Module name
         */
        dispose: function (name)
        {
            if (typeof instanceList[name] !== 'undefined') {
                if (typeof instanceList[name].dispose === 'function') {
                    instanceList[name].dispose();
                }

                instanceList[name] = null;
                delete instanceList[name];
            }

            moduleList[name] = null;
            delete moduleList[name];
        }
    };

})();