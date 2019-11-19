import React, {useEffect} from 'react';
import './CursorFollow.style.scss';

const CursorFollow = () => {

    useEffect(() => {
        if(window.innerWidth > 880){
            const cursor = document.querySelector('.cursor');

            document.addEventListener('mousemove', e => {
                cursor.setAttribute("style", "--y: "+(e.y)+"px; --x: "+(e.x)+"px;")
            });
            document.addEventListener('click', () => {
                cursor.classList.add("expand");
                setTimeout(() => {
                    cursor.classList.remove("expand");
                }, 1000)
            });
        }
    }, []);

    return (
        <div className="cursor"/>
    );
};

export default CursorFollow;