Bisna.register('model', function (Bisna) {

    /**
     * Create and initialize a new Model instance
     *
     * @param attributes    Object containing attributes or initializer function
     *
     * @throws Error
     *
     * @return Model
     */
    var Model = function (attributes)
    {
        switch (typeof attributes) {
            case 'object':
                this.set(attributes);
                break;

            case 'function':
                attributes.apply(this);
                break;

            default:
                throw new Error('Invalid Model constructor call.');
        }
    };

    Model.prototype = {
        /**
         * Define property value
         *
         * @param name    Property name
         * @param value   Property value
         *
         * @return Model
         */
        set: function (name, value)
        {
            var EventManager = Bisna.resolve('event-manager'),
                propertyList = name,
                propertyName,
                eventData;

            // Turn into a fake multiple set
            if (typeof name !== 'object') {
                propertyList = {name: value};
            }

            for (propertyName in propertyList) {
                if ( ! propertyList.hasOwnProperty(propertyName)) {
                    continue;
                }

                // Create event data information
                eventData = {
                    name:     propertyName,
                    oldValue: this.get(propertyName),
                    value:    propertyList[propertyName]
                };

                // Abort default behavior if event is preventing
                if ( ! (
                    EventManager.dispatchEvent(propertyName + ':set', eventData, this) &&
                    EventManager.dispatchEvent('set', eventData, this)
                )) {
                    continue;
                }

                this[propertyName] = eventData.value;

                // Only dispatch update event on value change
                if (eventData.value !== eventData.oldValue) {
                    EventManager.dispatchEvent(propertyName + ':change', eventData, this);
                    EventManager.dispatchEvent('change', eventData, this);
                }
            }

            return this;
        },

        /**
         * Retrieve property value
         *
         * @param name  Property name
         *
         * @return mixed
         */
        get: function (name)
        {
            var propertyValue = this[name];

            if (typeof propertyValue === 'function') {
                return propertyValue.call(this);
            }

            return propertyValue;
        },

        /**
         * Check property existance
         *
         * @param name  Property name
         *
         * @return boolean
         */
        has: function (name)
        {
            return this.hasOwnProperty(name);
        }
    };

    return {
        /**
         * Create Model instance
         *
         * @param attributes    Object containing attributes or initializer function
         *
         * @return Model        Model instance
         */
        create: function (attributes)
        {
            return new Model(attributes);
        },

        /**
         * Register a Model plugin
         *
         * @param name      Plugin name
         * @param handler   Plugin handler function
         */
        registerPlugin: function (name, handler)
        {
            Model.prototype[name] = handler;
        }
    };
});