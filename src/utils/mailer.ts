import nodemailer from "nodemailer";

export async function sendLoginEmail({
	email,
	url,
	token,
}: {
	email: string;
	url: string;
	token: string;
}) {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: "smtp.ethernal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	const info = await transporter.sendMail({
		from: '"Jane Doe" <j.doe@example.com',
		to: email,
		subject: "Login to your account",
		// use # instead of ? because you don't want the token to be save in the browswer history
		html: `Login by clicking here <a href="${url}/login#token=${token}">`,
	});

	console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}