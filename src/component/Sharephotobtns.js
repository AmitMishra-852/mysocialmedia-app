import './Sharephotobtn.css'

function Sharephotobtns({Icon , title, htmlColor}) {
    return (
        <div className="Sharephotobtns">
           <Icon htmlColor={htmlColor} className="Sharephotobtns-icon"/>
           <span >{title}</span>
        </div>
    );
}

export default Sharephotobtns;
