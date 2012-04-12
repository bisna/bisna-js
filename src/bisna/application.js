var Bisna = (function () {

    var moduleList   = {},
        instanceList = {};

    return {
        /**
         * Register a new module
         *
         * @param name         Module name
         * @param constructor  Module constructor function
         */
        register: function (name, constructor)
        {
            moduleList[name] = constructor;
        },

        /**
         * Unregister an existing module
         *
         * @param name  Module name
         */
        unregister: function (name)
        {
            moduleList[name] = null;

            delete moduleList[name];
        },

        /**
         * Check module existance
         *
         * @param name      Module name
         *
         * @return boolean  Module existance
         */
        isRegistered: function (name)
        {
            return moduleList.hasOwnProperty(name);
        },

        /**
         * Resolve a module name, retrieving a module instance
         *
         * @param name      Module name
         *
         * @return object   Module instance
         */
        resolve: function (name)
        {
            if (typeof instanceList[name] !== 'undefined') {
                return instanceList[name];
            }

            instanceList[name] = moduleList[name].call({name: name}, Bisna);

            if (typeof instanceList[name].init === 'function') {
                instanceList[name].init();
            }

            return instanceList[name];
        },

        /**
         * Dispose a Module instance
         *
         * @param name    Module name
         */
        dispose: function (name)
        {
            if (typeof instanceList[name] === 'undefined') {
                return;
            }

            if (typeof instanceList[name].dispose === 'function') {
                instanceList[name].dispose();
            }

            instanceList[name] = null;

            delete instanceList[name];
        },

        /**
         * Check module instance existance
         *
         * @param name      Module name
         *
         * @return boolean  Module instance existance
         */
        contains: function (name)
        {
            return instanceList.hasOwnProperty(name);
        },

        /**
         * Extend a child class from a parent class
         *
         * @param child     Child class mapping
         * @param parent    Parent class mapping
         */
        extend: function (child, parent)
        {
            var tmp = function () {};

            tmp.prototype = parent.prototype;

            child.superClass = parent.prototype;
            child.prototype = new tmp();

            child.prototype.constructor = child;
        }
    };

})();