Bisna.register('entity-service-generator', function (Bisna) {

    var EntityService,
        Request,
        normalizeUrl;

    /**
     * Normalize an URL according to REST conventions.
     *
     * @param url   Request URL
     * @param id    Optional Requested object identifier
     *
     * @return string
     */
    normalizeUrl = function (url, id)
    {
        var normalized = (typeof id === 'undefined') ? url : id;

        if (normalized.indexOf(url) < 0) {
            normalized = new String(url);
            normalized = (normalized.substring(normalized.length - 2) === '/') ? url + id : url + '/' + id;
        }

        return normalized;
    }

    /**
     * Create and initialize a new EntityService instance
     *
     * @param prefix EntityService prefix
     *
     * @return EntityService
     */
    EntityService = function (prefix)
    {
        this.prefix = prefix;
    };

    EntityService.prototype = {
        filter: function (criteria, orderBy)
        {
            var request = new Request('GET', this.getEndpoint()),
                data    = {};

            if (typeof criteria !== 'undefined' && criteria !== null) {
                data = criteria;
            }

            if (typeof orderBy !== 'undefined' && orderBy !== null) {
                data.orderby = orderBy;
            }

            request.setDataType('json');
            request.setData(data);

            return request.send(this.prefix + ':filter');
        },

        get: function (id)
        {
            var request = new Request('GET', normalizeUrl(this.getEndpoint(), id));

            request.setDataType('json');
            request.setData({});

            return request.send(this.prefix + ':get');
        },

        remove: function (id)
        {
            var request = new Request('GET', normalizeUrl(this.getEndpoint(), id));

            request.setDataType('json');
            request.setData({});

            return request.send(this.prefix + ':remove');
        },

        post: function (entity)
        {
            var request;

            if (typeof entity['id'] !== 'undefined') {
                throw new Error('Entity ID should not be set.');
            };

            request = new Request('POST', this.getEndpoint());

            request.setDataType('json');
            request.setData(entity);

            return request.send(this.prefix + ':post');
        },

        put: function (entity)
        {
            var request;

            if (typeof entity['id'] === 'undefined') {
                throw new Error('Entity ID must be set.');
            }

            request = new Request('PUT', normalizeUrl(this.getEndpoint(), entity['id']));

            request.setDataType('json');
            request.setData(entity);

            return request.send(this.prefix + ':put');
        },

        /**
         * Create a new Entity instance
         *
         * @return Entity
         */
        newInstance: function (attributes)
        {
            var Entity = this.getEntity();

            return new Entity(attributes);
        }
    };

    return {
        /**
         * Initialize the Module instance.
         *
         */
        init: function ()
        {
            Request = Bisna.resolve('request');
        },

        /**
         * Generate EntityService class mapping
         *
         * @param klass EntityService custom methods
         *
         * @return EntityService
         */
        generate: function (klass)
        {
            Bisna.extend(klass, EntityService);

            return klass;
        }
    };

});