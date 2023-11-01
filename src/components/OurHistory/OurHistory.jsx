import axios from "axios";
import { useEffect, useState } from "react";
import "./OurHistory.css"

function OurHistory() {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        axios.get("Data/history.json").then((res) => {
            setHistory(res.data);
        });
    });

    return (
        <>
            <section className="container" id="ourHistory">
                <h2>Nossa História</h2>
                {history.map((data, index) => {
                    return (
                        <div key={index}>
                            <h3>{data.year}</h3>
                            {data.paragraph.map((info, index) => {
                                return <p>{info.text}</p>;
                            })}
                        </div>
                    );
                })}
            </section>
        </>
    );
}

export default OurHistory;
