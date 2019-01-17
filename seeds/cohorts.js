exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('cohorts')
        .truncate()
        .then(function() {
            return knex('cohorts').insert([
                { name: 'testing1' },
                { name: 'testing2' },
                { name: 'testing3' },
            ]);
        });
};
