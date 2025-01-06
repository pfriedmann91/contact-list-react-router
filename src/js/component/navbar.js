import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light pb-3 mb-5">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Contact List</span>
			</Link>
			<div className="ml-auto">
				<Link to="/contact">
					<button className="btn btn-success">Add Contact</button>
				</Link>
			</div>
		</nav>
	);
};
