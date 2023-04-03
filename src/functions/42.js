const axios = require("axios").default;
const { API42_UID, API42_SECRET } = require("../../config.json");
const USER = require("../Commands/dev/intra");

const run = async function Run(client, channelID, interID, Username) {

	async function get_token() { // 7200 seconds sec (2horas)
		let { data } = await axios.post(`https://api.intra.42.fr/oauth/tokengrant_type=client_credentials&client_id=${API42_UID}&client_secret=${API42_SECRET}`);
		return data;
	}

	const token = await get_token();
	const headers = {
		'Authorization': 'Bearer ' + token,
	}
	console.log("TOKEN: ------------------------" + token)

	/* console.log("USER: ----------------------")
	console.log(USER); */

	/* const getUser = async () => {

		try {
			let {
				data
			} = await axios.get(`https://api.intra.42.fr/v2/users/${Username}`, {
				headers
			})
			return data
		} catch (error) {
			console.log(error)
		}
	}

	let data = {};

	let userData = await getUser();

	// update data with new info
	data.user_id = userData.id;
	data.name = userData.displayname;
	data.image = userData.image.link;
	data.campus = userData.campus[0].name;
	data.cursus = userData.cursus_users[1].cursus.name;
	data.grade = userData.cursus_users[1].grade;
	data.kind = userData.kind;

	let project_ids = []
	for (project of userData.projects_users) {

		/* 	// Check if the project is validated
			let r = userData.projects_users.filter(function (item) {
				return item.project.id == project.id;
			})[0];
			if (r['validated?'] == false)
				continue; */

		/*if (project.status === "finished")
			project_ids.push(project.project.id);
	}

	const getProjects = async () => {

		try {
			let {
				data
			} = await axios.get(`https://api.intra.42.fr/v2/projects?filter[id]=${project_ids.join()}&page[size]=100`, {
				headers
			})
			return data
		} catch (error) {
			console.log(error)
		}

	}

	data.projects = []
	project_json = getProjects();
	for (project of project_json) {
		let is_piscine = false;
		// Check if we should add this project to the list
		if (project.exam == true)
			continue;

		// Check if the project is validated
		let r = userData.projects_users.filter(function (item) {
			return item.project.id == project.id;
		})[0];
		if (r['validated?'] == false)
			continue;


		for (cursus of project.cursus) {
			if (cursus.kind == 'piscine') {
				is_piscine = true;
				break;
			}
		}

		// Add all the keywords from that project to the json (could have)
		let keywordsArr = [];
		project.project_sessions[0].objectives.forEach(key => {
			keywordsArr.push(key);
		});

		// Add project to list if it isn't a piscine
		if (!is_piscine) {
			// if the project is in groups or not
			let group = false;
			if (project.project_sessions[0].solo === false) group = true;
			// difficulty of the project
			let difficulty = 0;
			difficulty = project.project_sessions[0].difficulty;
			/* if(difficulty <= 0) {
				difficulty = 100;
			} */
			// if the user did the bonus
			/*let bonus = false;
			userData.projects_users.forEach(pro => {
				if (pro.project.id === project.id) {
					if (pro.final_mark > 100) bonus = true;
					//console.log(`name: ${pro.project.name} -- bonus: ${bonus}`)
				}
			});
			data.projects.push({
				"name": project.name,
				"description": project.project_sessions[0].description,
				"keywords": keywordsArr,
				"difficulty": difficulty,
				"group": group,
				"bonus": bonus,
			});
		}
	}

	// Sort projects based on difficulty first, then name
	data.projects.sort(function (lhs, rhs) {
		if (lhs.difficulty < rhs.difficulty)
			return -1;
		if (lhs.difficulty > rhs.difficulty)
			return 1;
		if (lhs.name < rhs.name)
			return -1;
		if (lhs.name > rhs.name)
			return 1;
		return 0;
	}); */
}

module.exports = run;