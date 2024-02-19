import Footer from "@/components/layoutComponents/Footer";
import Header from "@/components/layoutComponents/Header";
import { Button } from "@/components/ui/button";

export default function ContactUs() {
	return (
		<>
			<Header />
			<div className="container mx-auto p-4 my-6">
				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Customer Support</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<form className="space-y-4" /* onSubmit={handleSubmit} */>
							<input
								type="text"
								placeholder="Name"
								className="w-full p-2 border" /* onChange={(e) => setName(e.target.value)} value={name} */
							/>
							<input
								type="email"
								placeholder="Email"
								className="w-full p-2 border" /* onChange={(e) => setEmail(e.target.value)} value={email} */
							/>
							<textarea
								placeholder="Message"
								className="w-full p-2 border" /* onChange={(e) => setMessage(e.target.value)} value={message} */
							></textarea>
							<Button
								type="submit"
								className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white">
								Submit
							</Button>
						</form>
						<div>
							<h3 className="font-semibold">Phone</h3>
							<p>Call us at:</p>
							<p>Expected response time: 24-48 hours</p>
						</div>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Technical Issues</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<form className="space-y-4" /* onSubmit={handleSubmit} */>
							<input
								type="text"
								placeholder="Name"
								className="w-full p-2 border" /* onChange={(e) => setName(e.target.value)} value={name} */
							/>
							<input
								type="email"
								placeholder="Email"
								className="w-full p-2 border" /* onChange={(e) => setEmail(e.target.value)} value={email} */
							/>
							<textarea
								placeholder="Message"
								className="w-full p-2 border" /* onChange={(e) => setMessage(e.target.value)} value={message} */
							></textarea>
							<Button
								type="submit"
								className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white">
								Submit
							</Button>
						</form>
						<div>
							<h3 className="font-semibold">Phone</h3>
							<p>Call us at:</p>
							<p>Expected response time: 24-48 hours</p>
						</div>
					</div>
				</section>

				{/* <section>
					<h2 className="text-xl font-semibold mb-4">Mini FAQ</h2>
					<div className="space-y-4">
						<div>
							<h4 className="font-semibold">Question 1</h4>
							<p>Answer 1</p>
						</div>
						<div>
							<h4 className="font-semibold">Question 2</h4>
							<p>Answer 2</p>
						</div>
					</div>
				</section> */}
			</div>
			<Footer />
		</>
	);
}
