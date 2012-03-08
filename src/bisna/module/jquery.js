Bisna.register('jquery', (function ($, document) {
    return function (Bisna) {
        var $document = $(document);

        return {
            /**
             * Retrieve jQuery class
             *
             * @return object   jQuery class
             */
            getJquery: function () {
                return $;
            },

            /**
             * Retrieve jQuery-fied DOMDocument element
             *
             * @return object   DOMDocument jquery-fied
             */
            getDocument: function ()
            {
                return $document;
            }
        };
    };
})(jQuery, document));