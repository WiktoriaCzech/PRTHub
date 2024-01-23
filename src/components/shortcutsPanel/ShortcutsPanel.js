import React, { useState } from "react";
import "./ShortcutsPanel.css";

import { ReactComponent as SpreadsheetGraphic } from "../images/svg/calendarGraphic.svg";
import { ReactComponent as SpreadsheetGraphicOutlined } from "../images/svg/calendarGraphicOutline.svg";

function ShortcutsPanel() {
  const [activeButtonId, setActiveButtonId] = useState(null);

  const dataFromExcel = [
    {
      id: 0,
      name: "Organizacja PRz Racing Team 2023",
      src: (
        <iframe
          className="embedded-file"
          title="organisation"
          src="https://docs.google.com/spreadsheets/d/13NV9NizioEWUTPet35Y-6SFyTAOpNEh53_Wp_oWTt40/edit?usp=sharing?widget=true&amp;headers=false"
        ></iframe>
      ),
    },
    {
      id: 1,
      name: "Dyspozycyjność TESTY",
      src: (
        <iframe
          className="embedded-file"
          title="availability-tests"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQEpdP5LlCcQx76KeNZgSTxrEe0LSOMKR11H91FPrQ4UWmb2RAc0brVsmxfp8MMmhzqSJdiruFH_oVH/pubhtml?widget=true&amp;headers=false"
        ></iframe>
      ),
    },
    {
      id: 2,
      name: "Dyspozycyjność EVENTY",
      src: (
        <iframe
          className="embedded-file"
          title="availability-events"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT2n4FTPWhjc1_cyR-L4bk4cBn4klkPsluFZzw1cMIVOibzjtDrDmlHktY-nX7ZeVgymObh5iuStXl-/pubhtml?gid=1767985861&amp;single=true&amp;widget=true&amp;headers=false"
        ></iframe>
      ),
    },
    {
      id: 3,
      name: "Harmonogram PMT-06E",
      src: (
        <iframe
          className="embedded-file"
          title="pmt-06e-charts"
          src=""
        ></iframe>
      ),
    },
  ];

  const togglePopup = (id) => {
    // If the button is already active, deactivate it, otherwise set as active
    setActiveButtonId((prevActiveId) => (prevActiveId === id ? null : id));
  };

  // Function to render the iframe based on the active button state
  const renderEmbeddedIframe = () => {
    const activeItem = dataFromExcel.find((item) => item.id === activeButtonId);
    return activeItem ? activeItem.src : null;
  };

  return (
    <div className="shortcutsWrapper">
      <div className="buttonsWrapper">
        {dataFromExcel.map((item) => {
          return (
            <div className="outlined" key={item.id}>
              <button
                className="btnLinks outlined translated"
                onClick={() => togglePopup(item.id)}
              >
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className="embeddedGoogleChartsWrapper">
        <SpreadsheetGraphic className="graphicposition mirrored" />
        <SpreadsheetGraphicOutlined className="graphicposition " />
        {renderEmbeddedIframe()}
      </div>
    </div>
  );
}
export default ShortcutsPanel;
