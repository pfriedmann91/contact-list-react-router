import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (id) {
            const existingContact = store.contacts.find(contact => contact.id == id);
            if (existingContact) {
                setContact(existingContact);
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await actions.updateContact(id, contact);
        } else {
            await actions.createContact(contact);
        }
        navigate("/");
    };

    return (
        <div className="container-fluid m-3">
            <form className="row g-3" onSubmit={handleSubmit}>
                <h1 className="text-center">{id ? "Edit Contact" : "Add a New Contact"}</h1>
                <div className="col-md-12">
                    <label htmlFor="inputName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputPhone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone"
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        placeholder="Enter Address"
                    />
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">Save</button>
                </div>
                <a href="/">Or go back to contacts</a>
            </form>
        </div>
    );
};
