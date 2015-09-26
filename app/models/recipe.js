import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	calories: DS.attr('number'),
	ingredients: DS.attr(),
	difficulty: DS.attr('number'),
	dietLabels: DS.attr('string'),
	healthLabels: DS.attr('string'),
	summary: DS.attr('string'),
	yield: DS.attr('string'),
	image: DS.attr('string'),
    recipe: DS.attr('string')
});
