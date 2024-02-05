import Footer from "@/components/layoutComponents/Footer";
import Header from "@/components/layoutComponents/Header";
import { Button } from "@/components/ui/button";
import React from "react";

const ProfilePage = () => {
	return (
		<>
			<Header />
			<div className="bg-gray-100 min-h-screen">
				<div className="container mx-auto p-8">
					<div className="mb-10">
						<h1 className="text-3xl font-bold text-gray-800 mb-4">
							My Profile
						</h1>
						<p className="text-gray-600">
							Manage your personal information, account settings, and more.
						</p>
					</div>

					<div className="bg-white shadow rounded-lg p-6 mb-6">
						<h2 className="text-2xl text-gray-800 font-semibold mb-4">
							Personal Information
						</h2>
						<form>
							<div className="mb-4">
								<label
									htmlFor="name"
									className="block text-gray-700 text-sm font-bold mb-2">
									Name
								</label>
								<input
									type="text"
									id="name"
									placeholder="Enter your name"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="email"
									className="block text-gray-700 text-sm font-bold mb-2">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									placeholder="Enter your email address"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="phone"
									className="block text-gray-700 text-sm font-bold mb-2">
									Phone Number
								</label>
								<input
									type="tel"
									id="phone"
									placeholder="Enter your phone number"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="address"
									className="block text-gray-700 text-sm font-bold mb-2">
									Address
								</label>
								<textarea
									id="address"
									placeholder="Enter your address"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<Button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
								Save
							</Button>
						</form>
					</div>

					<div className="bg-white shadow rounded-lg p-6 mb-6">
						<h2 className="text-2xl text-gray-800 font-semibold mb-4">
							Profile Picture
						</h2>
						<form>
							{/* Profile picture upload field */}
							{/* ... */}
							<Button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
								Upload
							</Button>
						</form>
					</div>

					{/* Repeat for other sections: Account Settings, Stories, Gallery, Skills */}
					{/* ... */}

					<div className="bg-white shadow rounded-lg p-6 mb-6">
						<h2 className="text-2xl text-gray-800 font-semibold mb-4">
							Account Settings
						</h2>
						<form>
							<div className="mb-4">
								<label
									htmlFor="currentPassword"
									className="block text-gray-700 text-sm font-bold mb-2">
									Current Password
								</label>
								<input
									type="password"
									id="name"
									placeholder=""
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>

							<div className="mb-4">
								<label
									htmlFor="newPassword"
									className="block text-gray-700 text-sm font-bold mb-2">
									New Password
								</label>
								<input
									type="password"
									id="name"
									placeholder="Enter New Password"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<Button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
								Upload
							</Button>
						</form>
					</div>

					<div className="bg-white shadow rounded-lg p-6 mb-6">
						<h2 className="text-2xl text-gray-800 font-semibold mb-4">
							Stories
						</h2>
						<form>
							<div className="mb-4">
								<label
									htmlFor="stories"
									className="block text-gray-700 text-sm font-bold mb-2">
									Current Password
								</label>
								<textarea
									id="stories"
									placeholder="Enter Your Story"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<Button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
								Save
							</Button>
						</form>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<div className="bg-white shadow rounded-lg p-6">
							<h2 className="text-2xl text-gray-800 font-semibold mb-4">
								Gallery
							</h2>
							{/* Gallery images */}
							{/* ... */}
						</div>

						<div className="bg-white shadow rounded-lg p-6">
							<h2 className="text-2xl text-gray-800 font-semibold mb-4">
								Skills
							</h2>
							<form>
								<textarea
									id="skills"
									placeholder="Enter your Skills"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
								<Button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
									Save
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default ProfilePage;
