import React from "react";
import "./SponsorsPanel.css";

import bolid1 from "../images/IMG_6311.jpg";
import bolid2 from "../images/IMG_9446.jpg";
import bolid3 from "../images/IMG_9453.jpg";
import bolid4 from "../images/IMG_9730.jpg";

// import { DownOutlined  } from '@ant-design/icons';
// import { Input } from 'antd';

// const { Search } = Input;

function SponsorsPanel () {

    // const onSearch = (value) => console.log(value);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const sponsorData = [
        {id:1, text: "PARTNER", oferta: "5", img: bolid1},
        {id:2, text: "SPONSOR", oferta: "10", img: bolid2},
        {id:3, text: "GŁÓWNY SPONSOR", oferta: "25", img: bolid3},
        {id:4, text: "SPONSOR TYTULARNY", oferta:  "100", img: bolid4},
    ];

    const animateText = event => {
        let interval = null;
        let iterations = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return event.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() *26)]
                })
                .join("");

            if(iterations >= event.target.dataset.value.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

    }

    return(
        <div className="sponsors-wrapper">
            <h1>Lista naszych aktualnych sponsorów</h1>
            {/*<div className="search-wrapper">*/}
            {/*    /!*<input type="text" className="searchbar" <SearchOutlined /> />*!/*/}
            {/*    <Search*/}
            {/*        rootClassName="searchbar"*/}
            {/*        placeholder="Wyszukiwarka"*/}
            {/*        onSearch={onSearch}*/}
            {/*        style={{*/}
            {/*            width: 200,*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <button className="sort-btn">Sortuj <DownOutlined /></button>*/}
            {/*</div>*/}
            <div className="cards-wrapper">
                <div className='cards-upper-two'>{
                    sponsorData.map((data, i) => {
                        return (
                        <div className="card" key={i}>
                            <img src={data.img} alt=""/>
                            <div className="border">
                                <h2
                                    data-value={data.text}
                                    onMouseOver={animateText}
                                >
                                    {data.text}
                                </h2>
                                <span>OFERTA {data.oferta} TYŚ. ZŁ</span>
                            </div>
                        </div>
                        )
                    })}</div>
            </div>
        </div>
    )
}
export default SponsorsPanel;