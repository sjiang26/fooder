import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	password: DS.attr('string'),
	allergies: DS.attr(),
	diet: DS.attr('string'),
	likes: DS.hasMany('recipe', {
		async: true
	}),
	dislikes: DS.hasMany('recipe', {
		async: true
	})
});
