// styles
import "./DeleteModal.css";

export default function DeleteModal({ closeModal, handleDeleteDocument, isPending }) {

    return (
        <div className="modal">
            <div className="dark-bg" onClick={closeModal} />
            <div className="centered">
                <div className="modal-body">
                    <div className="modal-header">
                        <h5 className="heading">Are you sure?</h5>
                    </div>
                    <button className="close-btn" onClick={closeModal}>
                        x
                    </button>
                    <div className="modal-content">
                        Are you sure you want to delete the item?
                    </div>
                    <div className="modal-actions">
                        <div className="actions-container">
                            {!isPending
                                ? <button className="delete-btn" onClick={handleDeleteDocument}>
                                    Delete
                                </button>
                                : <button disabled className="delete-btn">
                                    Deleting...
                                </button>}
                            <button
                                className="cancel-btn"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
