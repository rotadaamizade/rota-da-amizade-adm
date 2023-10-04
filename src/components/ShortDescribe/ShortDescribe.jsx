import "./ShortDescribe.css";

function ShortDescribe(props) {
  return (
    <section id="aboutUs">
      <div className="container">
        <div id="contentMiddle">
        <h1>ROTA DA AMIZADE</h1>
          {props.children}
        </div>
      </div>
    </section>
  );
}

export default ShortDescribe;
