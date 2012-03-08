Bisna.register('jquery', (function ($, document) {
    return function (Bisna) {
        var $document = $(document);

        return {
            getJquery: function () {
                return $;
            },

            getDocument: function ()
            {
                return $document;
            }
        };
    };
})(jQuery, document));