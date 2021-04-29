import "../App.css"


function MainPage() {
    return (
        <div className="Page Main">
            <div className="back-canvas-cont" id="main-canvas">
            </div>
            <div className="flex-container">
                <div className="flex-child">
                    <div className="title">
                        <p>Hi, I'm Austin Loudermilk</p>
                    </div>
                </div>

                <div className="flex-child">
                    <div className="content">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;