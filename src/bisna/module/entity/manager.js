Bisna.register('entity-manager', function (Bisna) {

    var ServiceGenerator,
        EntityGenerator;

    return {
        /**
         * Initialize Module instance
         *
         */
        init: function ()
        {
            ServiceGenerator = Bisna.resolve('entity-service-generator');
            EntityGenerator  = Bisna.resolve('entity-entity-generator');
        },

        /**
         * Generate Entity Service mapping
         *
         * @param prototype EntityService custom methods
         *
         * @return EntityService
         */
        generateService: function (prototype)
        {
            return ServiceGenerator.generate(prototype || {});
        },

        /**
         * Generate Entity class mapping
         *
         * @param prototype Entity custom methods
         *
         * @return Entity
         */
        generateEntity: function (prototype)
        {
            return EntityGenerator.generate(prototype || {});
        }
    };

});