"use client";
/* eslint-disable @next/next/no-img-element */
import styles from "@/components/dashboardComponents/users/singleUser/singleUser.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetTestimonialsById } from "@/lib/dbModels";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTestimonials() {
	interface Testimonials {
		testimonialId: number;
		testimonialTitle: string;
		rating: number;
		comment: string;
		testimonialDate: string;
		isApproved: boolean;
		applicationUser: {
			userId: number;
			firstname: string;
			lastname: string;
			username: string;
		};
	}

	const searchParams = useSearchParams();
	const testimonialId = searchParams.get("testimonialId");
	const [testimonial, setTestimonial] = useState<Testimonials | null>(null);
	const [selectedApproval, setSelectedApproval] = useState("No");

	const { testimonials } = useGetTestimonialsById(testimonialId) as unknown as {
		testimonials: Testimonials[];
	};

	const approveTestimonial = async (testimonialId: any, isApproved: any) => {
		const jwt = localStorage.getItem("jwt");
		try {
			const response = await fetch(
				`http://localhost:8080/api/admin/approveTestimonial/${testimonialId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Handle successful approval update here
			toast.success("Testimonial approved updated successfully.");
			console.log("Testimonial approval updated successfully.");
		} catch (error) {
			console.error("Failed to update testimonial approval:", error);
		}
	};

	// Your form submit handler
	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const isApproved = selectedApproval === "Yes";
		// Implementation for form submission
	};

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setTestimonial((prevTestimonials) => {
			if (prevTestimonials) {
				return { ...prevTestimonials, [name]: value };
			}
			return null;
		});
	};

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className={styles.container}>
				<div className={styles.formContainer}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<input type="hidden" name="id" />
						<label>Testimonials Title</label>
						<input
							type="text"
							name="firstname"
							placeholder={testimonials.testimonialTitle}
							value={testimonials.testimonialTitle}
							onChange={handleInputChange}
						/>
						<label>Testimonials Comment</label>
						<input
							type="text"
							name="lastname"
							placeholder={testimonials.comment}
							value={testimonials.comment}
							onChange={handleInputChange}
						/>
						<label>Testimonials Rating</label>
						<input
							type="text"
							name="username"
							placeholder={String(testimonials.rating)}
							value={testimonials.rating}
							onChange={handleInputChange}
						/>
						<label>Customer Name</label>
						<input
							type="text"
							name="customerName"
							placeholder={`${testimonials.applicationUser?.firstname} ${testimonials.applicationUser?.lastname}`}
							value={`${testimonials.applicationUser?.firstname} ${testimonials.applicationUser?.lastname}`}
							onChange={handleInputChange}
						/>
						<label>Testimonials Date and time</label>
						<input
							type="text"
							name="dateAndTime"
							placeholder={new Date(
								testimonials.testimonialDate
							).toLocaleDateString()}
							value={new Date(
								testimonials.testimonialDate
							).toLocaleDateString()}
							onChange={handleInputChange}
						/>
						<label>Is Approved?</label>
						<div>
							<input
								type="radio"
								id="approvedYes"
								name="isApproved"
								value="Yes"
								checked={selectedApproval === "Yes"}
								onChange={(e) => {
									setSelectedApproval(e.target.value);
									approveTestimonial(testimonialId, true);
								}}
							/>
							<label htmlFor="approvedYes">Yes</label>

							<input
								type="radio"
								id="approvedNo"
								name="isApproved"
								value="No"
								checked={selectedApproval === "No"}
								onChange={(e) => {
									setSelectedApproval(e.target.value);
									approveTestimonial(testimonialId, false);
								}}
								className="mr-4 text-xl"
							/>
							<label htmlFor="approvedNo">No</label>
						</div>
						<button>Update</button>
					</form>
				</div>
			</div>
		</>
	);
}
