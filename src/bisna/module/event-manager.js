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
         * @param string    type    Event type
         * @param function  handler Event handler function
         * @param object    scope   Event scope
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
         * @param string    type    Event type
         * @param function  handler Event handler function
         */
        removeEventListener: function (type, handler)
        {
            var listenerTypeList,
                index, length;

            if (typeof listenerList[type] !== 'undefined') {
                listenerTypeList = listenerList[type];

                for (index = 0, length = listenerTypeList.length; index < length; index++) {
                    if (listenerTypeList[index].handler === handler) {
                        listenerTypeList.splice(index, 1);

                        break;
                    }
                }

                if (listenerTypeList.length === 0) {
                    listenerList[type] = null;
                    delete listenerList[type];
                }
            }
        },

        /**
         * Check existance of an event listener
         *
         * @param string    type    Event type
         *
         * @return boolean  Event listener existance
         */
        hasListener: function (type)
        {
            return (typeof listenerList[type] !== 'undefined' && listenerList[type].length > 0);
        },

        /**
         * Dispatch an event
         *
         * @param string    type    Event type
         * @param object    data    Event data
         * @param object    target  Event target
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

            if (typeof listenerList[event.type] !== 'undefined') {
                listenerTypeList = listenerList[event.type];

                for (index = 0, length = listenerTypeList.length; index < length; index++) {
                    if (event.stopPropagation) {
                        break;
                    }

                    event.currentTarget = listenerTypeList[index].scope;

                    listenerTypeList[index].handler(event);
                }
            }

            return ! event.preventDefault;
        }
    };
});