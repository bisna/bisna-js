Bisna.register('event-manager', function (Bisna) {

    var listenerList = null;

    return {
        /**
         * Initialize Module instance
         *
         */
        init: function ()
        {
            listenerList = {};
        },

        /**
         * Dispose Module instance
         *
         */
        dispose: function ()
        {
            var type;

            for (type in listenerList) {
                listenerList[type] = null;

                delete listenerList[type];
            }

            listenerList = null;
        },

        /**
         * Add a new event listener
         *
         * @param type    Event type
         * @param handler Event handler function
         * @param scope   Event scope object
         */
        addEventListener: function (type, handler, scope)
        {
            scope = scope || this;

            if (typeof listenerList[type] === 'undefined') {
                listenerList[type] = new Array();
            }

            listenerList[type].push({
                handler: handler,
                scope:   scope
            });
        },

        /**
         * Remove an existing event listener
         *
         * @param type    Event type
         * @param handler Event handler function
         */
        removeEventListener: function (type, handler)
        {
            var listenerTypeList,
                index, length;

            if (typeof listenerList[type] === 'undefined') {
                return this;
            }

            listenerTypeList = listenerList[type];

            for (index = 0, length = listenerTypeList.length; index < length; index++) {
                if (listenerTypeList[index].handler !== handler) {
                    listenerTypeList.splice(index, 1);

                    break;
                }
            }

            if (listenerTypeList.length === 0) {
                listenerList[type] = null;

                delete listenerList[type];
            }

            return this;
        },

        /**
         * Check existance of an event listener
         *
         * @param type  Event type
         *
         * @return boolean  Event listener existance
         */
        hasEventListener: function (type)
        {
            return (typeof listenerList[type] !== 'undefined' && listenerList[type].length > 0);
        },

        /**
         * Dispatch an event
         *
         * @param type    Event type
         * @param data    Event data object
         * @param target  Event target object
         *
         * @return boolean  Flag referring if event is preventing default action
         */
        dispatchEvent: function (type, data, target)
        {
            var listenerTypeList,
                event = {
                    type:            type,
                    target:          target || this,
                    currentTarget:   this,
                    userData:        data || null,
                    stopPropagation: false,
                    preventDefault:  false
                },
                index, length;

            if (typeof listenerList[event.type] === 'undefined') {
                return true;
            }

            listenerTypeList = listenerList[event.type];

            for (index = 0, length = listenerTypeList.length; index < length; index++) {
                if (event.stopPropagation) {
                    break;
                }

                event.currentTarget = listenerTypeList[index].scope;

                listenerTypeList[index].handler(event);
            }

            return ! event.preventDefault;
        }
    };
});