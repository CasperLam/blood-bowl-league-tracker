import "./modal.scss";

export default function Modal({
  closeFn,
  name,
  type,
  action,
  user_id,
  league_id,
  team_id,
}) {
  return (
    <div className="modal" onClick={closeFn}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        {type === "add" && (
          <>
            <h2 className="modal__title">Add a Team</h2>
            <p className="modal__description">Add your team details here:</p>
            <form id="modal-add" className="form">
              <label htmlFor="head_coach" className="form__label">
                Head Coach:
              </label>
              <input type="text" className="form__input" />
              <label htmlFor="name" className="form__label">
                Team Name:
              </label>
              <input type="text" className="form__input" />
              <label htmlFor="faction" className="form__label">
                Faction:
              </label>
              <input type="text" className="form__input" />
              <label htmlFor="team_value" className="form__label">
                Team Value:
              </label>
              <input type="text" className="form__input" />
            </form>
          </>
        )}

        {/* {type === "edit" && (
          return <></>
        )} */}

        {type === "delete" && (
          <>
            <h2 className="modal__title">Delete ${name}</h2>
            <p className="modal__description">
              Deleting is <b>permanent!</b>
              <br />
              Are you sure you want to proceed?
            </p>
          </>
        )}

        <div className="modal__buttons">
          <button className="modal__close" onClick={closeFn}>
            Close
          </button>
          <button
            className="modal__action"
            form={`modal-${type}`}
            onSubmit={action}
          >
            {type}
          </button>
        </div>
      </div>
    </div>
  );
}
