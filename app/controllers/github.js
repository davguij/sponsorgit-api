var GitHubApi = require("github");

var github = new GitHubApi({
	// optional
	debug: true,
	Promise: require('bluebird'),
	timeout: 5000
});


const getRepos = (req, res) => {
	github.users.getFollowingForUser({
		username: "defunkt"
	}).then((response) => {
		res.json(200, response);
	}).catch((err) => {
		res.json(500, { error: err })
	});
}

module.exports = {
	getRepos
};