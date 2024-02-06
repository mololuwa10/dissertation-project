import { registerUser } from "@/lib/auth";
import styles from "@/components/dashboardComponents/users/addUser/addUser.module.css";

export default function AddUserForm() {
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const userData = {
			firstname: formData.get("firstname"),
			lastname: formData.get("lastname"),
			username: formData.get("username"),
			user_email: formData.get("email"),
			password: formData.get("password"),
			contactAddress: formData.get("address"),
		};
		const result = await registerUser(userData);
		console.log(result);
	};
	return (
		<>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="firstname"
						name="firstname"
						required
					/>
					<input type="text" placeholder="lastname" name="lastname" required />
					<input type="text" placeholder="username" name="username" required />
					<input type="email" placeholder="email" name="email" required />
					<input
						type="password"
						placeholder="password"
						name="password"
						required
					/>

					<textarea
						name="address"
						id="address"
						placeholder="Address"></textarea>
					<button type="submit">Submit</button>
				</form>
			</div>
		</>
	);
}
