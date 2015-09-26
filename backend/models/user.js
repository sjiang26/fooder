var user = function(name, email, password, allergies, diet) {
	this.name = name;
	this.email = email;
	this.password = password;
	this.allergies = allergies;
	this.diet = diet;
	this.likes = [];
	this.dislikes = [];
	this.id = Date.now().toString();
}

module.exports = user;