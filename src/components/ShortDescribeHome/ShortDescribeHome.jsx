import { useState } from "react";
import ShortDescribe from "../ShortDescribe/ShortDescribe";
import { useEffect } from "react";
import axios from "axios";
import "./ShortDescribeHome.css";

function ShortDescribeHome() {
  const [sponsors, setSponsors] = useState([]);
  useEffect(() => {
    axios.get("Data/sponsors.json").then((res) => {
      setSponsors(res.data);
    });
  }, []);

  return (
    <ShortDescribe>
      <p>
        Somos uma associação de turismo sem fins econômicos que através da
        divulgação dos municípios e dos seus associados busca promover e
        desenvolver o turismo na região do Vale dos Imigrantes.
      </p>
      <p id="supporters">apoiadores</p>
      {sponsors.map((sponsor) => {
        return (
          <img
            key={sponsor.id}
            src={`Icons/${sponsor.icon}`}
            alt={sponsor.icon}
            className="sponsor"
          />
        );
      })}
    </ShortDescribe>
  );
}

export default ShortDescribeHome;
