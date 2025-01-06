import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import elon from "../../img/elon.png";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        actions.getContacts();
    }, []);

    
    const handleDeleteClick = (contactId) => {
        setContactToDelete(contactId);
        setShowModal(true);
    };

    
    const confirmDelete = async () => {
        if (contactToDelete) {
            await actions.deleteContact(contactToDelete);
            setShowModal(false);
            setContactToDelete(null); 
        }
    };

    return (
        <div className="text-center pt-1 m-5">
            <div className="position-absolute top-0 end-0 p-2">
                <a className="btn btn-success" href="/contact" role="button">
                    Add new contact
                </a>
            </div>

            <div className="container-fluid mt-3 p-4 row border">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((item, index) => (
                        <div
                            className="card border border-0 m-3 d-flex flex-row align-items-center justify-content-between"
                            key={index}
                        >
                            <div className="col-auto">
                                <img
                                    src={elon}
                                    className="img-fluid rounded-circle"
                                    style={{ maxWidth: "200px" }}
                                    alt="Contact"
                                />
                            </div>
                            <div className="col ms-3 text-start">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {item.name || "No Name"}
                                    </h5>
                                    <p className="card-text">
                                        <i className="fa-solid fa-location-dot me-2"></i>
                                        {item.address || "No Address"}
                                    </p>
                                    <p className="card-text">
                                        <i className="fa-solid fa-phone me-2"></i>
                                        {item.phone || "No Phone"}
                                    </p>
                                    <p className="card-text">
                                        <i className="fa-solid fa-envelope me-2"></i>
                                        {item.email || "No Email"}
                                    </p>
                                </div>
                            </div>

                            <div className="col-auto d-flex align-items-center">
                                <button
                                    className="btn btn-outline-dark me-2"
                                    onClick={() => navigate(`/contact/${item.id}`)}
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleDeleteClick(item.id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No contacts found</p>
                )}
            </div>

            {showModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>If you delete this thing the entire universe will go down!</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Oh no!
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={confirmDelete}
                                >
                                    Yes baby!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

