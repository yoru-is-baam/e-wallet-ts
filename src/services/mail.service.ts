import nodemailer, { Transporter } from "nodemailer";
import { env } from "../configs/config.js";

const transporter: Transporter = nodemailer.createTransport(env.email.smtp);

const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
	const from: string = `Administrator 👻 <${env.email.from}>`;
	await transporter.sendMail({ from, to, subject, html });
};

export default { sendEmail };
