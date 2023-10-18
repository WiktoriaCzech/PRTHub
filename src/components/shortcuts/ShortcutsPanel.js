import {useState} from "react";
import './ShortcutsPanel.css';

function  ShortcutsPanel() {

    const [showEmbedded, setShowEmbedded] = useState(); // set iframe src only!

    const dataFromExcel = [
        {
            id:0,
            name: 'Organizacja PRz Racing Team 2023',
            src: <iframe className="embedded-file" src="https://docs.google.com/spreadsheets/d/13NV9NizioEWUTPet35Y-6SFyTAOpNEh53_Wp_oWTt40/edit?usp=sharing?widget=true&amp;headers=false"></iframe>,
        },
        {
            id:1,
            name: 'Dyspozycyjność TESTY',
            src: <iframe className="embedded-file" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQEpdP5LlCcQx76KeNZgSTxrEe0LSOMKR11H91FPrQ4UWmb2RAc0brVsmxfp8MMmhzqSJdiruFH_oVH/pubhtml?widget=true&amp;headers=false"></iframe>,
        },
        {
            id:2,
            name: 'Dyspozycyjność EVENTY',
            src: <iframe className="embedded-file" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT2n4FTPWhjc1_cyR-L4bk4cBn4klkPsluFZzw1cMIVOibzjtDrDmlHktY-nX7ZeVgymObh5iuStXl-/pubhtml?gid=1767985861&amp;single=true&amp;widget=true&amp;headers=false"></iframe>,
        },
    ];

    const ShowEmbedded = ({item}) => {
        console.log(showEmbedded);
        if(showEmbedded !== undefined) {
            return item[showEmbedded].src
        }
    }

    return (
        <div className="shortcuts-panel-wrapper">
            <div className="buttons-frame-wrapper">
                {/*<button className="btn" onClick={() => {*/}
                {/*    setShowEmbedded()*/}
                {/*}}*/}
                { dataFromExcel.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className="important-btn-links"
                            onClick={() => {
                                setShowEmbedded(item.id)
                            }}
                        >{item.name}</button>
                    )
                    })
                }
            </div>
            <div className="content-placing">
                <ShowEmbedded item={dataFromExcel} className=''/>
            </div>
        </div>
    )
}
export default  ShortcutsPanel;