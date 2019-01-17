exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('students')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('students').insert([
                { name: 'testing1', cohort_id: 1 },
                { name: 'testing2', cohort_id: 1 },
                { name: 'testing3', cohort_id: 1 },
            ]);
        });
};
