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
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	// This is an example of what would get from an email
	// you change the host later
	// in terminal you will get a link to see the email
	const info = await transporter.sendMail({
		from: '"Jane Doe" <j.doe@example.com',
		to: email,
		subject: "Login to your account",
		// use # instead of ? because you don't want the token to be save in the browswer history
		html: `Login by clicking <a href="${url}/login#token=${token}"> HERE <a/>`,
	});

	console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
