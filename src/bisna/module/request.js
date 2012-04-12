Bisna.register('request', function (Bisna) {

    /**
     * Create and initialize a new Request instance
     *
     * @param method    Request method
     * @param url       Request URL
     *
     * @return Request
     */
    var Request = function (method, url)
    {
        this.method = method;
        this.url    = url;
    };

    Request.prototype = {
        /**
         * Retrieve the Request method.
         *
         * @return string
         */
        getMethod: function ()
        {
            return this.method;
        },

        /**
         * Retrieve the Request URL.
         *
         * @return string
         */
        getUrl: function ()
        {
            return this.url;
        },

        /**
         * Define the Request data type.
         *
         * @param dataType    Request data type string
         */
        setDataType: function (dataType)
        {
            dataType = String(dataType).toLowerCase();

            switch (dataType) {
                case 'xml':
                    this.dataType    = dataType;
                    this.contentType = 'application/xml; charset=utf-8';
                    break;

                case'json':
                    this.dataType    = 'json';
                    this.contentType = 'application/json; charset=utf-8';
                    break;

                default:
                    throw new Error('Unsupported data type: ' + dataType);
            }
        },

        /**
         * Retrieve the Request data type.
         *
         * @return string
         */
        getDataType: function ()
        {
            return this.dataType;
        },

        /**
         * Retrieve the Request data.
         *
         * @param data Request data
         */
        setData: function (data)
        {
            this.data = data;
        },

        /**
         * Retrieve the Request data.
         *
         * @return mixed
         */
        getData: function ()
        {
            return this.data;
        },

        /**
         * Send the Request.
         *
         * @param prefix Request prefix used for Events
         *
         * @return jqXHR
         */
        send: function (prefix)
        {
            var EventManager = Bisna.resolve('event-manager'),
                Jquery       = Bisna.resolve('jquery'),
                config       = this.compile(prefix);

            if (
                Eventmanager.dispatchEvent('async:load:start', null) &&
                EventManager.dispatchEvent(prefix + ':loading', null)
            ) {
                return Jquery.ajax(config);
            }

            return null;
        },

        /**
         * Compile Request information.
         *
         * @param prefix Request prefix used for Events
         *
         * @return object
         * 
         * @internal
         */
        compile: function (prefix)
        {
            var EventManager = Bisna.resolve('event-manager'),
                config = {};

            config.type        = this.method;
            config.url         = this.uri;
            config.contentType = this.contentType;
            config.dataType    = this.dataType;
            config.data        = this.data;

            config.success = function (response, textStatus, jqXHR) {
                var body = {
                    response:     response,
                    textStatus:   textStatus,
                    jqXHR:        jqXHR,
                    originalData: config.data
                };

                EventManager.dispatchEvent('async:load:end', null);
                EventManager.dispatchEvent(prefix + ':success', body);
            };

            config.error = function (jqXHR, textStatus, errorThrown) {
                var body = {
                    textStatus:   textStatus,
                    jqXHR:        jqXHR,
                    errorThrown:  errorThrown,
                    originalData: config.data
                };

                EventManager.dispatchEvent('async:load:end', null);
                EventManager.dispatchEvent(prefix + ':error', body);
            };

            return config;
        }
    };

    return Request;

});
