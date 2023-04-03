const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const axios = require("axios");

module.exports = {
	name: "intra",
	developer: true,
	data: new SlashCommandBuilder()
		.setName("intra")
		.setDescription("Get a 42 Student data.")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) => option
			.setName("user")
			.setRequired(true)
			.setDescription("The user you want to check.")),
	//User: "",
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction, client) {

		const { options } = interaction;

		const User = options.getString("user");

		let { data } = await axios.post(`http://localhost:4000/user/${User}`);
		console.log(data)

		//module.exports.User = User;
		console.log(User);
		//run(client, interaction.channel.id, interaction.member.user.id, User);

		interaction.reply({ content: "Sim" });
	}
}
