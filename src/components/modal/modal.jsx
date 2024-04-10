import "./modal.scss";

export default function Modal({ closeFn }) {
  return (
    <div className="modal" onClick={closeFn}>
      <div className="modal__container">
        <p>some words go here</p>
        <button className="modal__close" onClick={closeFn}>
          Close
        </button>
      </div>
    </div>
  );
}
