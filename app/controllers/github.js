var GitHubApi = require("github");

var github = new GitHubApi({
	// optional
	debug: true,
	Promise: require('bluebird'),
	timeout: 5000
});


const getRepos = (req, res) => {
	let langParam = req.params.lang;
	let langs = langParam.split(',');
	let ghLangs = '';
	for (var index = 0; index < langs.length; index++) {
		let lang = langs[index];
		ghLangs += 'language:' + lang + ' ';
	}
	github.search.repos({
		q: `stars:>=10 forks:>=3 ${ghLangs}`,
		sort: 'updated'
	}).then((response) => {
		res.json(200, response);
	}).catch((err) => {
		res.json(500, { error: err })
	});
};

const getRepoDetailsById = (req, res) => {
	let repoId = req.params.id;
	let repoDetails = {};
	github.repos.getById({ id: repoId }).then((response) => {
		repoDetails.name = reponse.name;
		repoDetails.ownerName = response.owner.login;
		github.repos.getLanguages({
			owner: response.owner.login,
			repo: response.name
		}).then((response) => {
			repoDetails.languages = response;
			res.json(200, repoDetails);
		});
	}).catch((err) => {
		res.json(500, { error: err })
	});
}

module.exports = {
	getRepos,
	getRepoDetailsById
};