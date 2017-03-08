var GitHubApi = require("github");

var github = new GitHubApi({
	// optional
	debug: true,
	Promise: require('bluebird'),
	timeout: 5000
});

const authorize = () => {
	github.authenticate({
		type: "oauth",
		key: process.env.GITHUB_API_CLIENTID,
		secret: process.env.GITHUB_API_SECRET
	});
};

const getRepos = (req, res) => {
	authorize();
	let langParam = req.params.lang;
	let langs = langParam.split(',');
	let ghLangs = '';
	for (var index = 0; index < langs.length; index++) {
		ghLangs += 'language:' + langs[index] + ' ';
	}
	github.search.repos({
		q: `stars:>=10 forks:>=3 ${ghLangs}`,
		sort: 'updated'
	}).then((response) => {
		res.json(200, response);
	}).catch((err) => {
		res.json(500, { error: err });
	});
};

const getRepoDetails = (req, res) => {
	authorize();
	let owner = req.params.owner;
	let repo = req.params.repo;
	github.repos.get({ owner, repo }).then((response) => {
		res.json(200, response);
	}).catch((err) => {
		res.json(500, { error: err })
	});
}

const getRepoLangs = (req, res) => {
	authorize();
	let owner = req.params.owner;
	let repo = req.params.repo;
	github.repos.getLanguages({ owner, repo }).then((response) => {
		res.json(200, response);
	}).catch((err) => {
		res.json(500, { error: err })
	});
}

module.exports = {
	getRepos,
	getRepoDetails,
	getRepoLangs
};