const GitHubApi = require('github');
const Bluebird = require('bluebird');

const github = new GitHubApi({
	// optional
	debug: true,
	Promise: Bluebird,
	timeout: 5000
});

const authorize = () => {
	github.authenticate({
		type: 'oauth',
		key: process.env.GITHUB_API_CLIENTID,
		secret: process.env.GITHUB_API_SECRET
	});
};

const getRepoParams = (reqParams) => {
	return {
		owner: reqParams.owner,
		repo: reqParams.repo
	};
};

const getRepos = (req, res) => {
	authorize();
	let langParam = req.params.lang;
	let langs = langParam.split(',');
	let ghLangs = '';
	for (let index = 0; index < langs.length; index++) {
		let lang = langs[index];
		ghLangs += 'language:' + lang + ' ';
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
	github.repos.get(getRepoParams(req.params)).then((response) => {
		res.json(200, response);
	}).catch((err) => {
		res.json(500, { error: err });
	});
};

const getRepoLangs = (req, res) => {
	authorize();
	github.repos.getLanguages(getRepoParams(req.params)).then((response) => {
		res.json(200, response);
	}).catch((err) => {
		res.json(500, { error: err });
	});
};

module.exports = {
	getRepos,
	getRepoDetails,
	getRepoLangs
};